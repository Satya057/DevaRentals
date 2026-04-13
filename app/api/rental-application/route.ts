import { NextResponse } from "next/server"
import { z } from "zod"
import { formatRentalApplicationEmailHtml } from "@/lib/rental-application-email-html"
import {
  formatRentalApplicationEmailBody,
  type RentalApplicationFormStrings,
} from "@/lib/rental-application-email"
import { buildRentalApplicationPdf } from "@/lib/rental-application-pdf"
import {
  RENTAL_FILE_KEY_TO_SLOT,
  type RentalPdfEmbedPage,
} from "@/lib/rental-pdf-attachments"
import { rentalApplicationIssuesFromZodFlat } from "@/lib/rental-application-field-labels"
import {
  recipientForScheduleOrRental,
  sendShowingsEmail,
  showingsSmtpConfigured,
  type ShowingsAttachment,
} from "@/lib/showings-mail"

export const maxDuration = 60
export const runtime = "nodejs"

const str = z.string().optional().default("")
const req = z.string().trim().min(1)
const TEN_DIGITS = /^\d{10}$/
const reqPhone10 = z
  .string()
  .trim()
  .regex(TEN_DIGITS, "Must be exactly 10 digits (numbers only)")
const optPhone10 = z
  .string()
  .trim()
  .refine((s) => s.length === 0 || TEN_DIGITS.test(s), {
    message: "Phone must be exactly 10 digits (numbers only), or leave blank",
  })

const textSchema = z.object({
  propertyAddress: req,
  occupancyDate: req,
  adults: req,
  children: req,
  applicantName: req,
  applicantAddress: req,
  applicantEmail: z.string().trim().email(),
  applicantPhone1: reqPhone10,
  applicantPhone2: optPhone10,
  applicantDob: req,
  coApplicantName: str,
  coApplicantAddress: str,
  coApplicantEmail: str,
  coApplicantPhone1: optPhone10,
  coApplicantPhone2: optPhone10,
  coApplicantDob: str,
  minorName1: str,
  minorName2: str,
  minorName3: str,
  minorName4: str,
  prevLandlordName: str,
  prevLandlordPhone: optPhone10,
  prevPresentAddress: str,
  prevTimeAtLocation: str,
  prevMonthlyRent: str,
  prevReasonLeaving: str,
  employmentStatus: str,
  employerName: str,
  employerAddress: str,
  supervisorName: str,
  employerPhone: optPhone10,
  lengthEmployment: str,
  monthlyWage: str,
  jobPosition: str,
  otherIncomeSources: str,
  coEmployerName: str,
  coEmployerAddress: str,
  coSupervisorName: str,
  coEmployerPhone: optPhone10,
  coLengthEmployment: str,
  coMonthlyWage: str,
  coJobPosition: str,
  bankruptcyAnswer: str,
  evictedAnswer: str,
  lateRentAnswer: str,
  refusedRentAnswer: str,
  creditYesDetails: str,
  bringPetsAnswer: str,
  petsDescription: str,
  smokeAnswer: str,
  jointCreditAnswer: str,
  tenantInsuranceAnswer: str,
  additionalComments: str,
  emergencyContactName: str,
  emergencyContactAddress: str,
  emergencyContactPhone: optPhone10,
  emergencyContactRelationship: str,
  legalName: req,
  coLegalName: str,
})

const FILE_FIELDS = [
  { key: "file_applicant_id", label: "Applicant Govt Issued Photo ID" },
  { key: "file_co_applicant_id", label: "Co-Applicant Govt Issued Photo ID" },
  { key: "file_employment_1", label: "Employment upload 1" },
  { key: "file_employment_2", label: "Employment upload 2" },
  { key: "file_employment_3", label: "Employment upload 3" },
  { key: "file_co_employment_1", label: "Co-applicant employment upload 1" },
  { key: "file_co_employment_2", label: "Co-applicant employment upload 2" },
  { key: "file_co_employment_3", label: "Co-applicant employment upload 3" },
  { key: "file_credit_1", label: "Credit report / screenshot 1" },
  { key: "file_credit_2", label: "Credit report / screenshot 2" },
  { key: "signature_applicant", label: "Applicant signature (drawn)" },
  { key: "signature_co_applicant", label: "Co-applicant signature (drawn)" },
] as const

const MAX_FILE_BYTES = 22 * 1024 * 1024
const MAX_TOTAL_ATTACH_BYTES = 24 * 1024 * 1024

function formDataToTextRecord(fd: FormData): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [key, value] of fd.entries()) {
    if (typeof value === "string") {
      out[key] = value
    }
  }
  return out
}

