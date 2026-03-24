"use client"

import React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { formFieldLabelClass } from "@/components/forms/form-label-styles"

interface ScheduleViewingFormProps {
  onSuccess?: () => void
}

export function ScheduleViewingForm({ onSuccess }: ScheduleViewingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    if (onSuccess) {
      setTimeout(onSuccess, 5000)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-serif text-[#8B2332] mb-2">Thank You!</h2>
        <p className="text-[#333]">Your viewing request has been submitted. We will contact you to confirm the viewing date.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className={formFieldLabelClass}>
            Full Name <span className="text-red-600">*</span>
          </label>
          <Input
            placeholder="Full Name"
            required
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
        <div>
          <label className={formFieldLabelClass}>
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

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className={formFieldLabelClass}>
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
          <label className={formFieldLabelClass}>
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

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className={formFieldLabelClass}>
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
          <label className={formFieldLabelClass}>
            Pets <span className="text-red-600">*</span>
          </label>
          <Input
            placeholder="Pets"
            required
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className={formFieldLabelClass}>
            Desired Move-In Date <span className="text-red-600">*</span>
          </label>
          <Input
            type="date"
            required
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
        <div>
          <label className={formFieldLabelClass}>
            Desired Lease Term (e.g., 6 months, 1 year, long-term) <span className="text-red-600">*</span>
          </label>
          <Input
            placeholder="Desired Lease Term"
            required
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className={formFieldLabelClass}>
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
          <label className={formFieldLabelClass}>
            Property You{"'"}re Interested In <span className="text-red-600">*</span>
          </label>
          <Input
            placeholder="Address"
            required
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
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
