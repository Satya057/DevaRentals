import React from "react"
import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

/** Global UI font: Work Sans; 400 is default (see globals.css base). */
const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://devarentals.com",
  ),
  title: 'Deva Rentals | Property Management Edmonton',
  description: 'Edmonton\'s trusted property management company. 10+ years of delivering rock-solid results for property owners. Expert tenant management, maintenance, and rental law compliance.',
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/favicon.jpg?v=9",
        type: "image/jpeg",
        sizes: "48x48",
      },
      {
        url: "/favicon.jpg?v=9",
        type: "image/jpeg",
        sizes: "192x192",
      },
      {
        url: "/favicon.jpg?v=9",
        type: "image/jpeg",
        sizes: "512x512",
      },
    ],
    shortcut: "/favicon.jpg?v=9",
    apple: [
      { url: "/favicon.jpg?v=9", sizes: "180x180", type: "image/jpeg" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${workSans.variable} font-sans font-normal antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
