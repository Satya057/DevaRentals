import { NextResponse } from "next/server"
import { recordPageView } from "@/lib/site-counts"

export const runtime = "nodejs"

const SKIP = new Set(["/count", "/api/hit", "/api/count"])

export async function POST(request: Request) {
  let pathname = "/"
  try {
    const body = (await request.json()) as { path?: string }
    if (typeof body.path === "string" && body.path.startsWith("/")) {
      pathname = body.path.split("?")[0] || "/"
    }
  } catch {
    /* ignore bad body */
  }

  if (SKIP.has(pathname) || pathname.startsWith("/api/")) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  try {
    await recordPageView(pathname)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[hit]", err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
