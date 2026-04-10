"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { formFieldLabelClass } from "@/components/forms/form-label-styles"

interface ScheduleViewingFormProps {
  onSuccess?: () => void
  /** After success, redirect to home (e.g. 5000 ms). Omit when used in a dialog. */
  redirectHomeAfterMs?: number
  showBackLinkOnSuccess?: boolean
}

export function ScheduleViewingForm({
  onSuccess,
  redirectHomeAfterMs,
  showBackLinkOnSuccess = false,
}: ScheduleViewingFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    if (!isSubmitted || redirectHomeAfterMs == null) return
    const t = window.setTimeout(() => router.push("/"), redirectHomeAfterMs)
    return () => window.clearTimeout(t)
  }, [isSubmitted, redirectHomeAfterMs, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      fullName: String(fd.get("fullName") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      adults: String(fd.get("adults") ?? ""),
      kids: String(fd.get("kids") ?? ""),
      pets: String(fd.get("pets") ?? ""),
      moveInDate: String(fd.get("moveInDate") ?? ""),
      leaseTerm: String(fd.get("leaseTerm") ?? ""),
      vehicles: String(fd.get("vehicles") ?? ""),
      propertyAddress: String(fd.get("propertyAddress") ?? ""),
    }
    try {
      const res = await fetch("/api/schedule-viewing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setSubmitError(
          typeof data.error === "string"
            ? data.error
            : "Something went wrong. Please try again.",
        )
        return
      }
      setIsSubmitted(true)
      if (onSuccess) {
        setTimeout(onSuccess, 5000)
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-serif text-[#8B2332] mb-2">Thank You!</h2>
        <p className="text-[#333]">
          Your viewing request has been submitted. We will contact you to confirm
          the viewing date.
        </p>
        {showBackLinkOnSuccess && (
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#8B2332] hover:underline mt-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitError ? (
        <p className="text-sm text-red-600" role="alert">
          {submitError}
        </p>
      ) : null}

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className={formFieldLabelClass}>
            Full Name <span className="text-red-600">*</span>
          </label>
          <Input
            name="fullName"
            placeholder="Full Name"
            required
            autoComplete="name"
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
        <div>
          <label className={formFieldLabelClass}>
            Phone Number <span className="text-red-600">*</span>
          </label>
          <Input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            required
            autoComplete="tel"
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
            name="email"
            type="email"
            placeholder="Email"
            required
            autoComplete="email"
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
        <div>
          <label className={formFieldLabelClass}>
            Number of Adults - moving in <span className="text-red-600">*</span>
          </label>
          <Input
            name="adults"
            type="number"
            placeholder="Number of Adults"
            required
            min={1}
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
            name="kids"
            type="number"
            placeholder="Number of Kids"
            required
            min={0}
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
        <div>
          <label className={formFieldLabelClass}>
            Pets <span className="text-red-600">*</span>
          </label>
          <Input
            name="pets"
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
            name="moveInDate"
            type="date"
            required
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
        <div>
          <label className={formFieldLabelClass}>
            Desired Lease Term (e.g., 6 months, 1 year, long-term){" "}
            <span className="text-red-600">*</span>
          </label>
          <Input
            name="leaseTerm"
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
            name="vehicles"
            type="number"
            placeholder="Number of Vehicles"
            required
            min={0}
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
        <div>
          <label className={formFieldLabelClass}>
            Property You{"'"}re Interested In <span className="text-red-600">*</span>
          </label>
          <Input
            name="propertyAddress"
            placeholder="Address"
            required
            autoComplete="street-address"
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
