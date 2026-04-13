import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Home, MapPin } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Rented Properties | Deva Rentals",
  description:
    "Recently leased rental homes managed by Deva Rentals in the Edmonton area. Sample listings for demonstration.",
}

/** Placeholder data — replace with CMS or API when ready. */
const RENTED_LISTINGS = [
  {
    id: "1",
    address: "10423 82 Ave NW, Edmonton",
    type: "Townhouse",
    leasedDate: "Jan 2025",
    rent: "$2,100 / mo",
  },
  {
    id: "2",
    address: "4521 118 St NW, Edmonton",
    type: "Main-floor suite",
    leasedDate: "Dec 2024",
    rent: "$1,450 / mo",
  },
  {
    id: "3",
    address: "8920 Riverbend Rd, Edmonton",
    type: "Single-family home",
    leasedDate: "Nov 2024",
    rent: "$2,650 / mo",
  },
  {
    id: "4",
    address: "2234 Mill Woods Rd S, Edmonton",
    type: "Duplex",
    leasedDate: "Oct 2024",
    rent: "$1,875 / mo",
  },
]

export default function RentedPropertiesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#f5f0e8]">
      <Header />
      <div className="flex-1 w-[90%] max-w-5xl mx-auto py-10 md:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#8B2332] hover:underline text-sm font-medium mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-sans font-normal text-[#8B2332] text-center mb-2">
          Rented Properties
        </h1>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-2">
          Homes we have successfully placed with tenants. The entries below are sample data for now.
        </p>
        <div className="w-16 h-0.5 bg-[#8B2332] mx-auto mb-10" />

        <ul className="grid sm:grid-cols-2 gap-6">
          {RENTED_LISTINGS.map((item) => (
            <li
              key={item.id}
              className="bg-white rounded-xl border border-[#d4c5b0] p-6 shadow-sm flex flex-col gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-[#8B2332]/10 flex items-center justify-center">
                  <Home className="h-5 w-5 text-[#8B2332]" />
                </div>
                <div className="min-w-0">
                  <p className="font-normal text-foreground leading-snug flex items-start gap-1.5">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-[#8B2332]" />
                    <span>{item.address}</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{item.type}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm pt-2 border-t border-[#d4c5b0]/60">
                <span>
                  <span className="text-muted-foreground">Leased: </span>
                  {item.leasedDate}
                </span>
                <span className="font-medium text-[#1e3a5f]">{item.rent}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </main>
  )
}
