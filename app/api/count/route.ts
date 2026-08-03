import { NextResponse } from "next/server"
import { countStorageMode, getSiteCounts } from "@/lib/site-counts"

export const runtime = "nodejs"

export async function GET() {
  try {
    const counts = await getSiteCounts()
    return NextResponse.json({
      ok: true,
      ...counts,
      storage: countStorageMode(),
    })
  } catch (err) {
    console.error("[count]", err)
    return NextResponse.json({ error: "Could not load counts." }, { status: 500 })
  }
}
