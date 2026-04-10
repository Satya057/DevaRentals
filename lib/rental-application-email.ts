function line(label: string, value: string): string {
  return `${label}: ${value.trim()}`
}

function yn(v: string): string {
  if (v === "yes") return "Yes"
  if (v === "no") return "No"
  return v
}

function employmentLabel(v: string): string {
  const m: Record<string, string> = {
    "full-time": "Full-Time",
    "part-time": "Part-Time",
    student: "Student",
    unemployed: "Unemployed",
    retired: "Retired",
  }
  return m[v] ?? v
}

export type RentalApplicationFormStrings = {
  propertyAddress: string
  occupancyDate: string
  adults: string
  children: string
  applicantName: string
  applicantAddress: string
  applicantEmail: string
  applicantPhone1: string
  applicantPhone2: string
  applicantDob: string
  coApplicantName: string
  coApplicantAddress: string
  coApplicantEmail: string
  coApplicantPhone1: string
  coApplicantPhone2: string
  coApplicantDob: string
  minorName1: string
  minorName2: string
  minorName3: string
  minorName4: string
  prevLandlordName: string
  prevLandlordPhone: string
  prevPresentAddress: string
  prevTimeAtLocation: string
  prevMonthlyRent: string
  prevReasonLeaving: string
  employmentStatus: string
  employerName: string
  employerAddress: string
  supervisorName: string
  employerPhone: string
  lengthEmployment: string
  monthlyWage: string
  jobPosition: string
  otherIncomeSources: string
  coEmployerName: string
  coEmployerAddress: string
  coSupervisorName: string
  coEmployerPhone: string
  coLengthEmployment: string
  coMonthlyWage: string
  coJobPosition: string
  bankruptcyAnswer: string
  evictedAnswer: string
  lateRentAnswer: string
  refusedRentAnswer: string
  creditYesDetails: string
  bringPetsAnswer: string
  petsDescription: string
  smokeAnswer: string
  jointCreditAnswer: string
  tenantInsuranceAnswer: string
  additionalComments: string
  emergencyContactName: string
  emergencyContactAddress: string
  emergencyContactPhone: string
  emergencyContactRelationship: string
  legalName: string
  coLegalName: string
}

export function formatRentalApplicationEmailBody(
  t: RentalApplicationFormStrings,
  attachmentLines: string[],
): string {
  const blocks: string[] = [
    "=== RENTAL APPLICATION (website) ===",
    "",
    "Complete application (PDF): Rental-Application.pdf — attached to this email.",
    "",
    "— Property & occupants —",
    line("Address of Property", t.propertyAddress),
    line("Date Occupancy Desired", t.occupancyDate),
    line("Adults", t.adults),
    line("Children", t.children),
    "",
    "— Applicant personal information —",
    line("Name", t.applicantName),
    line("Current Address", t.applicantAddress),
    line("Email Address", t.applicantEmail),
    line("Phone 1", t.applicantPhone1),
    line("Phone 2", t.applicantPhone2),
    line("Date of Birth", t.applicantDob),
    "",
    "— Co-Applicant personal information —",
    line("Name", t.coApplicantName),
    line("Current Address", t.coApplicantAddress),
    line("Email Address", t.coApplicantEmail),
    line("Phone 1", t.coApplicantPhone1),
    line("Phone 2", t.coApplicantPhone2),
    line("Date of Birth", t.coApplicantDob),
    "",
    "— Co-applicants under 18 (names) —",
    line("Name 1", t.minorName1),
    line("Name 2", t.minorName2),
    line("Name 3", t.minorName3),
    line("Name 4", t.minorName4),
    "",
    "— Previous tenancy —",
    line("Landlord's Name", t.prevLandlordName),
    line("Landlord's Phone", t.prevLandlordPhone),
    line("Present Address", t.prevPresentAddress),
    line("Time at this location", t.prevTimeAtLocation),
    line("Monthly Rent", t.prevMonthlyRent),
    line("Reason for Leaving", t.prevReasonLeaving),
    "",
    "— Employment (applicant) —",
    line("Status", employmentLabel(t.employmentStatus)),
    line("Current Employer", t.employerName),
    line("Address", t.employerAddress),
    line("Supervisor's Name", t.supervisorName),
    line("Phone", t.employerPhone),
    line("Length of Employment", t.lengthEmployment),
    line("Monthly Wage", t.monthlyWage),
    line("Job Position", t.jobPosition),
    line("Other income / sources", t.otherIncomeSources),
    "",
    "— Employment (co-applicant) —",
    line("Current Employer", t.coEmployerName),
    line("Address", t.coEmployerAddress),
    line("Supervisor's Name", t.coSupervisorName),
    line("Phone", t.coEmployerPhone),
    line("Length of Employment", t.coLengthEmployment),
    line("Monthly Wage", t.coMonthlyWage),
    line("Job Position", t.coJobPosition),
    "",
    "— Credit / history —",
    line("Declared bankruptcy in past 7 years?", yn(t.bankruptcyAnswer)),
    line("Ever evicted?", yn(t.evictedAnswer)),
    line("Two or more late rental payments in past 12 months?", yn(t.lateRentAnswer)),
    line("Ever refused to pay rent when due?", yn(t.refusedRentAnswer)),
    line("Details if any YES above", t.creditYesDetails),
    "",
    "— Additional information —",
    line("Bring pet(s)?", yn(t.bringPetsAnswer)),
    line("Pet description", t.petsDescription),
    line("Anyone smoke?", yn(t.smokeAnswer)),
    line("Consent to joint credit report (co-applicants)?", yn(t.jointCreditAnswer)),
    line("Tenant insurance (belongings / liability)?", yn(t.tenantInsuranceAnswer)),
    line("Additional comments", t.additionalComments),
    "",
    "— Emergency contact —",
    line("Name (not residing with you)", t.emergencyContactName),
    line("Address", t.emergencyContactAddress),
    line("Phone", t.emergencyContactPhone),
    line("Relationship", t.emergencyContactRelationship),
    "",
    "— Signatures (typed legal names) —",
    line("Legal Name", t.legalName),
    line("Co-Applicant Legal Name", t.coLegalName),
    "",
    "— Attachments (files with this email) —",
    ...(attachmentLines.length ? attachmentLines : ["(none)"]),
  ]

  return blocks.join("\n")
}
