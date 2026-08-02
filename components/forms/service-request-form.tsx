"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { validateStepNativeFields } from "@/lib/form-wizard"
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
import { ArrowLeft, Camera, CheckCircle, Upload } from "lucide-react"
import {
  formFieldLabelClass as labelClass,
  formRadioOptionLabelClass,
} from "@/components/forms/form-label-styles"
import { FormStepProgress } from "@/components/forms/form-step-progress"
import { SERVICE_REQUEST_CATEGORIES } from "@/lib/service-request-categories"
import { cn } from "@/lib/utils"

function assignFileToInput(input: HTMLInputElement, file: File) {
  const dt = new DataTransfer()
  dt.items.add(file)
  input.files = dt.files
}

function ServiceAttachmentField({ num }: { num: number }) {
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const uploadInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [cameraOpen, setCameraOpen] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    if (videoRef.current) videoRef.current.srcObject = null
  }

  const closeCamera = () => {
    stopCamera()
    setCameraOpen(false)
    setCameraError(null)
  }

  useEffect(() => {
    if (!cameraOpen) return
    let cancelled = false
    ;(async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        })
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play().catch(() => {})
        }
      } catch {
        if (!cancelled) {
          setCameraError("Camera access was blocked or unavailable.")
        }
      }
    })()
    return () => {
      cancelled = true
      stopCamera()
    }
  }, [cameraOpen])

  const onCameraPicked = (input: HTMLInputElement) => {
    const file = input.files?.[0]
    const named = uploadInputRef.current
    if (file && named) {
      assignFileToInput(named, file)
      setFileName(file.name)
    } else {
      setFileName(null)
    }
    input.value = ""
  }

  const onUploadPicked = (input: HTMLInputElement) => {
    setFileName(input.files?.[0]?.name ?? null)
  }

  const openNativeCamera = () => {
    const input = cameraInputRef.current
    if (!input) return
    input.value = ""
    input.click()
  }

  const openTakePic = async () => {
    setCameraError(null)
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    // Phones: system camera via capture attribute is the best UX.
    if (isTouch) {
      openNativeCamera()
      return
    }
    // Desktop / laptop: live webcam preview + capture.
    if (!navigator.mediaDevices?.getUserMedia) {
      openNativeCamera()
      return
    }
    setCameraOpen(true)
  }

  const capturePhoto = () => {
    const video = videoRef.current
    const input = uploadInputRef.current
    if (!video || !input || !video.videoWidth) return
    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.drawImage(video, 0, 0)
    canvas.toBlob(
      (blob) => {
        if (!blob) return
        const file = new File([blob], `camera-photo-${Date.now()}.jpg`, {
          type: "image/jpeg",
        })
        assignFileToInput(input, file)
        if (cameraInputRef.current) cameraInputRef.current.value = ""
        setFileName(file.name)
        closeCamera()
      },
      "image/jpeg",
      0.92,
    )
  }

  return (
    <div>
      {/* Mobile: opens device camera app (no name — file is copied into the named input) */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={(e) => onCameraPicked(e.currentTarget)}
      />
      {/* Named field submitted with the form */}
      <input
        ref={uploadInputRef}
        type="file"
        name={`attachment${num}`}
        accept="image/*,video/*,.pdf,.doc,.docx"
        className="sr-only"
        onChange={(e) => onUploadPicked(e.currentTarget)}
      />
      <div className="flex flex-wrap items-center gap-2 rounded-md border border-[#d4c5b0] bg-white px-2.5 py-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 border-[#8B2332] px-2.5 text-xs text-[#8B2332] hover:bg-[#8B2332]/10"
          onClick={() => void openTakePic()}
        >
          <Camera className="mr-1 h-3.5 w-3.5" aria-hidden />
          Take Pic
        </Button>
        <Button
          type="button"
          size="sm"
          className="h-7 bg-[#8B2332] px-2.5 text-xs text-white hover:bg-[#6d1c28]"
          onClick={() => {
            const input = uploadInputRef.current
            if (!input) return
            input.value = ""
            input.click()
          }}
        >
          <Upload className="mr-1 h-3.5 w-3.5" aria-hidden />
          Upload File
        </Button>
        <span
          className={cn(
            "min-w-0 flex-1 truncate text-sm",
            fileName ? "font-medium text-[#333]" : "text-[#777]",
          )}
        >
          {fileName ?? "No file chosen"}
        </span>
      </div>

      {cameraOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Take a photo"
        >
          <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="border-b border-[#d4c5b0] px-4 py-3">
              <h3 className="text-sm font-semibold text-[#8B2332]">Take a Photo</h3>
            </div>
            <div className="bg-black p-2">
              {cameraError ? (
                <p className="px-2 py-8 text-center text-sm text-white">{cameraError}</p>
              ) : (
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className="mx-auto max-h-[50vh] w-full rounded object-contain"
                />
              )}
            </div>
            <div className="flex flex-wrap justify-end gap-2 px-4 py-3">
              <Button type="button" variant="outline" onClick={closeCamera}>
                Cancel
              </Button>
              {cameraError ? (
                <Button
                  type="button"
                  className="bg-[#8B2332] text-white hover:bg-[#6d1c28]"
                  onClick={() => {
                    closeCamera()
                    openNativeCamera()
                  }}
                >
                  Use Phone Camera
                </Button>
              ) : (
                <Button
                  type="button"
                  className="bg-[#8B2332] text-white hover:bg-[#6d1c28]"
                  onClick={capturePhoto}
                >
                  Capture
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

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
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [authorization, setAuthorization] = useState<"granted" | "not-granted">("granted")
  const [requestCategory, setRequestCategory] = useState("")
  const [step, setStep] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)
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
    setSubmitError(null)
    if (!validateStepNativeFields(step0Ref.current)) return
    setStep(1)
  }

  const goBack = () => setStep(0)

  /** One primary control stays `type="button"` so it never swaps to a native submit under the cursor (mouseup steal). */
  const handlePrimaryAction = () => {
    if (step < 1) {
      goNext()
      return
    }
    formRef.current?.requestSubmit()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    /** Step 1 has no required native inputs (Radix radios), so validation alone cannot block submit on step 0. */
    if (step !== 1) return
    setSubmitError(null)
    if (!validateStepNativeFields(step0Ref.current)) return
    if (!validateStepNativeFields(step1Ref.current)) return

    setIsSubmitting(true)
    try {
      const fd = new FormData(e.currentTarget)
      fd.set("authorization", authorization)
      fd.set("requestCategory", requestCategory)
      const res = await fetch("/api/service-request", { method: "POST", body: fd })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setSubmitError(
          typeof json.error === "string" ? json.error : "Could not send your request. Please try again.",
        )
        return
      }
      setIsSubmitted(true)
      if (onSuccess) {
        setTimeout(onSuccess, 2000)
      }
    } catch {
      setSubmitError("Network error. Check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-sans text-[#8B2332] mb-2">Thank You!</h2>
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
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onKeyDown={(ev) => {
        if (step !== 0 || ev.key !== "Enter" || ev.defaultPrevented) return
        const t = ev.target as HTMLElement
        if (t.tagName === "TEXTAREA") return
        ev.preventDefault()
        goNext()
      }}
      className="space-y-4"
      noValidate
    >
      <FormStepProgress
        step={step}
        stepTitles={stepTitles}
        ariaLabel="Service request form progress"
      />

      <aside
        className="rounded-md border border-[#8B2332]/35 bg-[#8B2332]/[0.07] px-4 py-3 text-sm leading-relaxed text-[#333]"
        role="note"
        aria-label="Emergency maintenance notice"
      >
        <p className="mb-2 font-semibold text-[#8B2332]">Emergency Maintenance</p>
        <p className="mb-2">
          For fire, suspected gas leaks, immediate danger, or a life-threatening emergency, call{" "}
          <a href="tel:911" className="font-semibold text-[#8B2332] underline-offset-2 hover:underline">
            911
          </a>{" "}
          first.
        </p>
        <p className="mb-2">
          For active flooding, no heat during dangerously cold weather, sewage backup, or another
          urgent property emergency, contact the Deva Rentals emergency maintenance number
          immediately:{" "}
          <a
            href="tel:+17809841996"
            className="font-semibold text-[#8B2332] underline-offset-2 hover:underline"
          >
            +1 (780) 984-1996
          </a>
          , then press <span className="font-semibold">3</span>.
        </p>
        <p className="mb-0 font-medium text-[#444]">
          Do not submit urgent emergencies only through this online form.
        </p>
      </aside>

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

        <div className="grid md:grid-cols-2 gap-3">
          <div>
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
            <label className={labelClass}>Request Category</label>
            <Select value={requestCategory} onValueChange={setRequestCategory}>
              <SelectTrigger className="w-full bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_REQUEST_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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

        <div className="space-y-4">
          {[1, 2, 3, 4].map((num) => (
            <ServiceAttachmentField key={num} num={num} />
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
          <RadioGroup
            value={authorization}
            onValueChange={(v) => setAuthorization(v as "granted" | "not-granted")}
            className="space-y-3"
          >
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

      {submitError && (
        <p className="text-sm text-red-600" role="alert">
          {submitError}
        </p>
      )}

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
          <Button
            type="button"
            disabled={isSubmitting}
            className="bg-[#8B2332] hover:bg-[#6d1c28] text-white px-10 py-3 min-w-[120px]"
            onClick={handlePrimaryAction}
          >
            {step < 1 ? "Next" : isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </div>
      </div>
    </form>
  )
}
