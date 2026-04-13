import nodemailer from "nodemailer"

let showingsTransport: nodemailer.Transporter | null = null

function getShowingsTransport(): nodemailer.Transporter {
  if (!showingsTransport) {
    const user = process.env.SCHEDULE_GMAIL_USER!.trim()
    const pass = process.env.SCHEDULE_GMAIL_APP_PASSWORD!.trim()
    showingsTransport = nodemailer.createTransport({
      service: "gmail",
      pool: true,
      maxConnections: 1,
      auth: { user, pass },
    })
  }
  return showingsTransport
}

export type ShowingsAttachment = {
  filename: string
  content: Buffer
  contentType?: string
}

export function showingsSmtpConfigured(): boolean {
  return Boolean(
    process.env.SCHEDULE_GMAIL_USER?.trim() &&
      process.env.SCHEDULE_GMAIL_APP_PASSWORD?.trim(),
  )
}

/** Schedule viewing + rental applications (same inbox by default). */
export function recipientForScheduleOrRental(kind: "schedule" | "rental"): string {
  if (kind === "rental") {
    const only = process.env.RENTAL_APPLICATION_TO_EMAIL?.trim()
    if (only) return only
  }
  const to = process.env.SCHEDULE_VIEWING_TO_EMAIL?.trim()
  const user = process.env.SCHEDULE_GMAIL_USER?.trim()
  return to || user || ""
}

export async function sendShowingsEmail(opts: {
  subject: string
  text: string
  /** Optional HTML body (e.g. rental application summary). */
  html?: string
  replyTo: string
  /** Overrides recipientKind / default inbox */
  to?: string
  recipientKind?: "schedule" | "rental"
  attachments?: ShowingsAttachment[]
}): Promise<void> {
  const user = process.env.SCHEDULE_GMAIL_USER!.trim()
  const to =
    opts.to?.trim() ||
    recipientForScheduleOrRental(opts.recipientKind ?? "schedule")
  const fromName =
    process.env.SCHEDULE_EMAIL_FROM_NAME?.trim() || "Deva Rentals"

  const transporter = getShowingsTransport()

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
