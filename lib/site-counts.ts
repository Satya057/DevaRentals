import { promises as fs } from "fs"
import path from "path"

export type SiteCounts = {
  total: number
  byPath: Record<string, number>
  lastUpdated: string | null
}

const EMPTY: SiteCounts = { total: 0, byPath: {}, lastUpdated: null }
const REDIS_KEY = "deva:site-counts"

/** Local/dev: project data folder. Vercel: /tmp (ephemeral — use Upstash for real persistence). */
function dataFilePath(): string {
  if (process.env.VERCEL) {
    return path.join("/tmp", "deva-site-counts.json")
  }
  return path.join(process.cwd(), "data", "site-counts.json")
}

export function upstashConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() &&
      process.env.UPSTASH_REDIS_REST_TOKEN?.trim(),
  )
}

async function upstashCommand(command: unknown[]): Promise<unknown> {
  const url = process.env.UPSTASH_REDIS_REST_URL!.trim().replace(/\/$/, "")
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!.trim()
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Upstash ${res.status}: ${text.slice(0, 200)}`)
  }
  const json = (await res.json()) as { result?: unknown }
  return json.result
}

async function redisGet(): Promise<SiteCounts | null> {
  const result = await upstashCommand(["GET", REDIS_KEY])
  if (result == null || typeof result !== "string") return null
  try {
    return JSON.parse(result) as SiteCounts
  } catch {
    return null
  }
}

async function redisSet(counts: SiteCounts): Promise<void> {
  await upstashCommand(["SET", REDIS_KEY, JSON.stringify(counts)])
}

async function fileRead(): Promise<SiteCounts> {
  try {
    const raw = await fs.readFile(dataFilePath(), "utf8")
    const parsed = JSON.parse(raw) as SiteCounts
    return {
      total: Number(parsed.total) || 0,
      byPath: parsed.byPath && typeof parsed.byPath === "object" ? parsed.byPath : {},
      lastUpdated: parsed.lastUpdated ?? null,
    }
  } catch {
    return { ...EMPTY, byPath: {} }
  }
}

async function fileWrite(counts: SiteCounts): Promise<void> {
  const file = dataFilePath()
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, JSON.stringify(counts, null, 2), "utf8")
}

export async function getSiteCounts(): Promise<SiteCounts> {
  if (upstashConfigured()) {
    return (await redisGet()) ?? { ...EMPTY, byPath: {} }
  }
  return fileRead()
}

export async function recordPageView(pathname: string): Promise<SiteCounts> {
  const safePath =
    pathname.startsWith("/") && pathname.length < 200 ? pathname : "/"
  const current = await getSiteCounts()
  const next: SiteCounts = {
    total: current.total + 1,
    byPath: {
      ...current.byPath,
      [safePath]: (current.byPath[safePath] ?? 0) + 1,
    },
    lastUpdated: new Date().toISOString(),
  }
  if (upstashConfigured()) {
    await redisSet(next)
  } else {
    await fileWrite(next)
  }
  return next
}

export function countStorageMode(): "upstash" | "file" {
  return upstashConfigured() ? "upstash" : "file"
}

export function countsPersistOnVercel(): boolean {
  return upstashConfigured()
}
