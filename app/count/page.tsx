"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"

type CountData = {
  total: number
  byPath: Record<string, number>
  lastUpdated: string | null
  storage?: string
}

export default function SiteCountPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<CountData | null>(null)

  const loadFromCookie = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/count", { cache: "no-store" })
      if (res.status === 401) {
        setData(null)
        return
      }
      const json = (await res.json()) as CountData & { error?: string }
      if (!res.ok) {
        setError(json.error || "Could not load counts.")
        setData(null)
        return
      }
      setData(json)
    } catch {
      setError("Network error.")
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadFromCookie()
  }, [loadFromCookie])

  const unlock = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/count", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const json = (await res.json()) as CountData & { error?: string }
      if (!res.ok) {
        setError(json.error || "Wrong password.")
        setData(null)
        return
      }
      setData(json)
      setPassword("")
    } catch {
      setError("Network error.")
    } finally {
      setLoading(false)
    }
  }

  const paths = data
    ? Object.entries(data.byPath).sort((a, b) => b[1] - a[1])
    : []

  return (
    <main className="min-h-dvh bg-[#f5f0e8] px-4 py-10 text-[#333]">
      <div className="mx-auto w-full max-w-lg">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[#8B2332]/80">
          Internal only
        </p>
        <h1 className="mb-6 font-sans text-2xl font-semibold text-[#8B2332]">
          Website click count
        </h1>

        {loading && !data ? (
          <p className="text-sm text-[#666]">Loading…</p>
        ) : null}

        {!data ? (
          <form
            onSubmit={unlock}
            className="space-y-3 rounded-lg border border-[#d4c5b0] bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-[#555]">
              Enter the site count password to view visit totals. This page is not linked
              from the public site.
            </p>
            <label className="block text-sm font-medium text-[#3d2a26]">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="mt-1 w-full rounded-md border border-[#d4c5b0] bg-white px-3 py-2 text-sm focus:border-[#8B2332] focus:outline-none focus:ring-1 focus:ring-[#8B2332]"
                required
              />
            </label>
            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-[#8B2332] px-4 py-2 text-sm font-medium text-white hover:bg-[#6d1c28] disabled:opacity-60"
            >
              {loading ? "Checking…" : "View counts"}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border border-[#d4c5b0] bg-white p-5 shadow-sm">
              <p className="text-sm text-[#666]">Total page views</p>
              <p className="mt-1 text-4xl font-semibold tabular-nums text-[#8B2332]">
                {data.total.toLocaleString()}
              </p>
              {data.lastUpdated ? (
                <p className="mt-2 text-xs text-[#777]">
                  Last update:{" "}
                  {new Date(data.lastUpdated).toLocaleString("en-CA", {
                    timeZone: "America/Edmonton",
                  })}
                </p>
              ) : null}
              {data.storage ? (
                <p className="mt-1 text-xs text-[#999]">
                  Storage: {data.storage === "upstash" ? "Upstash Redis" : "local file"}
                </p>
              ) : null}
            </div>

            <div className="rounded-lg border border-[#d4c5b0] bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold text-[#3d2a26]">By page</h2>
              {paths.length === 0 ? (
                <p className="text-sm text-[#777]">No visits recorded yet.</p>
              ) : (
                <ul className="divide-y divide-[#eee] text-sm">
                  {paths.map(([path, n]) => (
                    <li
                      key={path}
                      className="flex items-center justify-between gap-3 py-2"
                    >
                      <span className="min-w-0 truncate font-mono text-[13px] text-[#444]">
                        {path}
                      </span>
                      <span className="shrink-0 tabular-nums font-medium text-[#8B2332]">
                        {n.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void loadFromCookie()}
                className="rounded-md border border-[#8B2332] px-4 py-2 text-sm text-[#8B2332] hover:bg-[#8B2332]/10"
              >
                Refresh
              </button>
              <Link href="/" className="text-sm text-[#8B2332] underline-offset-2 hover:underline">
                Back to site
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
