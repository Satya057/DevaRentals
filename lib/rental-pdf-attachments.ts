/** Fixed slots matching the legacy PDF (IDs → employment → co-emp → credit). Signatures are not numbered. */
export const RENTAL_UPLOAD_SLOT_KEYS = [
  { slot: 1, key: "file_applicant_id", label: "Applicant Govt Issued Photo ID" },
  { slot: 2, key: "file_co_applicant_id", label: "Co-Applicant Govt Issued Photo ID" },
  { slot: 3, key: "file_employment_1", label: "Employment upload 1" },
  { slot: 4, key: "file_employment_2", label: "Employment upload 2" },
  { slot: 5, key: "file_employment_3", label: "Employment upload 3" },
  { slot: 6, key: "file_co_employment_1", label: "Co-applicant employment upload 1" },
  { slot: 7, key: "file_co_employment_2", label: "Co-applicant employment upload 2" },
  { slot: 8, key: "file_co_employment_3", label: "Co-applicant employment upload 3" },
  { slot: 9, key: "file_credit_1", label: "Credit report / screenshot 1" },
  { slot: 10, key: "file_credit_2", label: "Credit report / screenshot 2" },
] as const

export type RentalPdfEmbedPage = {
  slot: number
  filename: string
  buffer: Buffer
  contentType: string
}

export const RENTAL_FILE_KEY_TO_SLOT: Record<string, number> = Object.fromEntries(
  RENTAL_UPLOAD_SLOT_KEYS.map((x) => [x.key, x.slot]),
)

export function isRasterImageMime(mime: string): boolean {
  const m = mime.toLowerCase()
  return (
    m === "image/png" ||
    m === "image/jpeg" ||
    m === "image/jpg" ||
    m === "image/gif"
  )
}
