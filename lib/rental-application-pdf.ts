/// <reference types="pdfkit" />
import { existsSync, readFileSync } from "fs"
import path from "path"
import type { RentalApplicationFormStrings } from "@/lib/rental-application-email"
import {
  RENTAL_FINAL_TERMS_PARAGRAPHS,
  RENTAL_PRIVACY_TERMS_PARAGRAPHS,
} from "@/lib/rental-application-legal-text"
import type { RentalPdfEmbedPage } from "@/lib/rental-pdf-attachments"
import { isRasterImageMime } from "@/lib/rental-pdf-attachments"

type PdfDoc = PDFKit.PDFDocument

const MAROON = "#8B2332"
const MARGIN = 48
const PAGE_W = 612
const PAGE_H = 792
const CONTENT_W = PAGE_W - MARGIN * 2
const COL_GAP = 14
const COL_W = (CONTENT_W - COL_GAP) / 2
const LEFT_X = MARGIN
const RIGHT_X = MARGIN + COL_W + COL_GAP

function yn(v: string): string {
  if (v === "yes") return "Yes"
  if (v === "no") return "No"
  return v || "—"
}

function employmentLabel(v: string): string {
  const m: Record<string, string> = {
    "full-time": "Full-Time",
    "part-time": "Part-Time",
    student: "Student",
    unemployed: "Unemployed",
    retired: "Retired",
  }
  return m[v] ?? (v || "—")
}

function val(s: string): string {
  const t = s?.trim()
  return t ? t : "—"
}

function readOptionalPublicFile(rel: string): Buffer | undefined {
  const p = path.join(process.cwd(), "public", rel)
  if (!existsSync(p)) return undefined
  try {
    return readFileSync(p)
  } catch {
    return undefined
  }
}

function attRef(slotPresent: (n: number) => boolean, n: number): string {
  return slotPresent(n) ? `Attachment ${n}` : "—"
}

/** Start a new page if the block of height `h` does not fit below `doc.y` (avoids huge blank gaps). */
function ensureSpace(doc: PdfDoc, h: number) {
  doc.x = LEFT_X
  const pad = 8
  const limit = doc.page.maxY() - pad
  if (doc.y + h > limit) {
    doc.addPage()
    doc.x = LEFT_X
    doc.y = MARGIN
  }
}

/** Draw paired fields; advances doc.y. Heights are measured before drawing so PDFKit never splits one row across pages in a way that corrupts doc.y. */
function rowPair(
  doc: PdfDoc,
  leftLabel: string,
  leftVal: string,
  rightLabel: string,
  rightVal: string,
) {
  const lv = val(leftVal)
  const rv = val(rightVal)

  doc.font("Helvetica-Bold").fontSize(8)
  const lh1 = Math.max(doc.heightOfString(leftLabel, { width: COL_W }), 10)
  doc.font("Helvetica").fontSize(9)
  const lh2 = Math.max(doc.heightOfString(lv, { width: COL_W }), 12)
  const leftH = lh1 + 2 + lh2

  doc.font("Helvetica-Bold").fontSize(8)
  const rh1 = Math.max(doc.heightOfString(rightLabel, { width: COL_W }), 10)
  doc.font("Helvetica").fontSize(9)
  const rh2 = Math.max(doc.heightOfString(rv, { width: COL_W }), 12)
  const rightH = rh1 + 2 + rh2

  const rowH = Math.max(leftH, rightH) + 10
  ensureSpace(doc, rowH)
  const startY = doc.y

  doc.font("Helvetica-Bold").fontSize(8).text(leftLabel, LEFT_X, startY, { width: COL_W })
  doc.font("Helvetica").fontSize(9).text(lv, LEFT_X, startY + lh1 + 2, { width: COL_W })
  doc.font("Helvetica-Bold").fontSize(8).text(rightLabel, RIGHT_X, startY, { width: COL_W })
  doc.font("Helvetica").fontSize(9).text(rv, RIGHT_X, startY + rh1 + 2, { width: COL_W })

  doc.y = startY + Math.max(leftH, rightH) + 10
  doc.x = LEFT_X
}

