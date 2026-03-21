"use client"

import React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle } from "lucide-react"

interface ServiceRequestFormProps {
  onSuccess?: () => void
}

export function ServiceRequestForm({ onSuccess }: ServiceRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    if (onSuccess) {
      setTimeout(onSuccess, 2000)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-serif text-[#8B2332] mb-2">Thank You!</h2>
        <p className="text-[#333]">Your service request has been submitted. We will address your issue as soon as possible.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#1e3a5f] font-medium mb-2 text-sm">
            Tenant Name <span className="text-red-600">*</span>
          </label>
          <Input
            placeholder="Tenant Name"
            required
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
        <div>
          <label className="block text-[#c4a000] font-medium mb-2 text-sm">
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

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#1e3a5f] font-medium mb-2 text-sm">
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
          <label className="block text-[#c4a000] font-medium mb-2 text-sm">
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
        <label className="block text-[#1e3a5f] font-medium mb-2 text-sm">
          City <span className="text-red-600">*</span>
        </label>
        <Input
          placeholder="City"
          required
          className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
        />
      </div>

      <div>
        <label className="block text-[#c4a000] font-medium mb-2 text-sm">
          Description <span className="text-red-600">*</span>
        </label>
        <Textarea
          placeholder="Description"
          required
          rows={4}
          className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
        />
      </div>

      {/* File uploads */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num}>
            <label className="block text-[#1e3a5f] font-medium mb-2 text-sm">
              Upload File/Take Photo or Video
            </label>
            <Input
              type="file"
              accept="image/*,video/*"
              className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
            />
          </div>
        ))}
      </div>

      {/* Authorization */}
      <div>
        <label className="block text-[#1e3a5f] font-medium mb-2 text-sm">
          Authorization <span className="text-red-600">*</span>
        </label>
        <RadioGroup defaultValue="granted" className="space-y-2">
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="granted" id="auth-granted" className="mt-1" />
            <label htmlFor="auth-granted" className="text-sm text-[#333]">
              Permission granted to enter the premises in order to make repairs
            </label>
          </div>
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="not-granted" id="auth-not-granted" className="mt-1" />
            <label htmlFor="auth-not-granted" className="text-sm text-[#c4a000]">
              Permission not granted to enter the premises in order to make repairs- please contact prior to entry and 24 hour notice is required
            </label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#8B2332] hover:bg-[#6d1c28] text-white px-12 py-3"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </div>
    </form>
  )
}
