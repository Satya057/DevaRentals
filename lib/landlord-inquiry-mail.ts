import nodemailer from "nodemailer"
import type { ShowingsAttachment } from "@/lib/showings-mail"

export function landlordInquirySmtpConfigured(): boolean {
  return Boolean(
    process.env.GMAIL_USER?.trim() && process.env.GMAIL_APP_PASSWORD?.trim(),
  )
}

export function landlordInquiryRecipient(): string {
  const to = process.env.LANDLORD_INQUIRY_TO_EMAIL?.trim()
  const user = process.env.GMAIL_USER?.trim()
  return to || user || ""
}

export async function sendLandlordInquiryEmail(opts: {
  subject: string
  text: string
  replyTo: string
  attachments?: ShowingsAttachment[]
}): Promise<void> {
  const user = process.env.GMAIL_USER!.trim()
  const pass = process.env.GMAIL_APP_PASSWORD!.trim()
  const to = landlordInquiryRecipient()
  const fromName = process.env.EMAIL_FROM_NAME?.trim() || "Deva Rentals"

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
    attachments: opts.attachments?.length
      ? opts.attachments.map((a) => ({
          filename: a.filename,
          content: a.content,
          contentType: a.contentType,
        }))
      : undefined,
  })
}
