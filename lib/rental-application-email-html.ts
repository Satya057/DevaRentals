import type { RentalApplicationFormStrings } from "@/lib/rental-application-email"
import {
  RENTAL_FINAL_TERMS_PARAGRAPHS,
  RENTAL_PRIVACY_TERMS_PARAGRAPHS,
} from "@/lib/rental-application-legal-text"

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function yn(v: string): string {
  if (v === "yes") return "Yes"
  if (v === "no") return "No"
  return v?.trim() ? v.trim() : "—"
}

function employmentLabel(v: string): string {
  const m: Record<string, string> = {
    "full-time": "Full-Time",
    "part-time": "Part-Time",
    student: "Student",
    unemployed: "Unemployed",
    retired: "Retired",
  }
  return m[v] ?? (v?.trim() ? v.trim() : "—")
}

function row(label: string, value: string): string {
  const v = value?.trim() ? esc(value.trim()) : "—"
  return `<p style="margin:0.35em 0;"><strong>${esc(label)}:</strong> ${v}</p>`
}

export function formatRentalApplicationEmailHtml(
  t: RentalApplicationFormStrings,
  attachmentLines: string[],
): string {
  const privacyHtml = RENTAL_PRIVACY_TERMS_PARAGRAPHS.map(
    (p) => `<p style="margin:0 0 0.75em;line-height:1.45;color:#444;">${esc(p)}</p>`,
  ).join("")

  const finalHtml = RENTAL_FINAL_TERMS_PARAGRAPHS.map(
    (p) => `<p style="margin:0 0 0.75em;line-height:1.45;color:#444;">${esc(p)}</p>`,
  ).join("")

  const attachmentsHtml =
    attachmentLines.length === 0
      ? "<p><em>(No file uploads.)</em></p>"
      : `<ol style="margin:0.5em 0;padding-left:1.25em;">${attachmentLines
          .map((line) => `<li>${esc(line.replace(/^•\s*/, ""))}</li>`)
          .join("")}</ol>`

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="font-family:Arial,Helvetica,sans-serif;color:#222;line-height:1.45;max-width:720px;margin:0;padding:16px;">
<div style="background:#e8eef4;border:1px solid #b8c4d4;padding:14px 18px;margin-bottom:20px;font-size:18px;font-weight:bold;color:#1a1a1a;">
Rental Application Form from ${esc(t.applicantName)}
</div>

<h2 style="font-size:16px;margin:18px 0 8px;color:${"#8B2332"};">Your Personal Information</h2>
<h3 style="font-size:14px;margin:12px 0 8px;">Terms &amp; Conditions</h3>
<div style="font-size:13px;">${privacyHtml}</div>

<h3 style="font-size:14px;margin:16px 0 8px;">Property &amp; occupants</h3>
${row("Address of Property", t.propertyAddress)}
${row("Date Occupancy Desired", t.occupancyDate)}
${row("Adults", t.adults)}
${row("Children", t.children)}

<h2 style="font-size:16px;margin:18px 0 8px;color:${"#8B2332"};">Personal Information</h2>
${row("Name", t.applicantName)}
${row("Current Address", t.applicantAddress)}
${row("Email Address", t.applicantEmail)}
${row("Phone 1", t.applicantPhone1)}
${row("Phone 2", t.applicantPhone2)}
${row("Date of Birth", t.applicantDob)}

<h2 style="font-size:16px;margin:18px 0 8px;color:${"#8B2332"};">Co-Applicant's Personal Information</h2>
${row("Name", t.coApplicantName)}
${row("Current Address", t.coApplicantAddress)}
${row("Email Address", t.coApplicantEmail)}
${row("Phone 1", t.coApplicantPhone1)}
${row("Phone 2", t.coApplicantPhone2)}
${row("Date of Birth", t.coApplicantDob)}

<h2 style="font-size:16px;margin:18px 0 8px;color:${"#8B2332"};">Co-Applicant's Personal Information (Who is under 18)</h2>
${row("Name 1", t.minorName1)}
${row("Name 2", t.minorName2)}
${row("Name 3", t.minorName3)}
${row("Name 4", t.minorName4)}

<h2 style="font-size:16px;margin:18px 0 8px;color:${"#8B2332"};">Previous Tenancy</h2>
${row("Landlord's Name", t.prevLandlordName)}
${row("Landlord's Phone", t.prevLandlordPhone)}
${row("Present Address", t.prevPresentAddress)}
${row("Time at this location", t.prevTimeAtLocation)}
${row("Monthly Rent", t.prevMonthlyRent)}
${row("Reason for Leaving", t.prevReasonLeaving)}

<h2 style="font-size:16px;margin:18px 0 8px;color:${"#8B2332"};">Employment Information (Applicant)</h2>
${row("Status", employmentLabel(t.employmentStatus))}
${row("Current Employer", t.employerName)}
${row("Address", t.employerAddress)}
${row("Supervisor's Name", t.supervisorName)}
${row("Phone", t.employerPhone)}
${row("Length of Employment", t.lengthEmployment)}
${row("Monthly Wage", t.monthlyWage)}
${row("Job Position", t.jobPosition)}
${row("Other income / sources", t.otherIncomeSources)}

<h2 style="font-size:16px;margin:18px 0 8px;color:${"#8B2332"};">Co-Applicant's Employment Information</h2>
${row("Current Employer", t.coEmployerName)}
${row("Address", t.coEmployerAddress)}
${row("Supervisor's Name", t.coSupervisorName)}
${row("Phone", t.coEmployerPhone)}
${row("Length of Employment", t.coLengthEmployment)}
${row("Monthly Wage", t.coMonthlyWage)}
${row("Job Position", t.coJobPosition)}

<h2 style="font-size:16px;margin:18px 0 8px;color:${"#8B2332"};">Credit History</h2>
${row("Declared bankruptcy in past 7 years?", yn(t.bankruptcyAnswer))}
${row("Ever evicted?", yn(t.evictedAnswer))}
${row("Two or more late rental payments in past 12 months?", yn(t.lateRentAnswer))}
${row("Ever refused to pay rent when due?", yn(t.refusedRentAnswer))}
${row("Details if any YES above", t.creditYesDetails)}

<h2 style="font-size:16px;margin:18px 0 8px;color:${"#8B2332"};">Additional Information</h2>
${row("Bring pet(s)?", yn(t.bringPetsAnswer))}
${row("Pet description", t.petsDescription)}
${row("Anyone smoke?", yn(t.smokeAnswer))}
${row("Consent to joint credit report (co-applicants)?", yn(t.jointCreditAnswer))}
${row("Tenant insurance (belongings / liability)?", yn(t.tenantInsuranceAnswer))}
${row("Additional comments", t.additionalComments)}

<h2 style="font-size:16px;margin:18px 0 8px;color:${"#8B2332"};">Emergency Contact</h2>
${row("Name (not residing with you)", t.emergencyContactName)}
${row("Address", t.emergencyContactAddress)}
${row("Phone", t.emergencyContactPhone)}
${row("Relationship", t.emergencyContactRelationship)}

<h2 style="font-size:16px;margin:18px 0 8px;color:${"#8B2332"};">Terms &amp; Conditions</h2>
<div style="font-size:13px;">${finalHtml}</div>
${row("Agree with terms and conditions", "Yes")}

<h2 style="font-size:16px;margin:18px 0 8px;color:${"#8B2332"};">Signatures</h2>
${row("Legal Name", t.legalName)}
${row("Co-Applicant Legal Name", t.coLegalName)}
<p style="margin:0.75em 0 0;font-size:13px;color:#555;">Signature images are embedded in the attached <strong>Rental-Application.pdf</strong> and also attached as PNG files when provided.</p>

<h2 style="font-size:16px;margin:18px 0 8px;color:${"#8B2332"};">Attachments</h2>
${attachmentsHtml}
<p style="margin-top:1.25em;font-size:12px;color:#666;">A complete copy of this application is attached as <strong>Rental-Application.pdf</strong>.</p>
</body>
</html>`
}
