"use client"

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentProps,
  type FormEvent,
  type KeyboardEvent,
} from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Input as UiInput } from "@/components/ui/input"
import { Textarea as UiTextarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  collectInvalidRequiredFieldLabels,
  stepFieldsAreValid,
  validateRadixCheckboxChecked,
  validateStepNativeFields,
} from "@/lib/form-wizard"
import {
  formFieldLabelClass,
  formFieldLabelClassMb3,
  formRadioOptionLabelClass,
} from "@/components/forms/form-label-styles"
import { FormStepProgress } from "@/components/forms/form-step-progress"
import {
  SignaturePadField,
  type SignaturePadFieldHandle,
} from "@/components/forms/signature-pad-field"
import { cn } from "@/lib/utils"

const RENTFASTER_LISTINGS_URL =
  "https://www.rentfaster.ca/ab/edmonton/rentals/?l=11,53.5249,-113.47&user_ID=2236644"

const EMPLOYMENT_STATUS_VALUES = [
  "full-time",
  "part-time",
  "student",
  "unemployed",
  "retired",
] as const

function isEmploymentStatusChosen(v: string): boolean {
  return (EMPLOYMENT_STATUS_VALUES as readonly string[]).includes(v)
}

function isYesNoAnswer(v: string): boolean {
  return v === "yes" || v === "no"
}

/** Matches form cream/white UI; kills Chrome autofill blue; softer focus than default primary ring. */
const fieldInputClass = cn(
  "min-h-10 w-full rounded-md border border-[#d4c5b0] bg-white px-3 py-2 text-sm text-[#292524]",
  "shadow-none transition-[color,box-shadow,border-color]",
  "placeholder:text-[#78716c]/80",
  "selection:bg-[#8B2332]/15 selection:text-[#1c1917]",
  "focus-visible:border-[#8B2332] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2332]/20",
  "[&:-webkit-autofill]:[-webkit-text-fill-color:#292524]",
  "[&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_rgb(255_255_255)]",
  "[&:-webkit-autofill]:[transition:background-color_9999s_ease-out]",
)

const fieldFileInputClass = cn(
  fieldInputClass,
  "py-1.5 text-[#57534e] file:mr-3 file:cursor-pointer file:rounded-md file:border file:border-[#d4c5b0] file:bg-[#faf8f5] file:px-3 file:py-1.5 file:text-xs file:font-normal file:text-[#44403c] file:shadow-none hover:file:bg-[#ede8de]",
)

const fieldTextareaClass = cn(
  "min-h-[5.25rem] w-full rounded-md border border-[#d4c5b0] bg-white px-3 py-2 text-sm text-[#292524]",
  "shadow-none transition-[color,box-shadow,border-color]",
  "placeholder:text-[#78716c]/80",
  "selection:bg-[#8B2332]/15 selection:text-[#1c1917]",
  "focus-visible:border-[#8B2332] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2332]/20",
  "[&:-webkit-autofill]:[-webkit-text-fill-color:#292524]",
  "[&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_rgb(255_255_255)]",
)

export type RentalApplicationFormProps = {
  onSuccess?: () => void
  className?: string
}

const stepTitles = [
  "Property & your information",
  "Co-applicant, tenancy & employment",
  "Credit, additional details & agreement",
]

function RentalInput({ autoComplete, ...props }: ComponentProps<typeof UiInput>) {
  return <UiInput {...props} autoComplete={autoComplete ?? "off"} />
}

function RentalTextarea({ autoComplete, ...props }: ComponentProps<typeof UiTextarea>) {
  return <UiTextarea {...props} autoComplete={autoComplete ?? "off"} />
}

type RentalPhoneInputProps = Omit<
  ComponentProps<typeof RentalInput>,
  "type" | "inputMode" | "maxLength" | "minLength" | "onChange" | "pattern" | "title"
> & {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

/** Numbers only, max 10 digits (North American style). Optional fields must be empty or exactly 10 digits. */
function RentalPhoneInput({ required, onChange, ...props }: RentalPhoneInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const el = e.target
    const digits = el.value.replace(/\D/g, "").slice(0, 10)
    if (el.value !== digits) {
      el.value = digits
    }
    onChange?.(e)
  }
  return (
    <RentalInput
      {...props}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      maxLength={10}
      minLength={required ? 10 : undefined}
      pattern={required ? "[0-9]{10}" : "([0-9]{10})?"}
      title="Exactly 10 digits, numbers only"
      required={required}
      onChange={handleChange}
    />
  )
}