function sectionTitle(doc: PdfDoc, title: string) {
  doc.x = LEFT_X
  const gapTop = 8
  const gapBot = 8
  doc.font("Helvetica-Bold").fontSize(11)
  const titleH = Math.max(doc.heightOfString(title, { width: CONTENT_W }), 12)
  ensureSpace(doc, gapTop + titleH + gapBot)
  const startY = doc.y + gapTop
  doc.fillColor("#000000").text(title, LEFT_X, startY, { width: CONTENT_W })
  doc.y = startY + titleH + gapBot
  doc.fillColor("#000000").font("Helvetica").fontSize(9)
  doc.x = LEFT_X
}

function fullWidthLabelValue(doc: PdfDoc, label: string, value: string) {
  doc.x = LEFT_X
  const v = val(value)
  doc.font("Helvetica-Bold").fontSize(8)
  const lh = Math.max(doc.heightOfString(label, { width: CONTENT_W }), 10)
  doc.font("Helvetica").fontSize(9)
  const vh = Math.max(doc.heightOfString(v, { width: CONTENT_W }), 12)
  const blockH = lh + 2 + vh + 8
  ensureSpace(doc, blockH)
  const startY = doc.y
  doc.font("Helvetica-Bold").fontSize(8).text(label, LEFT_X, startY, { width: CONTENT_W })
  doc.font("Helvetica").fontSize(9).text(v, LEFT_X, startY + lh + 2, { width: CONTENT_W })
  doc.y = startY + lh + 2 + vh + 8
  doc.x = LEFT_X
}

/** Logos for the rental PDF header (left: Deva/DV, right: MaxWell). */
const RENTAL_PDF_LOGO_DEVA = "pic/Rental DV Logo.jpeg"
const RENTAL_PDF_LOGO_MAXWELL = "pic/Rental Maxwell logo.jpeg"

function drawHeaderLogos(doc: PdfDoc, startY: number): number {
  const devaBuf =
    readOptionalPublicFile(RENTAL_PDF_LOGO_DEVA) ?? readOptionalPublicFile("rental-deva-logo.png")
  const maxBuf =
    readOptionalPublicFile(RENTAL_PDF_LOGO_MAXWELL) ??
    readOptionalPublicFile("rental-maxwell-logo.png")
  /** Match reference layout: logos clearly visible (~18% page height cap). */
  const boxH = 58
  const halfW = (CONTENT_W - COL_GAP) / 2
  /** Nudge both logos slightly toward center (keeps a small gap between them). */
  const logoInward = 12
  const logoW = halfW - logoInward
  const leftLogoX = LEFT_X + logoInward
  const rightLogoX = RIGHT_X - logoInward

  if (devaBuf) {
    try {
      doc.image(devaBuf, leftLogoX, startY, { fit: [logoW, boxH] })
    } catch {
      drawDevaFallback(doc, leftLogoX, startY, logoW, boxH)
    }
  } else {
    drawDevaFallback(doc, leftLogoX, startY, logoW, boxH)
  }

  if (maxBuf) {
    try {
      doc.image(maxBuf, rightLogoX, startY, { fit: [logoW, boxH] })
    } catch {
      drawMaxwellFallback(doc, rightLogoX, startY, logoW, boxH)
    }
  } else {
    drawMaxwellFallback(doc, rightLogoX, startY, logoW, boxH)
  }

  return startY + boxH + 18
}

function drawDevaFallback(doc: PdfDoc, x: number, y: number, w: number, h: number) {
  doc.save()
  doc.rect(x, y, w, h).fill(MAROON)
  doc.fillColor("#f5e6c8").font("Helvetica-Bold").fontSize(9).text("DEVA RENTALS", x + 6, y + 8, {
    width: w - 12,
  })
  doc.font("Helvetica").fontSize(6).text("PROPERTY MANAGEMENT · EDMONTON", x + 6, y + 22, {
    width: w - 12,
  })
  doc.restore()
  doc.fillColor("#000000")
}

