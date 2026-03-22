"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { RentalApplicationForm } from "@/components/forms/rental-application-form"

export default function RentalApplicationPage() {
  return (
    <div className="min-h-screen bg-[#f9f7f2] py-10 px-4 sm:px-6">
      <div className="w-full max-w-[min(100%,72rem)] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#8B2332] hover:underline mb-8 font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-serif text-[#8B2332] text-center mb-2">Rental Application</h1>
        <div className="w-16 h-0.5 bg-[#333] mx-auto mb-10" />

        <RentalApplicationForm />
      </div>
    </div>
  )
}