export async function POST(request: Request) {
  if (!showingsSmtpConfigured()) {
    return NextResponse.json(
      {
        error:
          "Rental application email is not configured (SCHEDULE_GMAIL_USER + SCHEDULE_GMAIL_APP_PASSWORD).",
      },
      { status: 503 },
    )
  }

  if (!recipientForScheduleOrRental("rental")) {
    return NextResponse.json(
      { error: "Recipient inbox is not configured." },
      { status: 503 },
    )
  }

  let fd: FormData
  try {
    fd = await request.formData()
  } catch {
    return NextResponse.json(
      { error: "Invalid form data (body too large or malformed)." },
      { status: 400 },
    )
  }

  const raw = formDataToTextRecord(fd)
  const parsed = textSchema.safeParse(raw)
  if (!parsed.success) {
    const flat = parsed.error.flatten()
    const issues = rentalApplicationIssuesFromZodFlat(flat.fieldErrors)
    for (const msg of flat.formErrors) {
      if (msg) issues.push(msg)
    }
    const error =
      issues.length > 0
        ? "Some fields are missing or invalid. See the list below."
        : "Invalid or incomplete application data."
    return NextResponse.json({ error, issues }, { status: 400 })
  }

  const t = parsed.data as RentalApplicationFormStrings
  const attachments: ShowingsAttachment[] = []
  const attachmentLines: string[] = []
  const embedPages: RentalPdfEmbedPage[] = []
  const slotFilled = new Set<number>()
  let totalBytes = 0
  let applicantSigPng: Buffer | undefined
  let coApplicantSigPng: Buffer | undefined

  for (const { key, label } of FILE_FIELDS) {
    const entry = fd.get(key)
    if (!entry || typeof entry === "string") continue
    if (entry.size <= 0) continue
    if (entry.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: `File too large: ${entry.name}. Max ${MAX_FILE_BYTES / 1024 / 1024} MB per file.` },
        { status: 400 },
      )
    }
    totalBytes += entry.size
    if (totalBytes > MAX_TOTAL_ATTACH_BYTES) {
      return NextResponse.json(
        { error: "Total attachment size too large for email. Please use smaller files." },
        { status: 400 },
      )
    }
    const buf = Buffer.from(await entry.arrayBuffer())
    if (key === "signature_applicant") applicantSigPng = buf
    if (key === "signature_co_applicant") coApplicantSigPng = buf
    const mime = entry.type || undefined
    const safeName = entry.name.replace(/[\r\n]/g, "_").slice(0, 180) || `${key}.bin`
    const slot = RENTAL_FILE_KEY_TO_SLOT[key]
    if (slot !== undefined) {
      slotFilled.add(slot)
      embedPages.push({
        slot,
        filename: safeName,
        buffer: buf,
        contentType: mime || "application/octet-stream",
      })
    }
    attachments.push({
      filename: safeName,
      content: buf,
      contentType: mime,
    })
    if (slot !== undefined) {
      attachmentLines.push(`• Attachment ${slot} (${label}): ${safeName}`)
    } else {
      attachmentLines.push(`• ${label}: ${safeName}`)
    }
  }

  let pdfBuffer: Buffer
  try {
    pdfBuffer = await buildRentalApplicationPdf({
      t,
      slotPresent: (n) => slotFilled.has(n),
      embedPages,
      applicantSignaturePng: applicantSigPng,
      coApplicantSignaturePng: coApplicantSigPng,
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error("[rental-application] pdf", msg, e)
    return NextResponse.json(
      { error: "Could not build application PDF. Try again or contact the office." },
      { status: 500 },
    )
  }

  if (totalBytes + pdfBuffer.length > MAX_TOTAL_ATTACH_BYTES) {
    return NextResponse.json(
      {
        error:
          "Total size (files + PDF) is too large for email. Please use smaller images or fewer uploads.",
      },
      { status: 400 },
    )
  }

  const withPdf: ShowingsAttachment[] = [
    {
      filename: "Rental-Application.pdf",
      content: pdfBuffer,
      contentType: "application/pdf",
    },
    ...attachments,
  ]

  const text = formatRentalApplicationEmailBody(t, attachmentLines)
  const html = formatRentalApplicationEmailHtml(t, attachmentLines)
  const subject = `Rental Application Form from ${t.applicantName}`

  try {
    await sendShowingsEmail({
      subject,
      text,
      html,
      replyTo: t.applicantEmail,
      recipientKind: "rental",
      attachments: withPdf,
    })
  } catch (err) {
    console.error("[rental-application]", err)
    return NextResponse.json(
      { error: "Failed to send email. Try again or contact the office." },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
