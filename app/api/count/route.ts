import { createHash } from "crypto"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import {
  countStorageMode,
  getSiteCounts,
  siteCountPasswordConfigured,
  verifySiteCountPassword,
} from "@/lib/site-counts"

export const runtime = "nodejs"

const COOKIE = "deva_count_auth"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

function authToken(): string {
  const secret = process.env.SITE_COUNT_PASSWORD?.trim() || ""
  return createHash("sha256").update(`deva-count:${secret}`).digest("hex")
}

export async function GET() {
  if (!siteCountPasswordConfigured()) {
    return NextResponse.json(
      {
        error:
          "Count page is not configured. Set SITE_COUNT_PASSWORD in .env.local (and Vercel env).",
      },
      { status: 503 },
    )
  }

  const jar = await cookies()
  if (jar.get(COOKIE)?.value !== authToken()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const counts = await getSiteCounts()
  return NextResponse.json({
    ok: true,
    ...counts,
    storage: countStorageMode(),
  })
}

export async function POST(request: Request) {
  if (!siteCountPasswordConfigured()) {
    return NextResponse.json(
      {
        error:
          "Count page is not configured. Set SITE_COUNT_PASSWORD in .env.local (and Vercel env).",
      },
      { status: 503 },
    )
  }

  let password = ""
  try {
    const body = (await request.json()) as { password?: string }
    password = typeof body.password === "string" ? body.password : ""
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  if (!verifySiteCountPassword(password)) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 })
  }

  const counts = await getSiteCounts()
  const res = NextResponse.json({
    ok: true,
    ...counts,
    storage: countStorageMode(),
  })
  res.cookies.set(COOKIE, authToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  })
  return res
}
