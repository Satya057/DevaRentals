import React from "react"
import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

/** Body copy: Work Sans 400 (global default). */
const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
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
        className={`${workSans.variable} font-sans font-normal antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
