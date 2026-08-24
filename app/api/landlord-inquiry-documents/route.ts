import { NextResponse, after } from "next/server"
import { z } from "zod"
import { sendLandlordInquiryEmail, landlordInquirySmtpConfigured } from "@/lib/landlord-inquiry-mail"
import type { ShowingsAttachment } from "@/lib/showings-mail"

export const runtime = "nodejs"

const MAX_FILE_BYTES = 12 * 1024 * 1024
const MAX_TOTAL_BYTES = 22 * 1024 * 1024

const metaSchema = z.object({
  fullName: z.string().trim().min(1),
  email: z.string().trim().email(),
  propertyAddress: z.string().trim().min(1),
})

function safeFilename(name: string): string {
  const base = name.replace(/[/\\]/g, "").trim() || "upload"
  return base.length > 120 ? base.slice(0, 120) : base
}

async function readFileEntry(
  entry: FormDataEntryValue | null,
  label: string,
): Promise<ShowingsAttachment | null> {
  if (!entry || typeof entry === "string" || entry.size <= 0) return null
  if (entry.size > MAX_FILE_BYTES) {
    throw new Error(`${label} exceeds ${MAX_FILE_BYTES / (1024 * 1024)} MB limit.`)
  }
  return {
    filename: safeFilename(entry.name),
    content: Buffer.from(await entry.arrayBuffer()),
    contentType: entry.type || undefined,
  }
}

export async function POST(request: Request) {
  if (!landlordInquirySmtpConfigured()) {
    return NextResponse.json(
      {
        error:
          "Document upload email is not configured (GMAIL_USER + GMAIL_APP_PASSWORD). See .env.example.",
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

  const parsed = metaSchema.safeParse({
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    propertyAddress: String(formData.get("propertyAddress") ?? ""),
  })

  if (!parsed.success) {
    return NextResponse.json({ error: "Missing contact details." }, { status: 400 })
  }

  const { fullName, email, propertyAddress } = parsed.data

  try {
    const titleEntries = formData.getAll("propertyTitle")
    const titleAttachments = (
      await Promise.all(
        titleEntries.map((entry, i) => readFileEntry(entry, `Property title ${i + 1}`)),
      )
    )
      .filter((file): file is ShowingsAttachment => file !== null)
      .map((file, i) => ({
        ...file,
        filename: `Property-Title-${i + 1}-${file.filename}`,
      }))

    if (titleAttachments.length === 0) {
      return NextResponse.json({ error: "Please upload your property title." }, { status: 400 })
    }

    if (titleAttachments.length > 6) {
      return NextResponse.json(
        { error: "Please upload no more than 6 property title files at once." },
        { status: 400 },
      )
    }

    const idEntries = formData.getAll("landlordPhotoIds")
    const idAttachments = (
      await Promise.all(
        idEntries.map((entry, i) => readFileEntry(entry, `Landlord photo ID ${i + 1}`)),
      )
    )
      .filter((file): file is ShowingsAttachment => file !== null)
      .map((file, i) => ({
        ...file,
        filename: `Landlord-Photo-ID-${i + 1}-${file.filename}`,
      }))

    if (idAttachments.length === 0) {
      return NextResponse.json(
        { error: "Please upload photo ID for at least one registered landlord." },
        { status: 400 },
      )
    }

    if (idAttachments.length > 6) {
      return NextResponse.json(
        { error: "Please upload no more than 6 landlord photo IDs at once." },
        { status: 400 },
      )
    }

    const attachments = [...titleAttachments, ...idAttachments]
    let totalBytes = 0
    for (const a of attachments) {
      totalBytes += a.content.length
      if (totalBytes > MAX_TOTAL_BYTES) {
        return NextResponse.json(
          { error: "Total upload size is too large. Try smaller files." },
          { status: 400 },
        )
      }
    }

    const text = [
      "Landlord inquiry — contract documents (website)",
      "",
      `Full Name: ${fullName}`,
      `Email: ${email}`,
      `Property Address: ${propertyAddress}`,
      "",
      "Attachments:",
      ...titleAttachments.map((a, i) => `- Property title ${i + 1}: ${a.filename}`),
      ...idAttachments.map((a, i) => `- Landlord photo ID ${i + 1}: ${a.filename}`),
      "",
      "---",
      "Reply to this email to contact the landlord.",
    ].join("\n")

    const mailPayload = {
      subject: `Landlord Contract Documents — ${fullName}`,
      text,
      replyTo: email,
      attachments,
    }

    after(async () => {
      try {
        await sendLandlordInquiryEmail(mailPayload)
      } catch (err) {
        console.error("[landlord-inquiry-documents] email failed", err)
      }
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not send documents."
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