function drawMaxwellFallback(doc: PdfDoc, x: number, y: number, w: number, h: number) {
  doc.rect(x, y, w, h).stroke("#cccccc")
  const tx = x + 8
  const ty = y + 10
  doc.font("Helvetica-Bold").fontSize(11)
  doc.fillColor(MAROON).text("MaxWell", tx, ty, { lineBreak: false })
  const w1 = doc.widthOfString("MaxWell")
  doc.fillColor("#1e40af").text(" Excel Realty", tx + w1, ty, { lineBreak: false })
  doc.fillColor("#000000")
}

function drawSignatureCell(
  doc: PdfDoc,
  x: number,
  y: number,
  w: number,
  h: number,
  title: string,
  legalName: string,
  png?: Buffer,
) {
  doc.font("Helvetica-Bold").fontSize(8).text(title, x, y, { width: w })
  const innerY = y + 14
  doc.lineWidth(1).strokeColor("#000000").rect(x, innerY, w, h).stroke()
  if (png?.length) {
    try {
      const pad = 4
      doc.image(png, x + pad, innerY + pad, {
        fit: [w - pad * 2, h - pad * 2],
      })
    } catch {
      doc.font("Helvetica").fontSize(7).fillColor("#666666").text("(signature)", x + 6, innerY + h / 2 - 4)
      doc.fillColor("#000000")
    }
  }
  doc.font("Helvetica-Bold").fontSize(7).text("Legal Name", x, innerY + h + 4, { width: w })
  doc.font("Helvetica").fontSize(9).text(val(legalName), x, innerY + h + 14, { width: w })
}

function appendAttachmentPages(doc: PdfDoc, pages: RentalPdfEmbedPage[]) {
  const sorted = [...pages].sort((a, b) => a.slot - b.slot)
  for (const p of sorted) {
    doc.addPage()
    doc.x = MARGIN
    doc.y = MARGIN
    doc.font("Helvetica-Bold").fontSize(10).fillColor(MAROON).text(`Attachment ${p.slot}`, MARGIN, MARGIN)
    doc.fillColor("#333333").font("Helvetica").fontSize(8).text(p.filename, MARGIN, MARGIN + 16, {
      width: CONTENT_W,
    })
    const top = MARGIN + 36
    const bottom = PAGE_H - MARGIN
    const innerH = bottom - top

    if (isRasterImageMime(p.contentType)) {
      try {
        doc.image(p.buffer, MARGIN, top, {
          fit: [CONTENT_W, innerH],
          align: "center",
          valign: "center",
        })
      } catch {
        doc.font("Helvetica").fontSize(9).text(
          "Image could not be embedded in this PDF. See the separate file in the email.",
          MARGIN,
          top,
          { width: CONTENT_W },
        )
      }
    } else {
      doc.font("Helvetica").fontSize(9).text(
        `This file is not embedded here (${p.contentType || "unknown type"}). Open the separate "${p.filename}" attachment from the email.`,
        MARGIN,
        top,
        { width: CONTENT_W },
      )
    }
  }
}

