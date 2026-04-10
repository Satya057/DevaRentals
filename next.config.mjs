/** @type {import('next').NextConfig} */
const nextConfig = {
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
