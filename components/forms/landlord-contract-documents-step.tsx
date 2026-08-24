"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, FileBadge2, IdCard, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { compressUploadFiles } from "@/lib/compress-upload-file"

type InquirySummary = {
  fullName: string
  email: string
  propertyAddress: string
}

type Props = {
  inquiry: InquirySummary
  showBackLink?: boolean
  onComplete: () => void
}

const MAX_PROPERTY_TITLE_FILES = 6
const MAX_LANDLORD_ID_FILES = 6

function scrollPanelToTop(anchor: HTMLElement | null) {
  if (!anchor) return

  window.scrollTo({ top: 0, left: 0, behavior: "auto" })

  let el: HTMLElement | null = anchor.parentElement
  while (el && el !== document.documentElement) {
    const { overflowY } = getComputedStyle(el)
    const scrollable =
      overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay"
    if (scrollable && el.scrollHeight > el.clientHeight) {
      el.scrollTop = 0
    }
    el = el.parentElement
  }

  anchor.scrollIntoView({ block: "start", behavior: "auto" })
}

function fileKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`
}

function mergeFiles(existing: File[], incoming: FileList | null, max: number): File[] {
  if (!incoming?.length) return existing
  if (max === 1) return [incoming[0]]
  const map = new Map(existing.map((f) => [fileKey(f), f]))
  for (const file of Array.from(incoming)) {
    if (map.size >= max) break
    map.set(fileKey(file), file)
  }
  return Array.from(map.values())
}

function DocumentFilesUpload({
  inputId,
  label,
  hint,
  icon,
  files,
  maxFiles,
  onAdd,
  onRemove,
}: {
  inputId: string
  label: string
  hint: string
  icon: "title" | "id"
  files: File[]
  maxFiles: number
  onAdd: (picked: FileList | null) => void
  onRemove: (index: number) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const singleFile = maxFiles === 1
  const chooseLabel = singleFile
    ? files.length === 0
      ? "Choose file"
      : "Replace file"
    : files.length === 0
      ? "Choose files"
      : "Add more"

  return (
    <div className="rounded-lg border border-[#d4c5b0] bg-white p-3">
      <div className="mb-2 flex items-start gap-2">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8B2332]/10 text-[#8B2332]">
          {icon === "title" ? (
            <FileBadge2 className="h-4 w-4" aria-hidden />
          ) : (
            <IdCard className="h-4 w-4" aria-hidden />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-[#333]">{label}</p>
          <p className="text-xs leading-snug text-[#666]">{hint}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          size="sm"
          className="h-8 bg-[#8B2332] px-3 text-xs text-white hover:bg-[#6d1c28]"
          onClick={() => {
            const input = inputRef.current
            if (!input) return
            input.value = ""
            input.click()
          }}
        >
          <Upload className="mr-1.5 h-3.5 w-3.5" aria-hidden />
          {chooseLabel}
        </Button>
        <span className="text-xs text-[#666]">
          {files.length === 0
            ? "No files chosen"
            : `${files.length} file${files.length === 1 ? "" : "s"} selected`}
        </span>
      </div>

      {files.length > 0 ? (
        <ul className="mt-2 space-y-1">
          {files.map((file, index) => (
            <li
              key={fileKey(file)}
              className="flex items-center justify-between gap-2 rounded border border-[#d4c5b0]/80 bg-[#faf6f0] px-2 py-1 text-xs"
            >
              <span className="min-w-0 truncate font-medium text-[#333]">{file.name}</span>
              <button
                type="button"
                className="shrink-0 text-[#8B2332] hover:underline"
                onClick={() => onRemove(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*,.pdf"
        multiple={!singleFile}
        className="sr-only"
        onChange={(e) => onAdd(e.currentTarget.files)}
      />
    </div>
  )
}

export function LandlordContractDocumentsStep({
  inquiry,
  showBackLink = false,
  onComplete,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<"upload" | "done" | "skipped">("upload")
  const [propertyTitleFiles, setPropertyTitleFiles] = useState<File[]>([])
  const [landlordIds, setLandlordIds] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStage, setSubmitStage] = useState<"idle" | "preparing" | "uploading">("idle")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      scrollPanelToTop(rootRef.current)
    })
    return () => cancelAnimationFrame(id)
  }, [phase])

  const handleSubmit = async () => {
    setError(null)
    if (propertyTitleFiles.length === 0) {
      setError("Please upload at least one property title file.")
      return
    }

    if (propertyTitleFiles.length > MAX_PROPERTY_TITLE_FILES) {
      setError(`Please upload no more than ${MAX_PROPERTY_TITLE_FILES} property title files at once.`)
      return
    }

    if (landlordIds.length === 0) {
      setError("Please upload at least one landlord photo ID.")
      return
    }

    if (landlordIds.length > MAX_LANDLORD_ID_FILES) {
      setError(`Please upload no more than ${MAX_LANDLORD_ID_FILES} landlord photo IDs at once.`)
      return
    }

    setIsSubmitting(true)
    setSubmitStage("preparing")
    try {
      const [compressedTitles, compressedIds] = await Promise.all([
        compressUploadFiles(propertyTitleFiles),
        compressUploadFiles(landlordIds),
      ])

      const fd = new FormData()
      fd.set("fullName", inquiry.fullName)
      fd.set("email", inquiry.email)
      fd.set("propertyAddress", inquiry.propertyAddress)
      for (const file of compressedTitles) {
        fd.append("propertyTitle", file)
      }
      for (const file of compressedIds) {
        fd.append("landlordPhotoIds", file)
      }

      setSubmitStage("uploading")
      const res = await fetch("/api/landlord-inquiry-documents", {
        method: "POST",
        body: fd,
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Could not send documents.")
        return
      }
      setPhase("done")
    } catch {
      setError("Network error. Check your connection and try again.")
    } finally {
      setIsSubmitting(false)
      setSubmitStage("idle")
    }
  }

  if (phase === "skipped") {
    return (
      <div ref={rootRef} className="landlord-form-step-in-from-top py-4 text-center">
        <CheckCircle className="mx-auto mb-4 h-14 w-14 text-green-600" />
        <h2 className="mb-2 font-sans text-2xl text-[#8B2332]">Thank You!</h2>
        <p className="text-[#333]">
          Your inquiry is complete. We will contact you at{" "}
          <span className="font-medium">{inquiry.email}</span>. You can send your property title
          and landlord photo IDs later by email or phone.
        </p>
        {showBackLink ? (
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 text-[#8B2332] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        ) : (
          <Button
            type="button"
            className="mt-8 bg-[#8B2332] px-8 text-white hover:bg-[#6d1c28]"
            onClick={onComplete}
          >
            Close
          </Button>
        )}
      </div>
    )
  }

  if (phase === "done") {
    return (
      <div ref={rootRef} className="landlord-form-step-in-from-top py-4 text-center">
        <CheckCircle className="mx-auto mb-4 h-14 w-14 text-green-600" />
        <h2 className="mb-2 font-sans text-2xl text-[#8B2332]">Thank You!</h2>
        <p className="text-[#333]">
          We have received your property title
          {propertyTitleFiles.length > 1 ? "s" : ""} and landlord photo ID
          {landlordIds.length > 1 ? "s" : ""}. We will send you a contract very soon to sign.
        </p>
        {showBackLink ? (
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 text-[#8B2332] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        ) : (
          <Button
            type="button"
            className="mt-8 bg-[#8B2332] px-8 text-white hover:bg-[#6d1c28]"
            onClick={onComplete}
          >
            Close
          </Button>
        )}
      </div>
    )
  }

  return (
    <div ref={rootRef} className="landlord-form-step-in-from-top py-2">
      <div className="mb-4 text-center">
        <CheckCircle className="mx-auto mb-4 h-14 w-14 text-green-600" />
        <h2 className="mb-2 font-sans text-2xl text-[#8B2332]">Thank You!</h2>
        <p className="text-[#333]">
          Your landlord inquiry has been submitted. We will contact you shortly.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border-2 border-[#8B2332]/25 bg-gradient-to-br from-white via-[#faf6f0] to-[#f5ebe0] p-5 shadow-md sm:p-6">
        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#8B2332]/[0.06]" />
        <div className="pointer-events-none absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-[#c07e4d]/10" />

        <div className="relative">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-[#8B2332] px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
              Optional next step
            </span>
            <span className="text-xs font-medium text-[#8B2332]/80">Contract preparation</span>
          </div>

          <h3 className="mb-2 font-sans text-xl text-[#8B2332]">
            Would you like us to send your management agreement?
          </h3>
          <p className="mb-5 text-sm leading-relaxed text-[#444]">
            If you would like us to prepare your contract, please upload your{" "}
            <span className="font-semibold text-[#8B2332]">property title</span> and a{" "}
            <span className="font-semibold text-[#8B2332]">photo ID for each registered landlord</span>{" "}
            on the title. You can skip this step — we can also collect documents by email or phone.
          </p>

          <div className="space-y-3">
            <DocumentFilesUpload
              inputId="propertyTitle"
              label="Property title"
              hint={`Select multiple files at once, or use Add more to upload one by one (up to ${MAX_PROPERTY_TITLE_FILES} files).`}
              icon="title"
              files={propertyTitleFiles}
              maxFiles={MAX_PROPERTY_TITLE_FILES}
              onAdd={(picked) =>
                setPropertyTitleFiles((prev) =>
                  mergeFiles(prev, picked, MAX_PROPERTY_TITLE_FILES),
                )
              }
              onRemove={(index) =>
                setPropertyTitleFiles((prev) => prev.filter((_, i) => i !== index))
              }
            />

            <DocumentFilesUpload
              inputId="landlordPhotoIds"
              label="Landlord photo IDs"
              hint={`Select multiple files at once, or use Add more to upload one by one (up to ${MAX_LANDLORD_ID_FILES} files).`}
              icon="id"
              files={landlordIds}
              maxFiles={MAX_LANDLORD_ID_FILES}
              onAdd={(picked) =>
                setLandlordIds((prev) => mergeFiles(prev, picked, MAX_LANDLORD_ID_FILES))
              }
              onRemove={(index) =>
                setLandlordIds((prev) => prev.filter((_, i) => i !== index))
              }
            />
          </div>

          {error ? (
            <p className="mt-3 text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              className="text-sm font-medium text-[#666] underline-offset-2 hover:text-[#8B2332] hover:underline"
              disabled={isSubmitting}
              onClick={() => setPhase("skipped")}
            >
              Skip for now — I&apos;ll send documents later
            </button>
            <Button
              type="button"
              disabled={isSubmitting}
              className="bg-[#8B2332] px-8 text-white hover:bg-[#6d1c28]"
              onClick={() => void handleSubmit()}
            >
              {isSubmitting
                ? submitStage === "preparing"
                  ? "Preparing files…"
                  : "Sending…"
                : "Send documents"}
            </Button>
          </div>
        </div>
      </div>

      {showBackLink && (
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#8B2332] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      )}
    </div>
  )
}
