export const FORM_PATHS = {
  landlord: "/client-inquiry",
  rental: "/forms/rental",
  schedule: "/forms/schedule",
  service: "/forms/service",
} as const

export function getFormPath(formId: string): string {
  return FORM_PATHS[formId as keyof typeof FORM_PATHS] ?? `/forms/${formId}`
}
