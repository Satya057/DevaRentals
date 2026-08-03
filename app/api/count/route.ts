import { NextResponse } from "next/server"
import {
  countStorageMode,
  countsPersistOnVercel,
  getSiteCounts,
  upstashConfigured,
} from "@/lib/site-counts"

export const runtime = "nodejs"

export async function GET() {
  try {
    const counts = await getSiteCounts()
    const onVercel = Boolean(process.env.VERCEL)
    return NextResponse.json({
      ok: true,
      ...counts,
      storage: countStorageMode(),
      needsUpstash: onVercel && !upstashConfigured(),
      persists: !onVercel || countsPersistOnVercel(),
    })
  } catch (err) {
    console.error("[count]", err)
    return NextResponse.json({ error: "Could not load counts." }, { status: 500 })
  }
}
