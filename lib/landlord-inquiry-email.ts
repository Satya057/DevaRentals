import {
  BATHROOM_OPTIONS,
  BEDROOM_OPTIONS,
} from "@/lib/landlord-inquiry-labels"

export type LandlordInquiryPayload = {
  fullName: string
  secondOwnerName: string
  phone: string
  secondOwnerPhone: string
  email: string
  secondOwnerEmail: string
  propertyAddress: string
  secondPropertyAddress: string
  propertyType: string
  availableDate: string
  rentExpectation: string
  squareFootage: string
  buildYear: string
  bedrooms: string
  bedroomsOther: string
  bathrooms: string
  bathroomsOther: string
  furnishing: string
  backyard: string
  preferredLeaseTerm: string
  contractTerm: string
  petsAllowed: string
  petRestrictions: string
  parking: string
  comments: string
  tourDate: string
  hearAboutUs: string
  hearAboutSpecify: string
  friendName: string
}

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  "front-attach": "Front Attach Garage",
  "lane-home": "Lane Home (Back Garage)",
  duplex: "Duplex",
  townhouse: "Townhouse",
  apartment: "Apartment",
  "main-floor": "Main Floor",
  basement: "Basement",
}

const LEASE_LABELS: Record<string, string> = {
  "6-months": "6 Months",
  "1-year": "1 Year",
  "2-years": "2 Years",
  flexible: "Flexible",
}

const FURNISHING_LABELS: Record<string, string> = {
  unfurnished: "Unfurnished",
  furnished: "Furnished",
  "semi-furnished": "Semi Furnished",
}

const YESNO: Record<string, string> = {
  yes: "Yes",
  no: "No",
}

const PETS_LABELS: Record<string, string> = {
  yes: "Yes",
  no: "No",
  negotiable: "Negotiable",
}

const PARKING_LABELS: Record<string, string> = {
  single: "Single Garage",
  double: "Double Garage",
  street: "Street Parking",
  covered: "Covered Stall",
  underground: "Under Ground",
}

const HEAR_LABELS: Record<string, string> = {
  facebook: "Facebook",
  google: "Google",
  website: "Website",
  instagram: "Instagram",
  referral: "Friend Referral",
  others: "Others",
}

function optLabel(
  options: { value: string; label: string }[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? value
}

function line(label: string, value: string): string {
  const v = value.trim()
  return `${label}: ${v}`
}

export function formatLandlordInquiryEmailBody(d: LandlordInquiryPayload): string {
  const bedroomDisplay = optLabel(BEDROOM_OPTIONS, d.bedrooms)
  const bathroomDisplay =
    d.bathrooms === "other"
      ? "Other Bathrooms"
      : `${optLabel(BATHROOM_OPTIONS, d.bathrooms)} Bathrooms`

  const lines = [
    line("Full Name", d.fullName),
    line("2nd Owner Full Name", d.secondOwnerName),
    line("Phone Number", d.phone),
    line("2nd Owner Phone Number", d.secondOwnerPhone),
    line("Email", d.email),
    line("2nd Owner Email", d.secondOwnerEmail),
    line("Property Address", d.propertyAddress),
    line("2nd Property Address", d.secondPropertyAddress),
    line("Property Type", PROPERTY_TYPE_LABELS[d.propertyType] ?? d.propertyType),
    line("Available Date for New Tenants", d.availableDate),
    line("Rent Expectation (Monthly)", d.rentExpectation),
    line("Square Footage", d.squareFootage),
    line("Property Build Year", d.buildYear),
    line("Number of Bedrooms", bedroomDisplay),
    line(
      "Specify Other Bedrooms",
      d.bedrooms === "other" ? d.bedroomsOther : "",
    ),
    line("Number of Bathrooms", bathroomDisplay),
    line(
      "Specify Other Bathrooms",
      d.bathrooms === "other" ? d.bathroomsOther : "",
    ),
    line("Furnishing Type", FURNISHING_LABELS[d.furnishing] ?? d.furnishing),
    line("Backyard Availability", YESNO[d.backyard] ?? d.backyard),
    line(
      "Preferred Tenant Lease Term",
      LEASE_LABELS[d.preferredLeaseTerm] ?? d.preferredLeaseTerm,
    ),
    line("Contract Term Period", LEASE_LABELS[d.contractTerm] ?? d.contractTerm),
    line("Are Pets Allowed?", PETS_LABELS[d.petsAllowed] ?? d.petsAllowed),
    line("Specify Restrictions (pets)", d.petRestrictions),
    line("Parking Availability", PARKING_LABELS[d.parking] ?? d.parking),
    line(
      "Any Comments or information you'd like to share with us before we call you?",
      d.comments,
    ),
    line(
      "What date would you like to visit the property for an in-person tour?",
      d.tourDate,
    ),
    line("How did you hear about us?", HEAR_LABELS[d.hearAboutUs] ?? d.hearAboutUs),
    line("Please specify", d.hearAboutUs === "others" ? d.hearAboutSpecify : ""),
    line(
      "Friend's Name",
      d.hearAboutUs === "referral" ? d.friendName : "",
    ),
  ]

  return lines.join("\n")
}
