import { promises as fs } from "fs"
import path from "path"

export type SiteCounts = {
  total: number
  byPath: Record<string, number>
  lastUpdated: string | null
}

const EMPTY: SiteCounts = { total: 0, byPath: {}, lastUpdated: null }
const REDIS_KEY = "deva:site-counts"
const DATA_FILE = path.join(process.cwd(), "data", "site-counts.json")

function upstashConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() &&
      process.env.UPSTASH_REDIS_REST_TOKEN?.trim(),
  )
}

async function redisGet(): Promise<SiteCounts | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL!.trim()
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!.trim()
  const res = await fetch(`${url}/get/${encodeURIComponent(REDIS_KEY)}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  if (!res.ok) return null
  const json = (await res.json()) as { result?: string | null }
  if (!json.result) return null
  try {
    return JSON.parse(json.result) as SiteCounts
  } catch {
    return null
  }
}

async function redisSet(counts: SiteCounts): Promise<void> {
  const url = process.env.UPSTASH_REDIS_REST_URL!.trim()
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!.trim()
  await fetch(`${url}/set/${encodeURIComponent(REDIS_KEY)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(counts),
  })
}

async function fileRead(): Promise<SiteCounts> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8")
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
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
  await fs.writeFile(DATA_FILE, JSON.stringify(counts, null, 2), "utf8")
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