export function RentalApplicationForm({ onSuccess, className }: RentalApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitFieldIssues, setSubmitFieldIssues] = useState<string[]>([])
  const submitFeedbackRef = useRef<HTMLDivElement>(null)
  const [employmentStatus, setEmploymentStatus] = useState("")
  const [bankruptcyAnswer, setBankruptcyAnswer] = useState("")
  const [evictedAnswer, setEvictedAnswer] = useState("")
  const [lateRentAnswer, setLateRentAnswer] = useState("")
  const [refusedRentAnswer, setRefusedRentAnswer] = useState("")
  const [bringPetsAnswer, setBringPetsAnswer] = useState("")
  const [smokeAnswer, setSmokeAnswer] = useState("")
  const [jointCreditAnswer, setJointCreditAnswer] = useState("")
  const [tenantInsuranceAnswer, setTenantInsuranceAnswer] = useState("")
  const [step, setStep] = useState(0)
  const step0Ref = useRef<HTMLDivElement>(null)
  const step1Ref = useRef<HTMLDivElement>(null)
  const step2Ref = useRef<HTMLDivElement>(null)
  const applicantSigRef = useRef<SignaturePadFieldHandle>(null)
  const coApplicantSigRef = useRef<SignaturePadFieldHandle>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const skipScrollOnMount = useRef(true)

  /** Modal/dialog uses an inner overflow-y-auto wrapper; window.scrollTo does not reset it. */
  function scrollWizardShellToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    const form = formRef.current
    if (!form) return
    let el: HTMLElement | null = form.parentElement
    while (el && el !== document.documentElement) {
      const { overflowY } = getComputedStyle(el)
      const yScroll =
        overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay"
      if (yScroll && el.scrollHeight > el.clientHeight) {
        el.scrollTop = 0
        return
      }
      el = el.parentElement
    }
  }

  useEffect(() => {
    if (skipScrollOnMount.current) {
      skipScrollOnMount.current = false
      return
    }
    const id = requestAnimationFrame(() => {
      scrollWizardShellToTop()
    })
    return () => cancelAnimationFrame(id)
  }, [step])

  const scrollRentalFeedbackIntoView = () => {
    requestAnimationFrame(() => {
      submitFeedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    })
  }

  const goNext = () => {
    setSubmitError(null)
    setSubmitFieldIssues([])
    const root = step === 0 ? step0Ref.current : step1Ref.current
    if (!stepFieldsAreValid(root)) {
      const labels = collectInvalidRequiredFieldLabels(root)
      setSubmitFieldIssues(
        labels.length > 0
          ? labels
          : ["Fill in every required field on this section before continuing."],
      )
      validateStepNativeFields(root)
      scrollRentalFeedbackIntoView()
      return
    }
    if (step === 0 && !validateRadixCheckboxChecked(step0Ref.current, "rental-app-privacy-accept")) {
      setSubmitFieldIssues([
        "Terms & Conditions — check the box: “I have read and accept the terms above”.",
      ])
      scrollRentalFeedbackIntoView()
      return
    }
    if (step === 1 && !isEmploymentStatusChosen(employmentStatus)) {
      setSubmitFieldIssues([
        "Employment — choose your status (Full-Time, Part-Time, Student, Unemployed, or Retired).",
      ])
      scrollRentalFeedbackIntoView()
      return
    }
    setStep((s) => Math.min(s + 1, 2))
  }

  const goBack = () => {
    setSubmitError(null)
    setSubmitFieldIssues([])
    setStep((s) => Math.max(s - 1, 0))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (step < 2) {
      goNext()
      return
    }
    setSubmitError(null)
    setSubmitFieldIssues([])
    const form = e.currentTarget
    // Do not use form.checkValidity(): it also validates inputs inside display:none
    // steps, fails silently (reportValidity targets a hidden field), so Submit appears broken.
    if (!stepFieldsAreValid(step0Ref.current)) {
      setStep(0)
      const labels = collectInvalidRequiredFieldLabels(step0Ref.current)
      setSubmitFieldIssues(
        labels.length > 0
          ? labels
          : ["Section 1 — complete all required fields before submitting."],
      )
      setSubmitError("Section 1 is incomplete.")
      setTimeout(() => validateStepNativeFields(step0Ref.current), 0)
      scrollRentalFeedbackIntoView()
      return
    }
    if (!stepFieldsAreValid(step1Ref.current)) {
      setStep(1)
      const labels = collectInvalidRequiredFieldLabels(step1Ref.current)
      setSubmitFieldIssues(
        labels.length > 0
          ? labels
          : ["Section 2 — complete all required fields before submitting."],
      )
      setSubmitError("Section 2 is incomplete.")
      setTimeout(() => validateStepNativeFields(step1Ref.current), 0)
      scrollRentalFeedbackIntoView()
      return
    }
    if (!isEmploymentStatusChosen(employmentStatus)) {
      setStep(1)
      setSubmitFieldIssues([
        "Employment — choose your status (Full-Time, Part-Time, Student, Unemployed, or Retired).",
      ])
      setSubmitError("Section 2 is incomplete.")
      scrollRentalFeedbackIntoView()
      return
    }
    const section3Unanswered: string[] = []
    if (!isYesNoAnswer(bankruptcyAnswer)) {
      section3Unanswered.push("Have you declared bankruptcy in the past seven (7) years?")
    }
    if (!isYesNoAnswer(evictedAnswer)) {
      section3Unanswered.push("Have you ever been evicted from a rental residence?")
    }
    if (!isYesNoAnswer(lateRentAnswer)) {
      section3Unanswered.push("Have you had two or more late rental payments in the past 12 months?")
    }
    if (!isYesNoAnswer(refusedRentAnswer)) {
      section3Unanswered.push("Have you ever refused to pay rent when due?")
    }
    if (!isYesNoAnswer(bringPetsAnswer)) {
      section3Unanswered.push("Do you wish to bring a pet(s) to the rental premises?")
    }
    if (!isYesNoAnswer(smokeAnswer)) {
      section3Unanswered.push("Do you, or any proposed occupant, smoke?")
    }
    if (!isYesNoAnswer(jointCreditAnswer)) {
      section3Unanswered.push("If you are co-applicants, do you consent to a joint credit report?")
    }
    if (!isYesNoAnswer(tenantInsuranceAnswer)) {
      section3Unanswered.push(
        "Tenant's insurance — below the yellow note, choose Yes or No (I/We presently insure our belongings).",
      )
    }
    if (section3Unanswered.length > 0) {
      setSubmitFieldIssues(section3Unanswered)
      setSubmitError("Section 3 is incomplete.")
      scrollRentalFeedbackIntoView()
      return
    }
    if (!stepFieldsAreValid(step2Ref.current)) {
      const labels = collectInvalidRequiredFieldLabels(step2Ref.current)
      setSubmitFieldIssues(
        labels.length > 0
          ? labels
          : ["Section 3 — complete all required fields on this page."],
      )
      setSubmitError("Section 3 is incomplete.")
      validateStepNativeFields(step2Ref.current)
      scrollRentalFeedbackIntoView()
      return
    }
    if (!validateRadixCheckboxChecked(form, "rental-app-terms")) {
      form.querySelector<HTMLElement>("#rental-app-terms")?.focus()
      setSubmitFieldIssues(["Final agreement — check the box to accept the terms and conditions."])
      setSubmitError(null)
      scrollRentalFeedbackIntoView()
      return
    }
    if (!applicantSigRef.current || applicantSigRef.current.isEmpty()) {
      setSubmitFieldIssues(["Applicant signature — draw your signature in the applicant signature box."])
      setSubmitError(null)
      form.querySelector<HTMLElement>("[data-signature-applicant]")?.focus()
      scrollRentalFeedbackIntoView()
      return
    }
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitFieldIssues([])
    const fd = new FormData(form)
    fd.set("employmentStatus", employmentStatus)
    fd.set("bankruptcyAnswer", bankruptcyAnswer)
    fd.set("evictedAnswer", evictedAnswer)
    fd.set("lateRentAnswer", lateRentAnswer)
    fd.set("refusedRentAnswer", refusedRentAnswer)
    fd.set("bringPetsAnswer", bringPetsAnswer)
    fd.set("smokeAnswer", smokeAnswer)
    fd.set("jointCreditAnswer", jointCreditAnswer)
    fd.set("tenantInsuranceAnswer", tenantInsuranceAnswer)
    const [applicantSigBlob, coSigBlob] = await Promise.all([
      applicantSigRef.current.getPngBlob(),
      coApplicantSigRef.current?.getPngBlob() ?? Promise.resolve(null),
    ])
    if (!applicantSigBlob) {
      setSubmitError("Could not capture applicant signature. Please draw again and submit.")
      setIsSubmitting(false)
      return
    }
    fd.append("signature_applicant", applicantSigBlob, "applicant-signature.png")
    if (coSigBlob) {
      fd.append("signature_co_applicant", coSigBlob, "co-applicant-signature.png")
    }
    try {
      const res = await fetch("/api/rental-application", {
        method: "POST",
        body: fd,
      })
      const data = (await res.json().catch(() => ({}))) as {
        error?: string
        issues?: string[]
      }
      if (!res.ok) {
        setSubmitError(
          typeof data.error === "string"
            ? data.error
            : "Submission failed. Please try again.",
        )
        setSubmitFieldIssues(
          Array.isArray(data.issues) ? data.issues.filter(Boolean) : [],
        )
        setTimeout(() => {
          submitFeedbackRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          })
        }, 0)
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

  /** Section 3: Enter in a text field otherwise triggers full form submit and shows errors for fields below the fold. */
  const suppressAccidentalSubmitOnEnterInSection3 = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter") return
    if (step < 2) return
    const target = e.target
    if (target instanceof HTMLTextAreaElement) return
    if (target instanceof HTMLInputElement) {
      const t = target.type
      if (t === "submit") return
      if (t === "checkbox" || t === "radio") return
      e.preventDefault()
      return
    }
    if (target instanceof HTMLButtonElement) return
    e.preventDefault()
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8 px-2">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-sans text-[#8B2332] mb-2">Thank You!</h2>
        <p className="text-[#333] mb-4 max-w-md mx-auto">
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
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onKeyDown={suppressAccidentalSubmitOnEnterInSection3}
      autoComplete="off"
      className={cn("w-full max-w-none space-y-5", className)}
      noValidate
    >
      {submitError || submitFieldIssues.length > 0 ? (
        <div
          ref={submitFeedbackRef}
          id="rental-submit-feedback"
          className="rounded-md border border-red-200 bg-red-50/95 p-3 text-sm shadow-sm"
          role="alert"
        >
          {submitError ? (
            <p className="font-medium text-red-800">{submitError}</p>
          ) : null}
          {submitFieldIssues.length > 0 ? (
            <div className={submitError ? "mt-2" : ""}>
              <p className="font-medium text-red-800 mb-1.5">
                {submitError
                  ? "Missing or invalid:"
                  : "These required fields are empty or invalid — please fill them:"}
              </p>
              <ul className="list-disc space-y-1 pl-5 text-red-800">
                {submitFieldIssues.map((line, i) => (
                  <li key={`${i}-${line.slice(0, 24)}`}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      <FormStepProgress
        step={step}
        stepTitles={stepTitles}
        stepLabel="Section"
        ariaLabel={`Rental application step ${step + 1} of 3`}
      />

      <div
        ref={step0Ref}
        className={cn(step === 0 ? "space-y-6" : "hidden")}
        aria-hidden={step !== 0}
      >
          {/* Your Personal Information */}
          <section>
            <h2 className="text-xl font-normal text-[#1c1917] mb-4">Your Personal Information</h2>
            
            <div className="mb-4">
              <h3 className="mb-3 text-lg font-normal text-[#1c1917]">Terms & Conditions</h3>
              <div className="overflow-hidden rounded border border-[#d4c5b0] bg-white">
                <div
                  className="max-h-24 overflow-y-auto overscroll-y-contain p-3 text-sm leading-relaxed text-[#555] sm:max-h-32 [&_p+p]:mt-2.5"
                  tabIndex={0}
                  role="region"
                  aria-label="Privacy and application terms — scroll to read full text"
                >
                  <p>MaxWell Excel Realty [The LANDLORD] is committed to safeguarding the personal information entrusted to us by the Applicant. Personal information means any information about an identifiable individual. This can include but is not limited to an individual{"'"}s name, home address and phone number, age, sex, marital or family status, financial information, educational history, or employment status. We manage your personal information in accordance with Alberta{"'"}s Personal Information Protection Act and other applicable laws. This policy applies to the LANDLORD and to any person providing services on our behalf.</p>
                  <p>We collect the personal information for the purposes of assessing the Applicant(s) and co co-Applicant(s) if any as to suitability as a tenant in general, and/or for a specific rental location</p>
                  <p>Your completion of this Application will be taken as your consent to the above use by us, including both the information provided in the Application and personal information obtained by us from other sources as noted in the Application. We will assume the same consent in cases where you volunteer other personal information for an obvious purpose, even though it may not be specifically requested in the Application.</p>
                  <p>You may withdraw consent to the use and disclosure of personal information at any time, unless the personal information is necessary for us to fulfill our legal obligations. We will respect your decision, but may not be able to provide you with rental accommodation if we do not have sufficient personal information.</p>
                  <p className="font-medium">I/We, the undersigned (the {"'"}Applicant{"'"}, and if applicable the {"'"}Co-Applicant{"'"}) hereby apply for approval as a Tenant(s) of the Landlord based on the information provided on this page and the following 2 pages. I/We understand that the information provided will be viewed to determine my/our suitability for the premises described below, and any other premises that the Landlord my deem appropriate.</p>
                </div>
              </div>
              <div className="mt-3 flex items-start gap-2.5">
                <Checkbox id="rental-app-privacy-accept" className="mt-0.5 border-[#d4c5b0]" />
                <label htmlFor="rental-app-privacy-accept" className={cn(formRadioOptionLabelClass, "text-sm leading-snug")}>
                  I have read and accept the terms above <span className="text-red-600">*</span>
                </label>
              </div>
            </div>

            <p className="text-sm text-[#444] mb-4 leading-relaxed">
              Don{"'"}t have a specific unit yet?{" "}
              <a
                href={RENTFASTER_LISTINGS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-normal text-[#8B2332] underline underline-offset-2 hover:no-underline"
              >
                View available properties
              </a>{" "}
              on RentFaster.ca (Edmonton listings).
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={formFieldLabelClass}>
                  Address of Property <span className="text-red-600">*</span>
                </label>
                <RentalInput
                  name="propertyAddress"
                  placeholder="Address of Property"
                  required
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Date Occupancy Desired <span className="text-red-600">*</span>
                </label>
                <RentalInput
                  name="occupancyDate"
                  type="date"
                  required
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={formFieldLabelClass}>
                  Adults <span className="text-red-600">*</span>
                </label>
                <RentalInput
                  name="adults"
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
                <RentalInput
                  name="children"
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
            <h2 className="mb-3 text-xl font-normal text-[#1c1917]">Personal Information</h2>

            <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className={formFieldLabelClass}>
                  Name <span className="text-red-600">*</span>
                </label>
                <RentalInput name="applicantName" placeholder="Name" required className={fieldInputClass} />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Current Address <span className="text-red-600">*</span>
                </label>
                <RentalInput
                  name="applicantAddress"
                  placeholder="Current Address"
                  required
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Email Address <span className="text-red-600">*</span>
                </label>
                <RentalInput
                  name="applicantEmail"
                  type="email"
                  placeholder="Email Address"
                  required
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Phone 1 <span className="text-red-600">*</span>
                </label>
                <RentalPhoneInput
                  name="applicantPhone1"
                  placeholder="10-digit number"
                  required
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>Phone 2</label>
                <RentalPhoneInput name="applicantPhone2" placeholder="Phone 2 (optional)" className={fieldInputClass} />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Date of Birth <span className="text-red-600">*</span>
                </label>
                <RentalInput name="applicantDob" type="date" required className={fieldInputClass} />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Govt Issued Photo ID <span className="text-red-600">*</span>
                </label>
                <RentalInput
                  name="file_applicant_id"
                  type="file"
                  accept="image/*,.pdf"
                  required
                  className={fieldFileInputClass}
                />
              </div>
            </div>
          </section>

      </div>

      <div
        ref={step1Ref}
        className={cn(step === 1 ? "space-y-6" : "hidden")}
        aria-hidden={step !== 1}
      >
          {/* Co-Applicant's Personal Information */}
          <section>
            <h2 className="mb-3 text-xl font-normal text-[#1c1917]">
              Co-Applicant{"'"}s Personal Information (if applicable)
            </h2>

            <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className={formFieldLabelClass}>Name</label>
                <RentalInput name="coApplicantName" placeholder="Name" className={fieldInputClass} />
              </div>
              <div>
                <label className={formFieldLabelClass}>Current Address</label>
                <RentalInput
                  name="coApplicantAddress"
                  placeholder="Current Address"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>Email Address</label>
                <RentalInput
                  name="coApplicantEmail"
                  type="email"
                  placeholder="Email Address"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>Phone 1</label>
                <RentalPhoneInput name="coApplicantPhone1" placeholder="Phone 1 (optional)" className={fieldInputClass} />
              </div>
              <div>
                <label className={formFieldLabelClass}>Phone 2</label>
                <RentalPhoneInput name="coApplicantPhone2" placeholder="Phone 2 (optional)" className={fieldInputClass} />
              </div>
              <div>
                <label className={formFieldLabelClass}>Date of Birth</label>
                <RentalInput name="coApplicantDob" type="date" className={fieldInputClass} />
              </div>
              <div>
                <label className={formFieldLabelClass}>Govt Issued Photo ID</label>
                <RentalInput
                  name="file_co_applicant_id"
                  type="file"
                  accept="image/*,.pdf"
                  className={fieldFileInputClass}
                />
              </div>
            </div>
          </section>

          {/* Co-Applicant's Personal Information who is under 18 */}
          <section>
            <h2 className="text-xl font-normal text-[#1c1917] mb-4">Co-Applicant{"'"}s Personal Information who is under_18</h2>
            
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className={formFieldLabelClass}>Name_1</label>
                <RentalInput name="minorName1" placeholder="Name" className={fieldInputClass} />
              </div>
              <div>
                <label className={formFieldLabelClass}>Name_2</label>
                <RentalInput name="minorName2" placeholder="Name" className={fieldInputClass} />
              </div>
              <div>
                <label className={formFieldLabelClass}>Name_3</label>
                <RentalInput name="minorName3" placeholder="Name" className={fieldInputClass} />
              </div>
              <div>
                <label className={formFieldLabelClass}>Name_4</label>
                <RentalInput name="minorName4" placeholder="Name" className={fieldInputClass} />
              </div>
            </div>
          </section>

          {/* Previous Tenancy */}
          <section>
            <h2 className="text-xl font-normal text-[#1c1917] mb-2">Previous Tenancy</h2>
            <p className="text-sm text-[#666] mb-4 italic">If less than 2 years at current location</p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={formFieldLabelClass}>
                  Landlord{"'"}s Name <span className="text-red-600">*</span>
                </label>
                <RentalInput
                  name="prevLandlordName"
                  placeholder="Landlord's Name"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Landlord{"'"}s Phone <span className="text-red-600">*</span>
                </label>
                <RentalPhoneInput
                  name="prevLandlordPhone"
                  placeholder="10 digits (optional if not applicable)"
                  className={fieldInputClass}
                />
                <p className="text-xs text-[#666] mt-1">Numbers only — exactly 10 digits, or leave blank.</p>
              </div>
            </div>

            <div className="mb-4">
              <label className={formFieldLabelClass}>
                Present Address <span className="text-red-600">*</span>
              </label>
              <RentalInput
                name="prevPresentAddress"
                placeholder="Present Address"
                className={fieldInputClass}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={formFieldLabelClass}>
                  Time at this location <span className="text-red-600">*</span>
                </label>
                <RentalInput
                  name="prevTimeAtLocation"
                  placeholder="Time at this location"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Monthly Rent <span className="text-red-600">*</span>
                </label>
                <RentalInput
                  name="prevMonthlyRent"
                  placeholder="Monthly Rent"
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div>
              <label className={formFieldLabelClass}>
                Reason for Leaving <span className="text-red-600">*</span>
              </label>
              <RentalTextarea
                name="prevReasonLeaving"
                placeholder="Reason for Leaving"
                rows={3}
                className={fieldTextareaClass}
              />
            </div>
          </section>

          {/* Employment Information */}
          <section>
            <h2 className="text-xl font-normal text-[#1c1917] mb-4">Employment Information</h2>
            
            <div className="mb-4">
              <label className={formFieldLabelClassMb3}>
                Status <span className="text-red-600">*</span>
              </label>
              <RadioGroup
                value={employmentStatus || undefined}
                onValueChange={setEmploymentStatus}
                className="flex flex-wrap gap-4"
              >
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

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={formFieldLabelClass}>
                  Current Employer <span className="text-red-600">*</span>
                </label>
                <RentalInput
                  name="employerName"
                  placeholder="Current Employer"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Address <span className="text-red-600">*</span>
                </label>
                <RentalInput
                  name="employerAddress"
                  placeholder="Address"
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={formFieldLabelClass}>
                  Supervisor{"'"}s Name <span className="text-red-600">*</span>
                </label>
                <RentalInput
                  name="supervisorName"
                  placeholder="Supervisor's Name"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Phone <span className="text-red-600">*</span>
                </label>
                <RentalPhoneInput name="employerPhone" placeholder="10-digit number" className={fieldInputClass} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={formFieldLabelClass}>
                  Length of Employment <span className="text-red-600">*</span>
                </label>
                <RentalInput
                  name="lengthEmployment"
                  placeholder="Length of Employment"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Monthly Wage <span className="text-red-600">*</span>
                </label>
                <RentalInput
                  name="monthlyWage"
                  placeholder="Monthly Wage"
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className={formFieldLabelClass}>
                Job Position <span className="text-red-600">*</span>
              </label>
              <RentalInput
                name="jobPosition"
                placeholder="Job Position"
                className={fieldInputClass}
              />
            </div>

            <div className="mb-4">
              <label className={formFieldLabelClass}>
                If you have other sources of income that you would like us to consider, please list income, source and person <span className="text-red-600">*</span>
              </label>
              <RentalTextarea
                name="otherIncomeSources"
                placeholder="If you have other sources of income that you would like us to consider, please list income, source and person"
                rows={3}
                className={fieldTextareaClass}
              />
            </div>

            <div className="space-y-3">
              <div>
                <label className={formFieldLabelClass}>
                  Upload Pictures <span className="text-red-600">*</span>
                </label>
                <RentalInput
                  name="file_employment_1"
                  type="file"
                  accept="image/*,.pdf"
                  required
                  className={fieldFileInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Upload Pictures <span className="text-red-600">*</span>
                </label>
                <RentalInput
                  name="file_employment_2"
                  type="file"
                  accept="image/*,.pdf"
                  required
                  className={fieldFileInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Upload Pictures
                </label>
                <RentalInput
                  name="file_employment_3"
                  type="file"
                  accept="image/*,.pdf"
                  className={fieldFileInputClass}
                />
              </div>
            </div>
          </section>

          {/* Co-Applicant's Employment Information */}
          <section>
            <h2 className="text-xl font-normal text-[#1c1917] mb-4">Co-Applicant{"'"}s Employment Information</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={formFieldLabelClass}>Current Employer</label>
                <RentalInput
                  name="coEmployerName"
                  placeholder="Current Employer"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>Address</label>
                <RentalInput
                  name="coEmployerAddress"
                  placeholder="Address"
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={formFieldLabelClass}>Supervisor{"'"}s Name</label>
                <RentalInput
                  name="coSupervisorName"
                  placeholder="Supervisor's Name"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>Phone</label>
                <RentalPhoneInput name="coEmployerPhone" placeholder="Phone (optional)" className={fieldInputClass} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={formFieldLabelClass}>Length of Employment</label>
                <RentalInput
                  name="coLengthEmployment"
                  placeholder="Length of Employment"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>Monthly Wage</label>
                <RentalInput
                  name="coMonthlyWage"
                  placeholder="Monthly Wage"
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className={formFieldLabelClass}>Job Position</label>
              <RentalInput
                name="coJobPosition"
                placeholder="Job Position"
                className={fieldInputClass}
              />
            </div>

            <div className="space-y-3">
              <div>
                <label className={formFieldLabelClass}>Upload Pictures</label>
                <RentalInput
                  name="file_co_employment_1"
                  type="file"
                  accept="image/*,.pdf"
                  className={fieldFileInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>Upload Pictures</label>
                <RentalInput
                  name="file_co_employment_2"
                  type="file"
                  accept="image/*,.pdf"
                  className={fieldFileInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>Upload Pictures</label>
                <RentalInput
                  name="file_co_employment_3"
                  type="file"
                  accept="image/*,.pdf"
                  className={fieldFileInputClass}
                />
              </div>
            </div>
          </section>

      </div>

      <div
        ref={step2Ref}
        className={cn(step === 2 ? "space-y-6" : "hidden")}
        aria-hidden={step !== 2}
      >
          {/* Credit History Description */}
          <section>
            <h2 className="text-xl font-normal text-[#1c1917] mb-4">Credit History Description</h2>
            
            <div className="space-y-3">
              <div>
                <label className={formFieldLabelClassMb3}>
                  Have you declared bankruptcy in the past seven (7) years? <span className="text-red-600">*</span>
                </label>
                <RadioGroup
                  value={bankruptcyAnswer || undefined}
                  onValueChange={setBankruptcyAnswer}
                  className="flex gap-4"
                >
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
                <RadioGroup
                  value={evictedAnswer || undefined}
                  onValueChange={setEvictedAnswer}
                  className="flex gap-4"
                >
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
                <RadioGroup
                  value={lateRentAnswer || undefined}
                  onValueChange={setLateRentAnswer}
                  className="flex gap-4"
                >
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
                <RadioGroup
                  value={refusedRentAnswer || undefined}
                  onValueChange={setRefusedRentAnswer}
                  className="flex gap-4"
                >
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
                <RentalTextarea
                  name="creditYesDetails"
                  placeholder="If you have answered YES to any of the above, please state your reasons and/or circumstances"
                  rows={3}
                  className={fieldTextareaClass}
                />
              </div>

              <div>
                <label className={formFieldLabelClass}>
                  Please upload if you have current credit report
                </label>
                <RentalInput
                  name="file_credit_1"
                  type="file"
                  accept="image/*,.pdf"
                  className={fieldFileInputClass}
                />
              </div>

              <div>
                <label className={formFieldLabelClass}>
                  Please upload if you have current credit report
                </label>
                <RentalInput
                  name="file_credit_2"
                  type="file"
                  accept="image/*,.pdf"
                  className={fieldFileInputClass}
                />
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section>
            <h2 className="text-xl font-normal text-[#1c1917] mb-4">Additional Information</h2>
            
            <div className="space-y-3">
              <div>
                <label className={formFieldLabelClassMb3}>
                  Do you wish to bring a pet(s) to the rental premises? <span className="text-red-600">*</span>
                </label>
                <RadioGroup
                  value={bringPetsAnswer || undefined}
                  onValueChange={setBringPetsAnswer}
                  className="flex gap-4"
                >
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
                <RentalTextarea
                  name="petsDescription"
                  placeholder=""
                  rows={2}
                  className={fieldTextareaClass}
                />
              </div>

              <div>
                <label className={formFieldLabelClassMb3}>
                  Do you, or any proposed occupant, smoke? <span className="text-red-600">*</span>
                </label>
                <RadioGroup
                  value={smokeAnswer || undefined}
                  onValueChange={setSmokeAnswer}
                  className="flex gap-4"
                >
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
                <RadioGroup
                  value={jointCreditAnswer || undefined}
                  onValueChange={setJointCreditAnswer}
                  className="flex gap-4"
                >
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
                <RadioGroup
                  value={tenantInsuranceAnswer || undefined}
                  onValueChange={setTenantInsuranceAnswer}
                  className="flex gap-4"
                >
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
                <RentalTextarea
                  name="additionalComments"
                  placeholder="Additional Comments by Applicants"
                  rows={3}
                  className={fieldTextareaClass}
                />
              </div>
            </div>
          </section>

          {/* Emergency Contact */}
          <section>
            <h2 className="text-xl font-normal text-[#1c1917] mb-4">Emergency Contact</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={formFieldLabelClass}>
                  Name of a person not residing with you <span className="text-red-600">*</span>
                </label>
                <RentalInput
                  name="emergencyContactName"
                  placeholder="Name of a person not residing with you"
                  className={fieldInputClass}
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Address <span className="text-red-600">*</span>
                </label>
                <RentalInput
                  name="emergencyContactAddress"
                  placeholder="Address"
                  className={fieldInputClass}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={formFieldLabelClass}>
                  Phone <span className="text-red-600">*</span>
                </label>
                <RentalPhoneInput name="emergencyContactPhone" placeholder="10-digit number" className={fieldInputClass} />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Relationship <span className="text-red-600">*</span>
                </label>
                <RentalInput
                  name="emergencyContactRelationship"
                  placeholder="Relationship"
                  className={fieldInputClass}
                />
              </div>
            </div>
          </section>

          {/* Terms & Conditions */}
          <section>
            <h2 className="text-xl font-normal text-[#1c1917] mb-4">Terms & Conditions</h2>
            
            <div className="mb-4 overflow-hidden rounded border border-[#d4c5b0] bg-white">
              <div
                className="max-h-24 overflow-y-auto overscroll-y-contain p-3 text-sm leading-relaxed text-[#555] sm:max-h-32 [&_p+p]:mt-2.5"
                tabIndex={0}
                role="region"
                aria-label="Final terms and authorizations — scroll to read full text"
              >
                <p className="text-[#8B2332]">The Applicant and/or Co-Applicant acknowledges that pets, barbeques, waterbeds and aquariums are not permitted without the advance written permission of the Landlord.</p>
                <p className="text-[#8B2332]">If the Landlord permits a pet, an additional Pet Damage Deposit of $100.00 will be paid to the Landlord. The Landlord will hold the Deposit(s) until the Tenancy ends.</p>
                <p>The Applicant(s) do(es) hereby state that the information contained herein is true and correct, and contain no misrepresentations. If misrepresentations are found after a residential tenancy agreement is entered into with the Applicant and/or Co-Applicant, the Landlord shall have the option to terminate the residential tenancy agreement and seek all available remedies.</p>
                <p>The Applicant(s) and/or Co-Applicant authorizes the Landlord to obtain tenant history, credit, personal and employment information from one or more consumer reporting agencies, previous landlords, employers or previous employers and from other sources of such information, to verify the information provided by the Applicant(s) and/or Co-Applicant. The Applicant(s) and/or Co-Applicant authorize(s) the reporting agencies, and any other person, including personnel from any governmental ministry or agency, to disclose relevant information about the Applicant(s) and/or Co-Applicant to the Landlord. If the parties enter into a Residential tenancy agreement, the Applicant(s) and/or Co-Applicant authorize the above information to be used and disclosed for responding to emergencies, ensuring the orderly management of the tenancy and complying with legal requirements.</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <Checkbox id="rental-app-terms" />
              <label htmlFor="rental-app-terms" className={formRadioOptionLabelClass}>
                Agree with terms and conditions <span className="text-red-600">*</span>
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div data-signature-applicant tabIndex={-1}>
                <label className={formFieldLabelClass}>
                  Signature <span className="text-red-600">*</span>
                </label>
                <p className="text-xs text-[#666] mb-1.5">
                  Draw with your mouse, trackpad, or finger — no upload needed.
                </p>
                <SignaturePadField
                  ref={applicantSigRef}
                  active={step === 2}
                  aria-label="Applicant signature — draw here"
                />
              </div>
              <div>
                <label className={formFieldLabelClass}>
                  Co-Applicant{"'"}s Signature
                </label>
                <p className="text-xs text-[#666] mb-1.5">
                  Optional — draw if there is a co-applicant.
                </p>
                <SignaturePadField
                  ref={coApplicantSigRef}
                  active={step === 2}
                  aria-label="Co-applicant signature — draw here"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className={formFieldLabelClass}>
                  Legal Name <span className="text-red-600">*</span>
                </label>
                <RentalInput name="legalName" placeholder="Legal Name" required className={fieldInputClass} />
              </div>
              <div>
                <label className={formFieldLabelClass}>Co-Applicant{"'"}s Legal Name</label>
                <RentalInput
                  name="coLegalName"
                  placeholder="Co-Applicant's Legal Name"
                  className={fieldInputClass}
                />
              </div>
            </div>
          </section>

      </div>

      <div className="space-y-2 border-t border-[#d4c5b0]/50 pt-4">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="outline"
            className="border-[#8B2332] text-[#8B2332] hover:bg-[#8B2332]/10 sm:min-w-[100px]"
            disabled={step === 0}
            onClick={goBack}
          >
            Back
          </Button>
          <div className="flex flex-col items-center gap-1 sm:items-end">
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
                  {isSubmitting ? "Submitting…" : "Submit Application"}
                </Button>
              )}
            </div>
            {isSubmitting && step === 2 ? (
              <p className="max-w-md text-center text-xs text-[#57534e] sm:text-right">
                Creating the PDF and sending your application. Large uploads can take a little while — please keep this
                page open.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  )
}
