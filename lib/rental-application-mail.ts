import nodemailer from "nodemailer"
import type { ShowingsAttachment } from "@/lib/showings-mail"

export function rentalApplicationSmtpConfigured(): boolean {
  return Boolean(
    process.env.RENTAL_APPLICATION_GMAIL_USER?.trim() &&
      process.env.RENTAL_APPLICATION_GMAIL_APP_PASSWORD?.trim(),
  )
}

export function rentalApplicationRecipientConfigured(): boolean {
  const user = process.env.RENTAL_APPLICATION_GMAIL_USER?.trim()
  const to = process.env.RENTAL_APPLICATION_TO_EMAIL?.trim()
  return Boolean(to || user)
}

export async function sendRentalApplicationEmail(opts: {
  subject: string
  text: string
  html?: string
  replyTo: string
  attachments?: ShowingsAttachment[]
}): Promise<void> {
  const user = process.env.RENTAL_APPLICATION_GMAIL_USER!.trim()
  const pass = process.env.RENTAL_APPLICATION_GMAIL_APP_PASSWORD!.trim().replace(/\s+/g, "")
  const to =
    process.env.RENTAL_APPLICATION_TO_EMAIL?.trim().replace(/\s+/g, "") || user
  const fromName =
    process.env.RENTAL_APPLICATION_EMAIL_FROM_NAME?.trim() || "Deva Rentals"

  const transporter = nodemailer.createTransport({
    service: "gmail",
    pool: true,
    maxConnections: 1,
    auth: { user, pass },
  })

  // Structured From so clients get a clear display name (Gmail still shows "me" if to === from).
  await transporter.sendMail({
    from: { name: fromName, address: user },
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
