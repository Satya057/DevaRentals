import { NextResponse } from "next/server"
import { z } from "zod"
import {
  formatScheduleViewingEmailBody,
  type ScheduleViewingPayload,
} from "@/lib/schedule-viewing-email"
import { sendShowingsEmail, showingsSmtpConfigured } from "@/lib/showings-mail"

const inquirySchema = z.object({
  fullName: z.string().trim().min(1),
  phone: z.string().trim().min(1),
  email: z.string().trim().email(),
  adults: z.string().trim().min(1),
  kids: z.string().trim().min(1),
  pets: z.string().trim().min(1),
  moveInDate: z.string().trim().min(1),
  leaseTerm: z.string().trim().min(1),
  vehicles: z.string().trim().min(1),
  propertyAddress: z.string().trim().min(1),
})

export async function POST(request: Request) {
  if (!showingsSmtpConfigured()) {
    return NextResponse.json(
      {
        error:
          "Schedule email is not configured (SCHEDULE_GMAIL_USER + SCHEDULE_GMAIL_APP_PASSWORD). See .env.example.",
      },
      { status: 503 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  const parsed = inquirySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form data.", details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const data = parsed.data as ScheduleViewingPayload
  const text = formatScheduleViewingEmailBody(data)
  const subject = `Schedule Viewing Request from ${data.fullName}`

  try {
    await sendShowingsEmail({
      subject,
      text,
      replyTo: data.email,
      recipientKind: "schedule",
    })
  } catch (err) {
    console.error("[schedule-viewing] Gmail SMTP", err)
    return NextResponse.json(
      {
        error:
          "Failed to send email. Check SCHEDULE_GMAIL_* App Password and account settings.",
      },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
