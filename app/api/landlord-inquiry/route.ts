import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { Resend } from "resend"
import { z } from "zod"
import {
  formatLandlordInquiryEmailBody,
  type LandlordInquiryPayload,
} from "@/lib/landlord-inquiry-email"

const optional = z.string().trim().optional().default("")
const emailOrEmpty = z.union([z.literal(""), z.string().trim().email()])

const inquirySchema = z.object({
  fullName: z.string().trim().min(1),
  secondOwnerName: optional,
  phone: z.string().trim().min(1),
  secondOwnerPhone: optional,
  email: z.string().trim().email(),
  secondOwnerEmail: emailOrEmpty.optional().default(""),
  propertyAddress: z.string().trim().min(1),
  secondPropertyAddress: optional,
  propertyType: z.string().trim().min(1),
  availableDate: z.string().trim().min(1),
  rentExpectation: z.string().trim().min(1),
  squareFootage: z.string().trim().min(1),
  buildYear: z.string().trim().min(1),
  bedrooms: z.string().trim().min(1),
  bedroomsOther: optional,
  bathrooms: z.string().trim().min(1),
  bathroomsOther: optional,
  furnishing: z.string().trim().min(1),
  backyard: z.string().trim().min(1),
  preferredLeaseTerm: z.string().trim().min(1),
  contractTerm: z.string().trim().min(1),
  petsAllowed: z.string().trim().min(1),
  petRestrictions: z.string().trim().min(1),
  parking: z.string().trim().min(1),
  comments: optional,
  tourDate: z.string().trim().min(1),
  hearAboutUs: z.string().trim().min(1),
  hearAboutSpecify: optional,
  friendName: optional,
})

function gmailConfigured(): boolean {
  return Boolean(
    process.env.GMAIL_USER?.trim() && process.env.GMAIL_APP_PASSWORD?.trim(),
  )
}

function resendConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() &&
      process.env.LANDLORD_INQUIRY_TO_EMAIL?.trim(),
  )
}

export async function POST(request: Request) {
  if (!gmailConfigured() && !resendConfigured()) {
    return NextResponse.json(
      {
        error:
          "Email is not configured. Use either Gmail (GMAIL_USER + GMAIL_APP_PASSWORD) or Resend (RESEND_API_KEY + LANDLORD_INQUIRY_TO_EMAIL). See .env.example.",
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

  const data = parsed.data as LandlordInquiryPayload
  const text = formatLandlordInquiryEmailBody(data)
  const subject = `Landlord Inquiry Form from ${data.fullName}`

  if (gmailConfigured()) {
    const user = process.env.GMAIL_USER!.trim()
    const pass = process.env.GMAIL_APP_PASSWORD!.trim()
    const to =
      process.env.LANDLORD_INQUIRY_TO_EMAIL?.trim() || user
    const fromName = process.env.EMAIL_FROM_NAME?.trim() || "Deva Rentals"

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user, pass },
      })
      await transporter.sendMail({
        from: `"${fromName}" <${user}>`,
        to,
        replyTo: data.email,
        subject,
        text,
      })
    } catch (err) {
      console.error("[landlord-inquiry] Gmail SMTP", err)
      return NextResponse.json(
        { error: "Failed to send email. Check Gmail App Password and account settings." },
        { status: 502 },
      )
    }
    return NextResponse.json({ ok: true })
  }

  const to = process.env.LANDLORD_INQUIRY_TO_EMAIL!.trim()
  const from =
    process.env.EMAIL_FROM?.trim() ||
    "Deva Rentals <onboarding@resend.dev>"

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject,
    text,
  })

  if (error) {
    console.error("[landlord-inquiry] Resend", error)
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
