/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Google and browsers often request `/favicon.ico` first — serve main logo bytes */
  async rewrites() {
    return [
      { source: "/favicon.ico", destination: "/rental-dv-logo.jpg" },
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
}

export default nextConfig
