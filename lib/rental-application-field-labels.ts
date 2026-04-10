/** User-facing labels for rental application FormData / API keys */
export const RENTAL_APPLICATION_FIELD_LABELS: Record<string, string> = {
  propertyAddress: "Address of Property",
  occupancyDate: "Date Occupancy Desired",
  adults: "Number of Adults",
  children: "Number of Children",
  applicantName: "Applicant name",
  applicantAddress: "Applicant current address",
  applicantEmail: "Applicant email",
  applicantPhone1: "Applicant phone 1",
  applicantPhone2: "Applicant phone 2",
  applicantDob: "Applicant date of birth",
  coApplicantName: "Co-applicant name",
  coApplicantAddress: "Co-applicant address",
  coApplicantEmail: "Co-applicant email",
  coApplicantPhone1: "Co-applicant phone 1",
  coApplicantPhone2: "Co-applicant phone 2",
  coApplicantDob: "Co-applicant date of birth",
  minorName1: "Minor name 1",
  minorName2: "Minor name 2",
  minorName3: "Minor name 3",
  minorName4: "Minor name 4",
  prevLandlordName: "Previous landlord name",
  prevLandlordPhone: "Previous landlord phone",
  prevPresentAddress: "Previous present address",
  prevTimeAtLocation: "Time at previous location",
  prevMonthlyRent: "Previous monthly rent",
  prevReasonLeaving: "Reason for leaving",
  employmentStatus: "Employment status",
  employerName: "Employer name",
  employerAddress: "Employer address",
  supervisorName: "Supervisor name",
  employerPhone: "Employer phone",
  lengthEmployment: "Length of employment",
  monthlyWage: "Monthly wage",
  jobPosition: "Job position",
  otherIncomeSources: "Other income / sources",
  coEmployerName: "Co-applicant employer",
  coEmployerAddress: "Co-applicant employer address",
  coSupervisorName: "Co-applicant supervisor",
  coEmployerPhone: "Co-applicant employer phone",
  coLengthEmployment: "Co-applicant length of employment",
  coMonthlyWage: "Co-applicant monthly wage",
  coJobPosition: "Co-applicant job position",
  bankruptcyAnswer: "Bankruptcy (past 7 years)",
  evictedAnswer: "Eviction history",
  lateRentAnswer: "Late rental payments",
  refusedRentAnswer: "Refused rent when due",
  creditYesDetails: "Credit / history details",
  bringPetsAnswer: "Bringing pets",
  petsDescription: "Pet description",
  smokeAnswer: "Smoking",
  jointCreditAnswer: "Joint credit report consent",
  tenantInsuranceAnswer: "Tenant insurance",
  additionalComments: "Additional comments",
  emergencyContactName: "Emergency contact name",
  emergencyContactAddress: "Emergency contact address",
  emergencyContactPhone: "Emergency contact phone",
  emergencyContactRelationship: "Emergency contact relationship",
  legalName: "Legal name (signature)",
  coLegalName: "Co-applicant legal name",
}

export function friendlyZodFieldMessage(message: string): string {
  const m = message.toLowerCase()
  if (m.includes("at least 1 character") || m.includes("string must contain")) {
    return "This field is required."
  }
  if (m.includes("invalid email")) return "Enter a valid email address."
  if (m.includes("required")) return "This field is required."
  return message
}

export function rentalApplicationIssuesFromZodFlat(fieldErrors: {
  [k: string]: string[] | undefined
}): string[] {
  const lines: string[] = []
  for (const [key, msgs] of Object.entries(fieldErrors)) {
    if (!msgs?.length) continue
    const label = RENTAL_APPLICATION_FIELD_LABELS[key] ?? key
    const msg = friendlyZodFieldMessage(msgs[0])
    lines.push(`${label}: ${msg}`)
  }
  return lines
}
