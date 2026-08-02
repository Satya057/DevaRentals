export const SERVICE_REQUEST_CATEGORIES = [
  "Plumbing",
  "Electrical",
  "Heating",
  "Air Conditioning",
  "Appliances",
  "Garage Door",
  "Doors & Locks",
  "Windows",
  "Roofing",
  "Flooring",
  "Painting",
  "Cleaning",
  "Landscaping",
  "Pest Control",
  "Snow Removal",
  "Other",
] as const

export type ServiceRequestCategory = (typeof SERVICE_REQUEST_CATEGORIES)[number]
