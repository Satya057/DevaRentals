import React from "react"
import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'Deva Rentals | Property Management Edmonton',
  description: 'Edmonton\'s trusted property management company. 10+ years of delivering rock-solid results for property owners. Expert tenant management, maintenance, and rental law compliance.',
  icons: {
    icon: [{ url: '/pic/Logo1.png?v=4', type: 'image/png' }],
    shortcut: '/pic/Logo1.png?v=4',
    apple: '/pic/Logo1.png?v=4',
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
        className={`${josefinSans.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
