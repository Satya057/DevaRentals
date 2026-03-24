"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { validateRadixCheckboxChecked, validateStepNativeFields } from "@/lib/form-wizard"
import {
  formFieldLabelClass,
  formFieldLabelClassMb3,
  formRadioOptionLabelClass,
} from "@/components/forms/form-label-styles"
import { cn } from "@/lib/utils"

const RENTFASTER_LISTINGS_URL =
  "https://www.rentfaster.ca/ab/edmonton/rentals/?l=11,53.5249,-113.47&user_ID=2236644"

const fieldInputClass =
  "bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332] min-h-11 py-2.5 md:text-sm"
const fieldTextareaClass =
  "bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332] min-h-[6rem] py-2.5 md:text-sm"

export type RentalApplicationFormProps = {
  onSuccess?: () => void
  className?: string
}

const stepTitles = [
  "Property & your information",
  "Co-applicant, tenancy & employment",
  "Credit, additional details & agreement",
]

export function RentalApplicationForm({ onSuccess, className }: RentalApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [step, setStep] = useState(0)
  const step0Ref = useRef<HTMLDivElement>(null)
  const step1Ref = useRef<HTMLDivElement>(null)
  const step2Ref = useRef<HTMLDivElement>(null)

  const goNext = () => {
    const root = step === 0 ? step0Ref.current : step1Ref.current
    if (!validateStepNativeFields(root)) return
    setStep((s) => Math.min(s + 1, 2))
  }

  const goBack = () => setStep((s) => Math.max(s - 1, 0))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (step < 2) {
      goNext()
      return
    }
    const form = e.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    if (!validateRadixCheckboxChecked(form, "rental-app-terms")) {
      form.querySelector<HTMLElement>("#rental-app-terms")?.focus()
      return
    }
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
      <div className="text-center py-8 px-2">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-serif text-[#8B2332] mb-2">Thank You!</h2>
        <p className="text-[#333] mb-6 max-w-md mx-auto">
          Your rental application has been submitted successfully. We will review your application and contact you
          shortly.
        </p>
        {!onSuccess && (
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#8B2332] hover:underline font-medium"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full max-w-none space-y-8", className)} noValidate>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 pb-2 border-b border-[#d4c5b0]/60">
        <p className="text-sm font-medium text-[#333]">
          Section {step + 1} of 3
          <span className="text-[#666] font-normal"> — {stepTitles[step]}</span>
        </p>
        <div
          className="flex gap-1.5"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={3}
          aria-label={`Rental application step ${step + 1} of 3`}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full min-w-[2.5rem] transition-colors",
                i <= step ? "bg-[#8B2332]" : "bg-[#d4c5b0]/80",
              )}
            />
          ))}
        </div>
      </div>

      <div
        ref={step0Ref}
        className={cn(step === 0 ? "space-y-10" : "hidden")}
        aria-hidden={step !== 0}
      >
          {/* Your Personal Information */}
          <section>
            <h2 className="text-xl font-semibold text-[#1c1917] mb-4">Your Personal Information</h2>
            
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-[#1c1917]">Terms & Conditions</h3>
              <div className="bg-white p-4 rounded border border-[#d4c5b0] text-sm text-[#555] space-y-3">
                <p>MaxWell Excel Realty [The LANDLORD] is committed to safeguarding the personal information entrusted to us by the Applicant. Personal information means any information about an identifiable individual. This can include but is not limited to an individual{"'"}s name, home address and phone number, age, sex, marital or family status, financial information, educational history, or employment status. We manage your personal information in accordance with Alberta{"'"}s Personal Information Protection Act and other applicable laws. This policy applies to the LANDLORD and to any person providing services on our behalf.</p>
                <p>We collect the personal information for the purposes of assessing the Applicant(s) and co co-Applicant(s) if any as to suitability as a tenant in general, and/or for a specific rental location</p>
                <p>Your completion of this Application will be taken as your consent to the above use by us, including both the information provided in the Application and personal information obtained by us from other sources as noted in the Application. We will assume the same consent in cases where you volunteer other personal information for an obvious purpose, even though it may not be specifically requested in the Application.</p>
                <p>You may withdraw consent to the use and disclosure of personal information at any time, unless the personal information is necessary for us to fulfill our legal obligations. We will respect your decision, but may not be able to provide you with rental accommodation if we do not have sufficient personal information.</p>
                <p className="font-medium">I/We, the undersigned (the {"'"}Applicant{"'"}, and if applicable the {"'"}Co-Applicant{"'"}) hereby apply for approval as a Tenant(s) of the Landlord based on the information provided on this page and the following 2 pages. I/We understand that the information provided will be viewed to determine my/our suitability for the premises described below, and any other premises that the Landlord my deem appropriate.</p>
              </div>
            </div>

            <p className="text-sm text-[#444] mb-4 leading-relaxed">
              Don{"'"}t have a specific unit yet?{" "}
              <a
                href={RENTFASTER_LISTINGS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#8B2332] underline underline-offset-2 hover:no-underline"
              >
                View available properties
              </a>{" "}
              on RentFaster.ca (Edmonton listings).
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={formFieldLabelClass}>
                  Address of Property <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Address of Property"
                  required
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Date Occupancy Desired <span className="text-red-600">*</span>
                </label>
                <Input
                  type="date"
                  required
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={formFieldLabelClass}>
                  Adults <span className="text-red-600">*</span>
                </label>
                <Input
                  type="number"
                  placeholder="Adults"
                  required
                  min="1"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Children <span className="text-red-600">*</span>
                </label>
                <Input
                  type="number"
                  placeholder="Children"
                  required
                  min="0"
                  className={fieldInputClass}
                />
              </div>
            </div>
          </section>

          {/* Personal Information */}
          <section>
            <h2 className="text-xl font-semibold text-[#1c1917] mb-6">Personal Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={formFieldLabelClass}>
                  Name <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Name"
                  required
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Social Insurance Number
                </label>
                <Input
                  placeholder="Social Insurance Number"
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={formFieldLabelClass}>
                  Current Address <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Current Address"
                  required
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Email Address <span className="text-red-600">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="Email Address"
                  required
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={formFieldLabelClass}>
                  Phone 1 <span className="text-red-600">*</span>
                </label>
                <Input
                  type="tel"
                  placeholder="Phone 1"
                  required
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Phone 2
                </label>
                <Input
                  type="tel"
                  placeholder="Phone 2"
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={formFieldLabelClass}>
                  Date of Birth <span className="text-red-600">*</span>
                </label>
                <Input
                  type="date"
                  required
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Govt Issued Photo ID <span className="text-red-600">*</span>
                </label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  required
                  className={fieldInputClass}
                />
              </div>
            </div>
          </section>

      </div>

      <div
        ref={step1Ref}
        className={cn(step === 1 ? "space-y-10" : "hidden")}
        aria-hidden={step !== 1}
      >
          {/* Co-Applicant's Personal Information */}
          <section>
            <h2 className="text-xl font-semibold text-[#1c1917] mb-6">Co-Applicant{"'"}s Personal Information (if applicable)</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={formFieldLabelClass}>Name</label>
                <Input
                  placeholder="Name"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>Social Insurance Number</label>
                <Input
                  placeholder="Social Insurance Number"
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={formFieldLabelClass}>Current Address</label>
                <Input
                  placeholder="Current Address"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>Email Address</label>
                <Input
                  type="email"
                  placeholder="Email Address"
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={formFieldLabelClass}>Phone 1</label>
                <Input
                  type="tel"
                  placeholder="Phone 1"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>Phone 2</label>
                <Input
                  type="tel"
                  placeholder="Phone 2"
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={formFieldLabelClass}>Date of Birth</label>
                <Input
                  type="date"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>Govt Issued Photo ID</label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  className={fieldInputClass}
                />
              </div>
            </div>
          </section>

          {/* Co-Applicant's Personal Information who is under 18 */}
          <section>
            <h2 className="text-xl font-semibold text-[#1c1917] mb-6">Co-Applicant{"'"}s Personal Information who is under_18</h2>
            
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className={formFieldLabelClass}>Name_1</label>
                <Input
                  placeholder="Name"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>Name_2</label>
                <Input
                  placeholder="Name"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>Name_3</label>
                <Input
                  placeholder="Name"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>Name_4</label>
                <Input
                  placeholder="Name"
                  className={fieldInputClass}
                />
              </div>
            </div>
          </section>

          {/* Previous Tenancy */}
          <section>
            <h2 className="text-xl font-semibold text-[#1c1917] mb-2">Previous Tenancy</h2>
            <p className="text-sm text-[#666] mb-6 italic">If less than 2 years at current location</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={formFieldLabelClass}>
                  Landlord{"'"}s Name <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Landlord's Name"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Landlord{"'"}s Phone <span className="text-red-600">*</span>
                </label>
                <Input
                  type="tel"
                  placeholder="Landlord's Phone"
                  className={fieldInputClass}
                />
                <p className="text-xs text-[#666] mt-1">Only numbers and phone characters (#, -, *, etc)</p>
              </div>
            </div>

            <div className="mb-6">
              <label className={formFieldLabelClass}>
                Present Address <span className="text-red-600">*</span>
              </label>
              <Input
                placeholder="Present Address"
                className={fieldInputClass}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={formFieldLabelClass}>
                  Time at this location <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Time at this location"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Monthly Rent <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Monthly Rent"
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div>
              <label className={formFieldLabelClass}>
                Reason for Leaving <span className="text-red-600">*</span>
              </label>
              <Textarea
                placeholder="Reason for Leaving"
                rows={3}
                className={fieldTextareaClass}
              />
            </div>
          </section>

          {/* Employment Information */}
          <section>
            <h2 className="text-xl font-semibold text-[#1c1917] mb-6">Employment Information</h2>
            
            <div className="mb-6">
              <label className={formFieldLabelClassMb3}>
                Status <span className="text-red-600">*</span>
              </label>
              <RadioGroup defaultValue="full-time" className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full-time" id="status-full" />
                  <label htmlFor="status-full" className={formRadioOptionLabelClass}>Full-Time</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="part-time" id="status-part" />
                  <label htmlFor="status-part" className={formRadioOptionLabelClass}>Part-Time</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="status-student" />
                  <label htmlFor="status-student" className={formRadioOptionLabelClass}>Student</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unemployed" id="status-unemployed" />
                  <label htmlFor="status-unemployed" className={formRadioOptionLabelClass}>Unemployed</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="retired" id="status-retired" />
                  <label htmlFor="status-retired" className={formRadioOptionLabelClass}>Retired</label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={formFieldLabelClass}>
                  Current Employer <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Current Employer"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Address <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Address"
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={formFieldLabelClass}>
                  Supervisor{"'"}s Name <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Supervisor's Name"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Phone <span className="text-red-600">*</span>
                </label>
                <Input
                  type="tel"
                  placeholder="Phone"
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={formFieldLabelClass}>
                  Length of Employment <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Length of Employment"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Monthly Wage <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Monthly Wage"
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className={formFieldLabelClass}>
                Job Position <span className="text-red-600">*</span>
              </label>
              <Input
                placeholder="Job Position"
                className={fieldInputClass}
              />
            </div>

            <div className="mb-6">
              <label className={formFieldLabelClass}>
                If you have other sources of income that you would like us to consider, please list income, source and person <span className="text-red-600">*</span>
              </label>
              <Textarea
                placeholder="If you have other sources of income that you would like us to consider, please list income, source and person"
                rows={3}
                className={fieldTextareaClass}
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className={formFieldLabelClass}>
                  Upload Pictures <span className="text-red-600">*</span>
                </label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Upload Pictures <span className="text-red-600">*</span>
                </label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Upload Pictures
                </label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  className={fieldInputClass}
                />
              </div>
            </div>
          </section>

          {/* Co-Applicant's Employment Information */}
          <section>
            <h2 className="text-xl font-semibold text-[#1c1917] mb-6">Co-Applicant{"'"}s Employment Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={formFieldLabelClass}>Current Employer</label>
                <Input
                  placeholder="Current Employer"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>Address</label>
                <Input
                  placeholder="Address"
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={formFieldLabelClass}>Supervisor{"'"}s Name</label>
                <Input
                  placeholder="Supervisor's Name"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>Phone</label>
                <Input
                  type="tel"
                  placeholder="Phone"
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={formFieldLabelClass}>Length of Employment</label>
                <Input
                  placeholder="Length of Employment"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>Monthly Wage</label>
                <Input
                  placeholder="Monthly Wage"
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className={formFieldLabelClass}>Job Position</label>
              <Input
                placeholder="Job Position"
                className={fieldInputClass}
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className={formFieldLabelClass}>Upload Pictures</label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>Upload Pictures</label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>Upload Pictures</label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  className={fieldInputClass}
                />
              </div>
            </div>
          </section>

      </div>

      <div
        ref={step2Ref}
        className={cn(step === 2 ? "space-y-10" : "hidden")}
        aria-hidden={step !== 2}
      >
          {/* Credit History Description */}
          <section>
            <h2 className="text-xl font-semibold text-[#1c1917] mb-6">Credit History Description</h2>
            
            <div className="space-y-4">
              <div>
                <label className={formFieldLabelClassMb3}>
                  Have you declared bankruptcy in the past seven (7) years? <span className="text-red-600">*</span>
                </label>
                <RadioGroup defaultValue="no" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="bankruptcy-yes" />
                    <label htmlFor="bankruptcy-yes" className={formRadioOptionLabelClass}>Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="bankruptcy-no" />
                    <label htmlFor="bankruptcy-no" className={formRadioOptionLabelClass}>No</label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <label className={formFieldLabelClassMb3}>
                  Have you ever been evicted from a rental residence? <span className="text-red-600">*</span>
                </label>
                <RadioGroup defaultValue="no" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="evicted-yes" />
                    <label htmlFor="evicted-yes" className={formRadioOptionLabelClass}>Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="evicted-no" />
                    <label htmlFor="evicted-no" className={formRadioOptionLabelClass}>No</label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <label className={formFieldLabelClassMb3}>
                  Have you had two or more late rental payments in the past 12 months? <span className="text-red-600">*</span>
                </label>
                <RadioGroup defaultValue="no" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="late-yes" />
                    <label htmlFor="late-yes" className={formRadioOptionLabelClass}>Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="late-no" />
                    <label htmlFor="late-no" className={formRadioOptionLabelClass}>No</label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <label className={formFieldLabelClassMb3}>
                  Have you ever refused to pay rent when due? <span className="text-red-600">*</span>
                </label>
                <RadioGroup defaultValue="no" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="refused-yes" />
                    <label htmlFor="refused-yes" className={formRadioOptionLabelClass}>Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="refused-no" />
                    <label htmlFor="refused-no" className={formRadioOptionLabelClass}>No</label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <label className={formFieldLabelClass}>
                  If you have answered YES to any of the above, please state your reasons and/or circumstances
                </label>
                <Textarea
                  placeholder="If you have answered YES to any of the above, please state your reasons and/or circumstances"
                  rows={3}
                  className={fieldTextareaClass}
                />
              </div>

              <div>
                <label className={formFieldLabelClass}>
                  Please upload if you have current credit report
                </label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  className={fieldInputClass}
                />
              </div>

              <div>
                <label className={formFieldLabelClass}>
                  Please upload if you have current credit report
                </label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  className={fieldInputClass}
                />
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section>
            <h2 className="text-xl font-semibold text-[#1c1917] mb-6">Additional Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className={formFieldLabelClassMb3}>
                  Do you wish to bring a pet(s) to the rental premises? <span className="text-red-600">*</span>
                </label>
                <RadioGroup defaultValue="no" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="bring-pets-yes" />
                    <label htmlFor="bring-pets-yes" className={formRadioOptionLabelClass}>Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="bring-pets-no" />
                    <label htmlFor="bring-pets-no" className={formRadioOptionLabelClass}>No</label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <label className={formFieldLabelClass}>
                  If yes, describe the pets
                </label>
                <Textarea
                  placeholder=""
                  rows={2}
                  className={fieldTextareaClass}
                />
              </div>

              <div>
                <label className={formFieldLabelClassMb3}>
                  Do you, or any proposed occupant, smoke? <span className="text-red-600">*</span>
                </label>
                <RadioGroup defaultValue="no" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="smoke-yes" />
                    <label htmlFor="smoke-yes" className={formRadioOptionLabelClass}>Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="smoke-no" />
                    <label htmlFor="smoke-no" className={formRadioOptionLabelClass}>No</label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <label className={formFieldLabelClassMb3}>
                  If you are co-applicants, do you consent to a joint credit report? <span className="text-red-600">*</span>
                </label>
                <RadioGroup defaultValue="yes" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="joint-yes" />
                    <label htmlFor="joint-yes" className={formRadioOptionLabelClass}>Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="joint-no" />
                    <label htmlFor="joint-no" className={formRadioOptionLabelClass}>No</label>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-[#fef3c7] p-4 rounded border border-[#d4a000] text-sm text-[#333]">
                <p><strong>NOTE:</strong> Landlords are not responsible for tenants{"'"} possessions. If accepted you must carry tenant{"'"}s insurance covering your possessions and protecting you against liability. I/We presently insure our belongings and for third party liability</p>
              </div>

              <div>
                <RadioGroup defaultValue="yes" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="insurance-yes" />
                    <label htmlFor="insurance-yes" className={formRadioOptionLabelClass}>Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="insurance-no" />
                    <label htmlFor="insurance-no" className={formRadioOptionLabelClass}>No</label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <label className={formFieldLabelClass}>
                  Additional Comments by Applicants
                </label>
                <Textarea
                  placeholder="Additional Comments by Applicants"
                  rows={3}
                  className={fieldTextareaClass}
                />
              </div>
            </div>
          </section>

          {/* Emergency Contact */}
          <section>
            <h2 className="text-xl font-semibold text-[#1c1917] mb-6">Emergency Contact</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={formFieldLabelClass}>
                  Name of a person not residing with you <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Name of a person not residing with you"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Address <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Address"
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={formFieldLabelClass}>
                  Phone <span className="text-red-600">*</span>
                </label>
                <Input
                  type="tel"
                  placeholder="Phone"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Relationship <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Relationship"
                  className={fieldInputClass}
                />
              </div>
            </div>
          </section>

          {/* Terms & Conditions */}
          <section>
            <h2 className="text-xl font-semibold text-[#1c1917] mb-6">Terms & Conditions</h2>
            
            <div className="bg-white p-4 rounded border border-[#d4c5b0] text-sm text-[#555] space-y-3 mb-6">
              <p className="text-[#8B2332]">The Applicant and/or Co-Applicant acknowledges that pets, barbeques, waterbeds and aquariums are not permitted without the advance written permission of the Landlord.</p>
              <p className="text-[#8B2332]">If the Landlord permits a pet, an additional Pet Damage Deposit of $100.00 will be paid to the Landlord. The Landlord will hold the Deposit(s) until the Tenancy ends.</p>
              <p>The Applicant(s) do(es) hereby state that the information contained herein is true and correct, and contain no misrepresentations. If misrepresentations are found after a residential tenancy agreement is entered into with the Applicant and/or Co-Applicant, the Landlord shall have the option to terminate the residential tenancy agreement and seek all available remedies.</p>
              <p>The Applicant(s) and/or Co-Applicant authorizes the Landlord to obtain tenant history, credit, personal and employment information from one or more consumer reporting agencies, previous landlords, employers or previous employers and from other sources of such information, to verify the information provided by the Applicant(s) and/or Co-Applicant. The Applicant(s) and/or Co-Applicant authorize(s) the reporting agencies, and any other person, including personnel from any governmental ministry or agency, to disclose relevant information about the Applicant(s) and/or Co-Applicant to the Landlord. If the parties enter into a Residential tenancy agreement, the Applicant(s) and/or Co-Applicant authorize the above information to be used and disclosed for responding to emergencies, ensuring the orderly management of the tenancy and complying with legal requirements.</p>
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <Checkbox id="rental-app-terms" required />
              <label htmlFor="rental-app-terms" className={formRadioOptionLabelClass}>
                Agree with terms and conditions <span className="text-red-600">*</span>
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={formFieldLabelClass}>
                  Signature <span className="text-red-600">*</span>
                </label>
                <div className="bg-white border border-[#d4c5b0] rounded min-h-40 h-40 flex items-center justify-center">
                  <span className="text-[#999] text-sm">Sign here (or type name in Legal Name below)</span>
                </div>
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Co-Applicant{"'"}s Signature
                </label>
                <div className="bg-white border border-[#d4c5b0] rounded min-h-40 h-40 flex items-center justify-center">
                  <span className="text-[#999] text-sm">Click to sign</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className={formFieldLabelClass}>
                  Legal Name <span className="text-red-600">*</span>
                </label>
                <Input placeholder="Legal Name" required className={fieldInputClass} />
              </div>
              <div>
                <label className={formFieldLabelClass}>Co-Applicant{"'"}s Legal Name</label>
                <Input placeholder="Co-Applicant's Legal Name" className={fieldInputClass} />
              </div>
            </div>
          </section>

      </div>

      <div className="flex flex-col-reverse gap-3 pt-6 border-t border-[#d4c5b0]/50 sm:flex-row sm:items-center sm:justify-between">
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
              className="bg-[#8B2332] hover:bg-[#6d1c28] text-white px-10 py-3 min-h-12 min-w-[120px]"
              onClick={goNext}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#8B2332] hover:bg-[#6d1c28] text-white px-12 py-3 text-lg min-h-12"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}
