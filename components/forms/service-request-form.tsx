"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { validateStepNativeFields } from "@/lib/form-wizard"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, CheckCircle } from "lucide-react"
import {
  formFieldLabelClass as labelClass,
  formRadioOptionLabelClass,
} from "@/components/forms/form-label-styles"
import { FormStepProgress } from "@/components/forms/form-step-progress"

interface ServiceRequestFormProps {
  onSuccess?: () => void
  /** Full-page route: thank-you screen includes “Back to Home”. */
  showBackLinkOnSuccess?: boolean
}

export function ServiceRequestForm({
  onSuccess,
  showBackLinkOnSuccess = false,
}: ServiceRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [step, setStep] = useState(0)
  const step0Ref = useRef<HTMLDivElement>(null)
  const step1Ref = useRef<HTMLDivElement>(null)
  const skipScrollOnMount = useRef(true)

  const stepTitles = ["Contact & request details", "Authorization"]

  useEffect(() => {
    if (skipScrollOnMount.current) {
      skipScrollOnMount.current = false
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [step])

  const goNext = () => {
    if (!validateStepNativeFields(step0Ref.current)) return
    setStep(1)
  }

  const goBack = () => setStep(0)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateStepNativeFields(step1Ref.current)) return
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
        <p className="text-[#333]">
          Your service request has been submitted. Our maintenance team will contact you shortly.
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
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <FormStepProgress
        step={step}
        stepTitles={stepTitles}
        ariaLabel="Service request form progress"
      />

      <div
        ref={step0Ref}
        className={step === 0 ? "space-y-4" : "hidden"}
        aria-hidden={step !== 0}
      >
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>
              Tenant Name <span className="text-red-600">*</span>
            </label>
            <Input
              name="tenantName"
              placeholder="Tenant Name"
              required
              autoComplete="name"
              className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
            />
          </div>
          <div>
            <label className={labelClass}>
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
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>
              Cell <span className="text-red-600">*</span>
            </label>
            <Input
              name="cell"
              type="tel"
              placeholder="Cell"
              required
              autoComplete="tel"
              className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
            />
          </div>
          <div>
            <label className={labelClass}>
              Address <span className="text-red-600">*</span>
            </label>
            <Input
              name="address"
              placeholder="Address"
              required
              autoComplete="street-address"
              className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
            />
          </div>
        </div>

        <div className="md:w-1/2">
          <label className={labelClass}>
            City <span className="text-red-600">*</span>
          </label>
          <Input
            name="city"
            placeholder="City"
            required
            autoComplete="address-level2"
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>

        <div>
          <label className={labelClass}>
            Description <span className="text-red-600">*</span>
          </label>
          <Textarea
            name="description"
            placeholder="Description"
            required
            rows={4}
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>

        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num}>
              <label className={labelClass} htmlFor={`service-file-${num}`}>
                Upload File/Take Photo or Video
              </label>
              <Input
                id={`service-file-${num}`}
                name={`attachment${num}`}
                type="file"
                accept="image/*,video/*,.pdf"
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332] file:mr-3"
              />
            </div>
          ))}
        </div>
      </div>

      <div
        ref={step1Ref}
        className={step === 1 ? "space-y-4" : "hidden"}
        aria-hidden={step !== 1}
      >
        <div>
          <label className={labelClass}>
            Authorization <span className="text-red-600">*</span>
          </label>
          <RadioGroup defaultValue="granted" name="authorization" className="space-y-3">
            <div className="flex items-start gap-2">
              <RadioGroupItem value="granted" id="auth-granted" className="mt-1 shrink-0" />
              <label htmlFor="auth-granted" className={formRadioOptionLabelClass}>
                Permission granted to enter the premises in order to make repairs
              </label>
            </div>
            <div className="flex items-start gap-2">
              <RadioGroupItem value="not-granted" id="auth-not-granted" className="mt-1 shrink-0" />
              <label htmlFor="auth-not-granted" className={formRadioOptionLabelClass}>
                Permission not granted to enter the premises in order to make repairs- please
                contact prior to entry and 24 hour notice is required
              </label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-4 border-t border-[#d4c5b0]/50 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="outline"
          className="border-[#8B2332] text-[#8B2332] hover:bg-[#8B2332]/10 sm:min-w-[100px]"
          disabled={step === 0}
          onClick={goBack}
        >
          Back
        </Button>
        <div className="flex justify-center gap-3 sm:justify-end">
          {step < 1 ? (
            <Button
              type="button"
              className="bg-[#8B2332] hover:bg-[#6d1c28] text-white px-10 py-3 min-w-[120px]"
              onClick={goNext}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#8B2332] hover:bg-[#6d1c28] text-white px-10 py-3 min-w-[120px]"
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}