export async function buildRentalApplicationPdf(opts: {
  t: RentalApplicationFormStrings
  /** Slot 1–10 → file present (for "Attachment N" labels in the form grid). */
  slotPresent: (slot: number) => boolean
  /** Raster/PDF buffers to append as pages after the application (signatures excluded). */
  embedPages: RentalPdfEmbedPage[]
  applicantSignaturePng?: Buffer
  coApplicantSignaturePng?: Buffer
  submittedAt?: Date
}): Promise<Buffer> {
  const { t, slotPresent, embedPages, applicantSignaturePng, coApplicantSignaturePng } = opts
  const submittedAt = opts.submittedAt ?? new Date()

  const { default: PDFDocument } = await import("pdfkit")

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "LETTER",
      margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
      /** Buffered pages + mixed absolute/flow text caused stray blank pages in some viewers. */
      bufferPages: false,
    })
    const chunks: Buffer[] = []
    doc.on("data", (c: Buffer) => chunks.push(c))
    doc.on("end", () => resolve(Buffer.concat(chunks)))
    doc.on("error", reject)

    let y = MARGIN
    y = drawHeaderLogos(doc, y)
    doc.x = LEFT_X
    doc.y = y

    const titleY = doc.y
    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .fillColor("#000000")
      .text("Rental Application Form", MARGIN, titleY, {
        width: CONTENT_W,
        align: "center",
        underline: true,
      })
    doc.fillColor("#000000").font("Helvetica").fontSize(9)
    doc.x = LEFT_X
    doc.y = titleY + 30

    sectionTitle(doc, "Terms & Conditions")
    for (const p of RENTAL_PRIVACY_TERMS_PARAGRAPHS) {
      doc.x = LEFT_X
      doc.font("Helvetica").fontSize(8).fillColor("#333333")
      const ph = Math.max(doc.heightOfString(p, { width: CONTENT_W }), 12)
      ensureSpace(doc, ph + 5)
      const y0 = doc.y
      doc.text(p, LEFT_X, y0, { width: CONTENT_W, align: "justify" })
      doc.y = y0 + ph + 5
    }
    doc.fillColor("#000000")

    sectionTitle(doc, "Property & Occupancy Details")
    rowPair(
      doc,
      "Address of Property",
      t.propertyAddress,
      "Date Occupancy Desired",
      t.occupancyDate,
    )
    rowPair(doc, "Adults", t.adults, "Children", t.children)

    sectionTitle(doc, "Personal Information")
    rowPair(doc, "Name", t.applicantName, "Social Insurance Number", "—")
    rowPair(doc, "Current Address", t.applicantAddress, "Email Address", t.applicantEmail)
    rowPair(doc, "Phone 1", t.applicantPhone1, "Phone 2", t.applicantPhone2)
    rowPair(doc, "Date of Birth", t.applicantDob, "Govt Issued Photo ID", attRef(slotPresent, 1))

    sectionTitle(doc, "Co-Applicant's Personal Information")
    rowPair(doc, "Name", t.coApplicantName, "Social Insurance Number", "—")
    rowPair(doc, "Current Address", t.coApplicantAddress, "Email Address", t.coApplicantEmail)
    rowPair(doc, "Phone 1", t.coApplicantPhone1, "Phone 2", t.coApplicantPhone2)
    rowPair(doc, "Date of Birth", t.coApplicantDob, "Govt Issued Photo ID", attRef(slotPresent, 2))

    sectionTitle(doc, "Co-Applicant's Personal Information (Who is under 18)")
    rowPair(doc, "Name 1", t.minorName1, "Name 2", t.minorName2)
    rowPair(doc, "Name 3", t.minorName3, "Name 4", t.minorName4)

    sectionTitle(doc, "Previous Tenancy")
    rowPair(doc, "Landlord's Name", t.prevLandlordName, "Landlord's Phone", t.prevLandlordPhone)
    rowPair(doc, "Present Address", t.prevPresentAddress, "Time at this location", t.prevTimeAtLocation)
    rowPair(doc, "Monthly Rent", t.prevMonthlyRent, "Reason for Leaving", t.prevReasonLeaving)

    sectionTitle(doc, "Employment Information")
    rowPair(doc, "Status", employmentLabel(t.employmentStatus), "Current Employer", t.employerName)
    rowPair(doc, "Address", t.employerAddress, "Supervisor's Name", t.supervisorName)
    rowPair(doc, "Phone", t.employerPhone, "Length of Employment", t.lengthEmployment)
    rowPair(doc, "Monthly Wage", t.monthlyWage, "Job Position", t.jobPosition)
    fullWidthLabelValue(doc, "If you have other sources of income that you would like us to consider, please list income, source and amount", t.otherIncomeSources)

    doc.x = LEFT_X
    doc.font("Helvetica-Bold").fontSize(8)
    const uploadLabel = "Upload Pictures"
    const uploadLabelH = Math.max(doc.heightOfString(uploadLabel, { width: CONTENT_W }), 10)
    const tripRowH = 14
    ensureSpace(doc, uploadLabelH + 4 + tripRowH)
    const yUploadLbl = doc.y
    doc.text(uploadLabel, LEFT_X, yUploadLbl, { width: CONTENT_W })
    const tripY = yUploadLbl + uploadLabelH + 4
    const tripW = (CONTENT_W - 2 * 8) / 3
    const slotsEmp = [3, 4, 5] as const
    for (let i = 0; i < 3; i++) {
      const sx = LEFT_X + i * (tripW + 8)
      doc.font("Helvetica").fontSize(8).text(attRef(slotPresent, slotsEmp[i]), sx, tripY, { width: tripW })
    }
    doc.y = tripY + tripRowH
    doc.x = LEFT_X

    sectionTitle(doc, "Co-Applicant's Employment Information")
    rowPair(doc, "Current Employer", t.coEmployerName, "Address", t.coEmployerAddress)
    rowPair(doc, "Supervisor's Name", t.coSupervisorName, "Phone", t.coEmployerPhone)
    rowPair(doc, "Length of Employment", t.coLengthEmployment, "Monthly Wage", t.coMonthlyWage)
    fullWidthLabelValue(doc, "Job Position", t.coJobPosition)

    doc.x = LEFT_X
    doc.font("Helvetica-Bold").fontSize(8)
    const uploadLabel2 = "Upload Pictures"
    const uploadLabel2H = Math.max(doc.heightOfString(uploadLabel2, { width: CONTENT_W }), 10)
    ensureSpace(doc, uploadLabel2H + 4 + tripRowH)
    const yUploadLbl2 = doc.y
    doc.text(uploadLabel2, LEFT_X, yUploadLbl2, { width: CONTENT_W })
    const tripY2 = yUploadLbl2 + uploadLabel2H + 4
    const slotsCo = [6, 7, 8] as const
    for (let i = 0; i < 3; i++) {
      const sx = LEFT_X + i * (tripW + 8)
      doc.font("Helvetica").fontSize(8).text(attRef(slotPresent, slotsCo[i]), sx, tripY2, { width: tripW })
    }
    doc.y = tripY2 + tripRowH
    doc.x = LEFT_X

    sectionTitle(doc, "Credit History Description")
    rowPair(doc, "Have you declared bankruptcy in the past seven (7) years?", yn(t.bankruptcyAnswer), "Have you ever been evicted from a rental residence?", yn(t.evictedAnswer))
    rowPair(
      doc,
      "Have you had two or more late rental payments in the past 12 months?",
      yn(t.lateRentAnswer),
      "Have you ever refused to pay rent when due?",
      yn(t.refusedRentAnswer),
    )
    fullWidthLabelValue(
      doc,
      "If you have answered YES to any of the above, please state your reasons and/or circumstances",
      t.creditYesDetails,
    )

    doc.x = LEFT_X
    doc.font("Helvetica-Bold").fontSize(8)
    const crLine =
      "Please upload if you have current credit report:"
    const crLineH = Math.max(doc.heightOfString(crLine, { width: CONTENT_W }), 10)
    ensureSpace(doc, crLineH + 4 + 16)
    const yCrPrompt = doc.y
    doc.text(crLine, LEFT_X, yCrPrompt, { width: CONTENT_W })
    const crY = yCrPrompt + crLineH + 4
    const half = (CONTENT_W - 8) / 2
    doc.font("Helvetica").fontSize(8).text(attRef(slotPresent, 9), LEFT_X, crY, { width: half })
    doc.text(attRef(slotPresent, 10), LEFT_X + half + 8, crY, { width: half })
    doc.y = crY + 16
    doc.x = LEFT_X

    sectionTitle(doc, "Additional Information")
    rowPair(doc, "Do you wish to bring a pet(s) to the rental premises?", yn(t.bringPetsAnswer), "If yes, describe the pets:", t.petsDescription)
    rowPair(doc, "Do you, or any proposed occupant, smoke?", yn(t.smokeAnswer), "If you are co-applicants, do you consent to a joint credit report?", yn(t.jointCreditAnswer))

    doc.x = LEFT_X
    const noteTitle = "NOTE"
    const notePara =
      "The Landlord is not responsible for possessions of the Tenant(s) or damages to same. Tenant(s) are encouraged to obtain tenant insurance for their belongings and for third party liability."
    doc.font("Helvetica-Bold").fontSize(8)
    const noteTitleH = Math.max(doc.heightOfString(noteTitle, { width: CONTENT_W }), 10)
    doc.font("Helvetica").fontSize(7)
    const noteParaH = Math.max(doc.heightOfString(notePara, { width: CONTENT_W }), 16)
    ensureSpace(doc, noteTitleH + 4 + noteParaH + 6)
    const yNote = doc.y
    doc.font("Helvetica-Bold").fontSize(8).text(noteTitle, LEFT_X, yNote, { width: CONTENT_W })
    doc.font("Helvetica").fontSize(7).text(notePara, LEFT_X, yNote + noteTitleH + 4, {
      width: CONTENT_W,
      align: "justify",
    })
    doc.y = yNote + noteTitleH + 4 + noteParaH + 6
    fullWidthLabelValue(
      doc,
      "I/We presently insure our belongings and for third party liability",
      yn(t.tenantInsuranceAnswer),
    )
    fullWidthLabelValue(doc, "Additional Comments by Applicants", t.additionalComments)

    sectionTitle(doc, "Emergency Contact")
    rowPair(doc, "Name of a person not residing with you", t.emergencyContactName, "Address", t.emergencyContactAddress)
    rowPair(doc, "Phone", t.emergencyContactPhone, "Relationship", t.emergencyContactRelationship)

    sectionTitle(doc, "Terms & Conditions")
    for (const p of RENTAL_FINAL_TERMS_PARAGRAPHS) {
      doc.x = LEFT_X
      doc.font("Helvetica").fontSize(8).fillColor("#333333")
      const ph = Math.max(doc.heightOfString(p, { width: CONTENT_W }), 12)
      ensureSpace(doc, ph + 5)
      const yp = doc.y
      doc.text(p, LEFT_X, yp, { width: CONTENT_W, align: "justify" })
      doc.y = yp + ph + 5
    }
    doc.fillColor("#000000")
    rowPair(doc, "Agree with terms and conditions", "Yes", "Date", submittedAt.toLocaleDateString("en-CA", { timeZone: "America/Edmonton" }))

    sectionTitle(doc, "Signatures")
    doc.x = LEFT_X
    const sigBoxH = 64
    const sigGap = 12
    const sigW = (CONTENT_W - sigGap) / 2
    const sigBlockH = 14 + sigBoxH + 28 + 8
    ensureSpace(doc, sigBlockH)
    const sigTop = doc.y
    drawSignatureCell(doc, LEFT_X, sigTop, sigW, sigBoxH, "Signature", t.legalName, applicantSignaturePng)
    drawSignatureCell(doc, RIGHT_X, sigTop, sigW, sigBoxH, "Co-Applicant's Signature", t.coLegalName, coApplicantSignaturePng)
    doc.y = sigTop + 14 + sigBoxH + 28 + 8
    doc.x = LEFT_X

    if (embedPages.length > 0) {
      doc.x = LEFT_X
      doc.font("Helvetica").fontSize(8).fillColor("#555555")
      const intro =
        "The following pages contain uploaded documents (Attachments) in numbered order."
      const introH = Math.max(doc.heightOfString(intro, { width: CONTENT_W }), 12)
      ensureSpace(doc, introH + 10)
      const yi = doc.y
      doc.text(intro, LEFT_X, yi, { width: CONTENT_W })
      doc.y = yi + introH + 10
      doc.x = LEFT_X
      appendAttachmentPages(doc, embedPages)
    } else {
      doc.x = LEFT_X
      doc.font("Helvetica").fontSize(8).fillColor("#555555")
      const noEmb =
        "No supporting document images were uploaded; see email attachments if any files were sent separately."
      const nh = Math.max(doc.heightOfString(noEmb, { width: CONTENT_W }), 12)
      ensureSpace(doc, nh + 4)
      doc.text(noEmb, LEFT_X, doc.y, { width: CONTENT_W })
      doc.y += nh + 4
    }

    doc.end()
  })
}
