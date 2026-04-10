import nodemailer from "nodemailer"
import type { ShowingsAttachment } from "@/lib/showings-mail"

export function serviceRequestSmtpConfigured(): boolean {
  return Boolean(
    process.env.SERVICE_REQUEST_GMAIL_USER?.trim() &&
      process.env.SERVICE_REQUEST_GMAIL_APP_PASSWORD?.trim(),
  )
}

export async function sendServiceRequestEmail(opts: {
  subject: string
  text: string
  html?: string
  replyTo: string
  attachments?: ShowingsAttachment[]
}): Promise<void> {
  const user = process.env.SERVICE_REQUEST_GMAIL_USER!.trim()
  const pass = process.env.SERVICE_REQUEST_GMAIL_APP_PASSWORD!.trim().replace(/\s+/g, "")
  const to =
    process.env.SERVICE_REQUEST_TO_EMAIL?.trim().replace(/\s+/g, "") || user
  const fromName =
    process.env.SERVICE_REQUEST_EMAIL_FROM_NAME?.trim() || "Deva Rentals"

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  })

  await transporter.sendMail({
    from: `"${fromName}" <${user}>`,
    to,
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
    ...(opts.html ? { html: opts.html } : {}),
    attachments: opts.attachments?.length
      ? opts.attachments.map((a) => ({
          filename: a.filename,
          content: a.content,
          contentType: a.contentType,
        }))
      : undefined,
  })
}
