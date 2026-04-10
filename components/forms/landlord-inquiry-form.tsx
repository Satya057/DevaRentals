"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { validateStepNativeFields } from "@/lib/form-wizard"
import { FormStepProgress } from "@/components/forms/form-step-progress"
import {
  formFieldLabelClass as labelForm,
  formRadioOptionLabelClass as radioOptionLabel,
} from "@/components/forms/form-label-styles"
import { BATHROOM_OPTIONS, BEDROOM_OPTIONS } from "@/lib/landlord-inquiry-labels"

const labelPrimary = labelForm
const labelSecondary = labelForm
const labelAccent = labelForm
const labelMaroon = labelForm

interface LandlordInquiryFormProps {
  onSuccess?: () => void
  showBackLinkOnSuccess?: boolean
}

export function LandlordInquiryForm({
  onSuccess,
  showBackLinkOnSuccess = false,
}: LandlordInquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [propertyType, setPropertyType] = useState("front-attach")
  const [petsAllowed, setPetsAllowed] = useState("no")
  const [parking, setParking] = useState("single")
  const [hearAboutUs, setHearAboutUs] = useState("google")
  const [bedrooms, setBedrooms] = useState("1")
  const [bathrooms, setBathrooms] = useState("1")
  const [furnishing, setFurnishing] = useState("unfurnished")
  const [backyard, setBackyard] = useState("yes")
  const [preferredLeaseTerm, setPreferredLeaseTerm] = useState("1-year")
  const [contractTerm, setContractTerm] = useState("1-year")
  const [step, setStep] = useState(0)
  const step0Ref = useRef<HTMLDivElement>(null)
  const step1Ref = useRef<HTMLDivElement>(null)
  const step2Ref = useRef<HTMLDivElement>(null)
  const skipScrollOnMount = useRef(true)

  useEffect(() => {
    if (skipScrollOnMount.current) {
      skipScrollOnMount.current = false
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [step])

  const goNext = () => {
    setSubmitError(null)
    const root = step === 0 ? step0Ref.current : step1Ref.current
    if (!validateStepNativeFields(root)) return
    setStep((s) => Math.min(s + 1, 2))
  }

  const goBack = () => {
    setSubmitError(null)
    setStep((s) => Math.max(s - 1, 0))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateStepNativeFields(step2Ref.current)) return
    setIsSubmitting(true)
    setSubmitError(null)
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      fullName: String(fd.get("fullName") ?? ""),
      secondOwnerName: String(fd.get("secondOwnerName") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      secondOwnerPhone: String(fd.get("secondOwnerPhone") ?? ""),
      email: String(fd.get("email") ?? ""),
      secondOwnerEmail: String(fd.get("secondOwnerEmail") ?? ""),
      propertyAddress: String(fd.get("propertyAddress") ?? ""),
      secondPropertyAddress: String(fd.get("secondPropertyAddress") ?? ""),
      availableDate: String(fd.get("availableDate") ?? ""),
      rentExpectation: String(fd.get("rentExpectation") ?? ""),
      squareFootage: String(fd.get("squareFootage") ?? ""),
      buildYear: String(fd.get("buildYear") ?? ""),
      bedrooms,
      bedroomsOther: String(fd.get("bedroomsOther") ?? ""),
      bathrooms,
      bathroomsOther: String(fd.get("bathroomsOther") ?? ""),
      furnishing,
      backyard,
      preferredLeaseTerm,
      contractTerm,
      propertyType,
      petsAllowed,
      petRestrictions: String(fd.get("petRestrictions") ?? ""),
      parking,
      comments: String(fd.get("comments") ?? ""),
      tourDate: String(fd.get("tourDate") ?? ""),
      hearAboutUs,
      hearAboutSpecify: String(fd.get("hearAboutSpecify") ?? ""),
      friendName: String(fd.get("friendName") ?? ""),
    }
    try {
      const res = await fetch("/api/landlord-inquiry", {
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
        setTimeout(onSuccess, 2000)
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
          Your landlord inquiry has been submitted successfully. We will contact you shortly.
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

  const selectTriggerClass =
    "w-full min-w-0 bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"

  const stepTitles = ["Contact & addresses", "Property details", "Policies & scheduling"]

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <FormStepProgress
        step={step}
        stepTitles={stepTitles}
        ariaLabel="Landlord inquiry form progress"
      />

      {submitError ? (
        <p className="text-sm text-red-600" role="alert">
          {submitError}
        </p>
      ) : null}

      <div ref={step0Ref} className={step === 0 ? "space-y-4" : "hidden"} aria-hidden={step !== 0}>
        <div className="min-w-0">
          <label className={labelPrimary}>
            Full Name <span className="text-red-600">*</span>
          </label>
          <Input
            name="fullName"
            placeholder="Full Name"
            required
            autoComplete="name"
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
          <p className="mt-1 text-xs text-[#666]">
            Please provide the full name of the registered landlord as it appears on the property
            title.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="min-w-0">
            <label className={labelPrimary}>
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
          <div className="min-w-0">
            <label className={labelPrimary}>
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

        <div className="min-w-0">
          <label className={labelPrimary}>
            Property Address <span className="text-red-600">*</span>
          </label>
          <Input
            name="propertyAddress"
            placeholder="Property Address"
            required
            autoComplete="street-address"
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>

        <div className="min-w-0">
          <label className={labelPrimary}>2nd Property Address</label>
          <Input
            name="secondPropertyAddress"
            placeholder="2nd Property Address (optional)"
            autoComplete="street-address"
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="min-w-0">
            <label className={labelSecondary}>2nd Owner Full Name</label>
            <Input
              name="secondOwnerName"
              placeholder="2nd Owner Full Name"
              className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
            />
          </div>
          <div className="min-w-0">
            <label className={labelSecondary}>2nd Owner Phone Number</label>
            <Input
              name="secondOwnerPhone"
              type="tel"
              placeholder="2nd Owner Phone Number"
              className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
            />
          </div>
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <label className={labelSecondary}>2nd Owner Email</label>
            <Input
              name="secondOwnerEmail"
              type="email"
              placeholder="2nd Owner Email"
              className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
            />
          </div>
        </div>
      </div>

      <div ref={step1Ref} className={step === 1 ? "space-y-4" : "hidden"} aria-hidden={step !== 1}>
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className={labelPrimary}>
            Available Date for New Tenants <span className="text-red-600">*</span>
          </label>
          <Input
            name="availableDate"
            type="date"
            required
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
        <div>
          <label className={labelAccent}>
            Rent Expectation (Monthly) <span className="text-red-600">*</span>
          </label>
          <Input
            name="rentExpectation"
            placeholder="Rent Expectation (Monthly)"
            required
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className={labelPrimary}>
            Square Footage <span className="text-red-600">*</span>
          </label>
          <Input
            name="squareFootage"
            placeholder="Square Footage"
            required
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
        <div>
          <label className={labelAccent}>
            Property Build Year <span className="text-red-600">*</span>
          </label>
          <Input
            name="buildYear"
            placeholder="Property Build Year"
            required
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className={labelPrimary}>
            Number of Bedrooms <span className="text-red-600">*</span>
          </label>
          <Select
            value={bedrooms}
            onValueChange={setBedrooms}
            required
          >
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="1" />
            </SelectTrigger>
            <SelectContent>
              {BEDROOM_OPTIONS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className={labelAccent}>
            Number of Bathrooms <span className="text-red-600">*</span>
          </label>
          <Select
            value={bathrooms}
            onValueChange={setBathrooms}
            required
          >
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="1" />
            </SelectTrigger>
            <SelectContent>
              {BATHROOM_OPTIONS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {bedrooms === "other" ? (
        <div>
          <label className={labelAccent}>Specify Other Bedrooms</label>
          <Input
            name="bedroomsOther"
            placeholder="Describe bedrooms (e.g. 3+loft)"
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
      ) : null}

      {bathrooms === "other" ? (
        <div>
          <label className={labelAccent}>Specify Other Bathrooms</label>
          <Input
            name="bathroomsOther"
            placeholder="Describe bathrooms (e.g. 2 full + powder)"
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
      ) : null}

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className={labelPrimary}>
            Furnishing Type <span className="text-red-600">*</span>
          </label>
          <Select
            value={furnishing}
            onValueChange={setFurnishing}
            required
          >
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="Unfurnished" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unfurnished">Unfurnished</SelectItem>
              <SelectItem value="furnished">Furnished</SelectItem>
              <SelectItem value="semi-furnished">Semi Furnished</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className={labelAccent}>
            Backyard Availability <span className="text-red-600">*</span>
          </label>
          <Select value={backyard} onValueChange={setBackyard} required>
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="Yes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className={labelMaroon}>
            Preferred Tenant Lease Term <span className="text-red-600">*</span>
          </label>
          <Select
            value={preferredLeaseTerm}
            onValueChange={setPreferredLeaseTerm}
            required
          >
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="1 Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6-months">6 Months</SelectItem>
              <SelectItem value="1-year">1 Year</SelectItem>
              <SelectItem value="2-years">2 Years</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className={labelPrimary}>
            Contract Term Period <span className="text-red-600">*</span>
          </label>
          <Select
            value={contractTerm}
            onValueChange={setContractTerm}
            required
          >
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="1 Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6-months">6 Months</SelectItem>
              <SelectItem value="1-year">1 Year</SelectItem>
              <SelectItem value="2-years">2 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Property Type — full width after property details (reference order) */}
      <div>
        <label className={labelPrimary}>
          Property Type <span className="text-red-600">*</span>
        </label>
        <RadioGroup
          value={propertyType}
          onValueChange={setPropertyType}
          className="flex flex-wrap gap-x-4 gap-y-2"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="front-attach" id="front-attach" />
            <label htmlFor="front-attach" className={radioOptionLabel}>
              Front Attach Garage
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="lane-home" id="lane-home" />
            <label htmlFor="lane-home" className={radioOptionLabel}>
              Lane Home (Back Garage)
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="duplex" id="duplex" />
            <label htmlFor="duplex" className={radioOptionLabel}>
              Duplex
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="townhouse" id="townhouse" />
            <label htmlFor="townhouse" className={radioOptionLabel}>
              Townhouse
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="apartment" id="apartment" />
            <label htmlFor="apartment" className={radioOptionLabel}>
              Apartment
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="main-floor" id="main-floor" />
            <label htmlFor="main-floor" className={radioOptionLabel}>
              Main Floor
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="basement" id="basement" />
            <label htmlFor="basement" className={radioOptionLabel}>
              Basement
            </label>
          </div>
        </RadioGroup>
      </div>
      </div>

      <div
        ref={step2Ref}
        className={step === 2 ? "space-y-4" : "hidden"}
        aria-hidden={step !== 2}
      >
      <div>
        <label className={labelPrimary}>
          Are Pets Allowed? <span className="text-red-600">*</span>
        </label>
        <RadioGroup
          value={petsAllowed}
          onValueChange={setPetsAllowed}
          className="flex flex-wrap gap-3"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="yes" id="pets-yes" />
            <label htmlFor="pets-yes" className={radioOptionLabel}>
              Yes
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="no" id="pets-no" />
            <label htmlFor="pets-no" className={radioOptionLabel}>
              No
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="negotiable" id="pets-negotiable" />
            <label htmlFor="pets-negotiable" className={radioOptionLabel}>
              Negotiable
            </label>
          </div>
        </RadioGroup>
        <p className="text-xs text-[#666] mt-2">
          Note: Pet-friendly properties get $50.00 extra rent per month.
        </p>
      </div>

      <div>
        <label className={labelAccent}>
          Specify Restrictions (pets) <span className="text-red-600">*</span>
        </label>
        <Input
          name="petRestrictions"
          placeholder="Specify restrictions (e.g. size, type, or N/A)"
          required
          className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
        />
      </div>

      <div>
        <label className={labelPrimary}>
          Parking Availability <span className="text-red-600">*</span>
        </label>
        <RadioGroup
          value={parking}
          onValueChange={setParking}
          className="flex flex-wrap gap-x-4 gap-y-2"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="single" id="parking-single" />
            <label htmlFor="parking-single" className={radioOptionLabel}>
              Single Garage
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="double" id="parking-double" />
            <label htmlFor="parking-double" className={radioOptionLabel}>
              Double Garage
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="street" id="parking-street" />
            <label htmlFor="parking-street" className={radioOptionLabel}>
              Street Parking
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="covered" id="parking-covered" />
            <label htmlFor="parking-covered" className={radioOptionLabel}>
              Covered Stall
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="underground" id="parking-underground" />
            <label htmlFor="parking-underground" className={radioOptionLabel}>
              Under Ground
            </label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <label className={labelPrimary}>
          Any Comments or information you{"'"}d like to share with us before we call you?
        </label>
        <Textarea
          name="comments"
          placeholder="Optional"
          rows={3}
          className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
        />
      </div>

      <div>
        <label className={labelAccent}>
          What date would you like to visit the property for an in-person tour?{" "}
          <span className="text-red-600">*</span>
        </label>
        <Input
          name="tourDate"
          type="date"
          required
          className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
        />
        <p className="text-xs text-muted-foreground mt-1">Select preferred date</p>
      </div>

      <div>
        <label className={labelMaroon}>
          How did you hear about us? <span className="text-red-600">*</span>
        </label>
        <RadioGroup
          value={hearAboutUs}
          onValueChange={setHearAboutUs}
          className="flex flex-wrap gap-x-4 gap-y-2"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="facebook" id="hear-facebook" />
            <label htmlFor="hear-facebook" className={radioOptionLabel}>
              Facebook
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="google" id="hear-google" />
            <label htmlFor="hear-google" className={radioOptionLabel}>
              Google
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="website" id="hear-website" />
            <label htmlFor="hear-website" className={radioOptionLabel}>
              Website
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="instagram" id="hear-instagram" />
            <label htmlFor="hear-instagram" className={radioOptionLabel}>
              Instagram
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="referral" id="hear-referral" />
            <label htmlFor="hear-referral" className={radioOptionLabel}>
              Friend Referral
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="others" id="hear-others" />
            <label htmlFor="hear-others" className={radioOptionLabel}>
              Others
            </label>
          </div>
        </RadioGroup>
        {hearAboutUs === "others" ? (
          <div className="mt-3 min-w-0">
            <label className={labelMaroon}>Please specify</label>
            <Input
              name="hearAboutSpecify"
              placeholder="How did you hear about us?"
              className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
            />
          </div>
        ) : null}
        {hearAboutUs === "referral" ? (
          <div className="mt-3 min-w-0">
            <label className={labelMaroon}>Friend{"'"}s Name</label>
            <Input
              name="friendName"
              placeholder="Friend's name"
              className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
            />
          </div>
        ) : null}
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
          {step < 2 ? (
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
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}
