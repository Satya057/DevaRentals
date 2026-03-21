"use client"

import React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ScheduleViewingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-serif text-[#8B2332] mb-6">Thank You!</h1>
          <p className="text-[#333] mb-8">Your viewing request has been submitted successfully. We will contact you to confirm the viewing date.</p>
          <Link href="/" className="inline-flex items-center gap-2 text-[#8B2332] hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#8B2332] hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-serif text-[#8B2332] text-center mb-2">
          Schedule Viewing
        </h1>
        <div className="w-16 h-0.5 bg-[#8B2332] mx-auto mb-10" />

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#1e3a5f] font-medium mb-2">
                Full Name <span className="text-red-600">*</span>
              </label>
              <Input
                placeholder="Full Name"
                required
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>
            <div>
              <label className="block text-[#c4a000] font-medium mb-2">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <Input
                type="tel"
                placeholder="Phone Number"
                required
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#1e3a5f] font-medium mb-2">
                Email <span className="text-red-600">*</span>
              </label>
              <Input
                type="email"
                placeholder="Email"
                required
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>
            <div>
              <label className="block text-[#c4a000] font-medium mb-2">
                Number of Adults - moving in <span className="text-red-600">*</span>
              </label>
              <Input
                type="number"
                placeholder="Number of Adults"
                required
                min="1"
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#1e3a5f] font-medium mb-2">
                Number of Kids - moving in <span className="text-red-600">*</span>
              </label>
              <Input
                type="number"
                placeholder="Number of Kids"
                required
                min="0"
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>
            <div>
              <label className="block text-[#c4a000] font-medium mb-2">
                Pets <span className="text-red-600">*</span>
              </label>
              <Input
                placeholder="Pets"
                required
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#1e3a5f] font-medium mb-2">
                Desired Move-In Date <span className="text-red-600">*</span>
              </label>
              <Input
                type="date"
                required
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>
            <div>
              <label className="block text-[#c4a000] font-medium mb-2">
                Desired Lease Term (e.g., 6 months, 1 year, long-term) <span className="text-red-600">*</span>
              </label>
              <Input
                placeholder="Desired Lease Term"
                required
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#1e3a5f] font-medium mb-2">
                Number of Vehicles <span className="text-red-600">*</span>
              </label>
              <Input
                type="number"
                placeholder="Number of Vehicles"
                required
                min="0"
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>
            <div>
              <label className="block text-[#c4a000] font-medium mb-2">
                Property You{"'"}re Interested In <span className="text-red-600">*</span>
              </label>
              <Input
                placeholder="Address"
                required
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#8B2332] hover:bg-[#6d1c28] text-white px-12 py-3 text-lg"
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
