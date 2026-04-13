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
  icons: {
    icon: [
      {
        url: "/pic/Rental%20DV%20Logo.jpeg?v=4",
        type: "image/jpeg",
        sizes: "192x192",
      },
      {
        url: "/pic/Rental%20DV%20Logo.jpeg?v=4",
        type: "image/jpeg",
        sizes: "512x512",
      },
    ],
    shortcut: "/pic/Rental%20DV%20Logo.jpeg?v=4",
    apple: "/pic/Rental%20DV%20Logo.jpeg?v=4",
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
