"use client"

import React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ServiceRequestForm() {
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
          <p className="text-[#333] mb-8">Your service request has been submitted successfully. Our maintenance team will contact you shortly.</p>
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
          Service Request
        </h1>
        <div className="w-16 h-0.5 bg-[#8B2332] mx-auto mb-10" />

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#1e3a5f] font-medium mb-2">
                Tenant Name <span className="text-red-600">*</span>
              </label>
              <Input
                placeholder="Tenant Name"
                required
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>
            <div>
              <label className="block text-[#c4a000] font-medium mb-2">
                Email <span className="text-red-600">*</span>
              </label>
              <Input
                type="email"
                placeholder="Email"
                required
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#1e3a5f] font-medium mb-2">
                Cell <span className="text-red-600">*</span>
              </label>
              <Input
                type="tel"
                placeholder="Cell"
                required
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>
            <div>
              <label className="block text-[#c4a000] font-medium mb-2">
                Address <span className="text-red-600">*</span>
              </label>
              <Input
                placeholder="Address"
                required
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>
          </div>

          <div className="md:w-1/2">
            <label className="block text-[#1e3a5f] font-medium mb-2">
              City <span className="text-red-600">*</span>
            </label>
            <Input
              placeholder="City"
              required
              className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
            />
          </div>

          <div>
            <label className="block text-[#c4a000] font-medium mb-2">
              Description <span className="text-red-600">*</span>
            </label>
            <Textarea
              placeholder="Description"
              required
              rows={5}
              className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
            />
          </div>

          {/* File Uploads */}
          <div className="space-y-4">
            <div>
              <label className="block text-[#8B2332] font-medium mb-2">
                Upload File/Take Photo or Video
              </label>
              <Input
                type="file"
                accept="image/*,video/*,.pdf"
                multiple
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>
            <div>
              <label className="block text-[#8B2332] font-medium mb-2">
                Upload File/Take Photo or Video
              </label>
              <Input
                type="file"
                accept="image/*,video/*,.pdf"
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>
            <div>
              <label className="block text-[#8B2332] font-medium mb-2">
                Upload File/Take Photo or Video
              </label>
              <Input
                type="file"
                accept="image/*,video/*,.pdf"
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>
            <div>
              <label className="block text-[#8B2332] font-medium mb-2">
                Upload File/Take Photo or Video
              </label>
              <Input
                type="file"
                accept="image/*,video/*,.pdf"
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>
            <div>
              <label className="block text-[#8B2332] font-medium mb-2">
                Upload File/Take Photo or Video
              </label>
              <Input
                type="file"
                accept="image/*,video/*,.pdf"
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>
          </div>

          {/* Authorization */}
          <div>
            <label className="block text-[#1e3a5f] font-medium mb-3">
              Authorization <span className="text-red-600">*</span>
            </label>
            <RadioGroup defaultValue="permission-granted" className="space-y-3">
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="permission-granted" id="auth-granted" className="mt-1" />
                <label htmlFor="auth-granted" className="text-sm text-[#1e6b35]">
                  Permission granted to enter the premises in order to make repairs
                </label>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="permission-not-granted" id="auth-not-granted" className="mt-1" />
                <label htmlFor="auth-not-granted" className="text-sm text-[#c4a000]">
                  Permission not granted to enter the premises in order to make repairs- please contact prior to entry and 24 hour notice is required
                </label>
              </div>
            </RadioGroup>
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
