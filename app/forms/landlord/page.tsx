"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { LandlordInquiryForm } from "@/components/forms/landlord-inquiry-form"

export default function LandlordInquiryPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#8B2332] hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-serif text-[#8B2332] text-center mb-2">
          Landlord Inquiry Form
        </h1>
        <div className="w-16 h-0.5 bg-[#8B2332] mx-auto mb-10" />

        <LandlordInquiryForm showBackLinkOnSuccess />
      </div>
    </div>
  )
}
