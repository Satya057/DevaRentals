import { NextResponse } from "next/server"
import { z } from "zod"
import {
  formatServiceRequestEmailBody,
  formatServiceRequestEmailHtml,
  type ServiceRequestPayload,
} from "@/lib/service-request-email"
import { sendServiceRequestEmail, serviceRequestSmtpConfigured } from "@/lib/service-request-mail"
import type { ShowingsAttachment } from "@/lib/showings-mail"

export const runtime = "nodejs"

const MAX_FILE_BYTES = 12 * 1024 * 1024
const MAX_TOTAL_ATTACH_BYTES = 22 * 1024 * 1024

const payloadSchema = z.object({
  tenantName: z.string().trim().min(1),
  email: z.string().trim().email(),
  cell: z.string().trim().min(1),
  address: z.string().trim().min(1),
  city: z.string().trim().min(1),
  description: z.string().trim().min(1),
  authorization: z.enum(["granted", "not-granted"]),
})

function safeFilename(name: string): string {
  const base = name.replace(/[/\\]/g, "").trim() || "upload"
  return base.length > 120 ? base.slice(0, 120) : base
}

export async function POST(request: Request) {
  if (!serviceRequestSmtpConfigured()) {
    return NextResponse.json(
      {
        error:
          "Service request email is not configured (SERVICE_REQUEST_GMAIL_USER + SERVICE_REQUEST_GMAIL_APP_PASSWORD). See .env.example.",
      },
      { status: 503 },
    )
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 })
  }

  const raw = {
    tenantName: String(formData.get("tenantName") ?? ""),
    email: String(formData.get("email") ?? ""),
    cell: String(formData.get("cell") ?? ""),
    address: String(formData.get("address") ?? ""),
    city: String(formData.get("city") ?? ""),
    description: String(formData.get("description") ?? ""),
    authorization: String(formData.get("authorization") ?? "").trim(),
  }

  const parsed = payloadSchema.safeParse(raw)

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form data.", details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const data = parsed.data as ServiceRequestPayload
  const attachments: ShowingsAttachment[] = []
  let totalBytes = 0

  for (let i = 1; i <= 6; i++) {
    const entry = formData.get(`attachment${i}`)
    if (!entry || typeof entry === "string") continue
    if (entry.size <= 0) continue
    if (entry.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: `Attachment ${i} exceeds ${MAX_FILE_BYTES / (1024 * 1024)} MB limit.` },
        { status: 400 },
      )
    }
    totalBytes += entry.size
    if (totalBytes > MAX_TOTAL_ATTACH_BYTES) {
      return NextResponse.json(
        { error: "Total upload size is too large. Try fewer or smaller files." },
        { status: 400 },
      )
    }
    const buf = Buffer.from(await entry.arrayBuffer())
    attachments.push({
      filename: safeFilename(entry.name),
      content: buf,
      contentType: entry.type || undefined,
    })
  }

  const subject = `Service Request from ${data.tenantName}`
  const text = formatServiceRequestEmailBody(data)
  const html = formatServiceRequestEmailHtml(data)

  try {
    await sendServiceRequestEmail({
      subject,
      text,
      html,
      replyTo: data.email,
      attachments: attachments.length ? attachments : undefined,
    })
  } catch (err) {
    console.error("[service-request] Gmail SMTP", err)
    return NextResponse.json(
      {
        error:
          "Failed to send email. Check SERVICE_REQUEST_GMAIL_* App Password and account settings.",
      },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
