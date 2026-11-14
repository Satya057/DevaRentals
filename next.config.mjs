import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Parent folder has another package-lock.json; keep env + Turbopack rooted here.
  turbopack: {
    root: projectRoot,
  },
  /** Google and browsers often request `/favicon.ico` first — serve main logo bytes */
  async rewrites() {
    return [
      { source: "/favicon.ico", destination: "/rental-dv-logo.jpg" },
    ]
  },
  async redirects() {
    return [
      {
        source: "/forms/landlord",
        destination: "/client-inquiry",
        permanent: true,
      },
    ]
  },
  /** pdfkit reads font data from its package dir — must not be webpack-bundled */
  serverExternalPackages: ["pdfkit"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "45mb",
    },
    proxyClientMaxBodySize: "45mb",
  },
}

export default nextConfig
