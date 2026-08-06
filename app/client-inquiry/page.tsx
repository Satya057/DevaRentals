"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { LandlordInquiryForm } from "@/components/forms/landlord-inquiry-form"

export default function ClientInquiryPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="mb-5 inline-flex items-center gap-2 text-[#8B2332] hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <h1 className="mb-2 text-center font-sans text-3xl text-[#8B2332] md:text-4xl">
          Landlord Inquiry Form
        </h1>
        <div className="mx-auto mb-6 h-0.5 w-16 bg-[#8B2332]" />

        <LandlordInquiryForm showBackLinkOnSuccess />
      </div>
    </div>
  )
}
