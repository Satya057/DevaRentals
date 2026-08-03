import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Site count | Deva Rentals",
  robots: { index: false, follow: false },
}

export default function CountLayout({ children }: { children: React.ReactNode }) {
  return children
}
