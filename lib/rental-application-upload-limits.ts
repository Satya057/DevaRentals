/** Max size for a single uploaded photo or PDF. */
export const RENTAL_MAX_BYTES_PER_FILE = 20 * 1024 * 1024

/** Max POST body size the server accepts (20 MB file + form fields). */
export const RENTAL_MAX_MULTIPART_TOTAL_BYTES = Math.floor(22 * 1024 * 1024)

/** Gmail rejects messages over ~25 MB — keep the whole email under this. */
export const RENTAL_MAX_EMAIL_BYTES = Math.floor(20 * 1024 * 1024)

/** Room for the generated PDF when validating uploads in the browser. */
export const RENTAL_PDF_SIZE_ESTIMATE_BYTES = 1024 * 1024

/** Conservative estimate for two signature PNGs before we measure blobs. */
export const RENTAL_SIGNATURE_ESTIMATE_BYTES = 900 * 1024

/** Raster images larger than this are attached to email only (not embedded in PDF). */
export const RENTAL_PDF_MAX_EMBED_IMAGE_BYTES = 2 * 1024 * 1024

export function rentalUploadSizeErrorMessage(): string {
  const totalMb =
    Math.round((RENTAL_MAX_EMAIL_BYTES / 1024 / 1024) * 10) / 10
  const perMb =
    Math.round((RENTAL_MAX_BYTES_PER_FILE / 1024 / 1024) * 10) / 10
  return `The files you added are a bit too big to email. Please keep each photo or PDF under about ${perMb} MB, and all attachments together under about ${totalMb} MB (Gmail limit). Use your phone’s “medium” photo quality, resize images, or use a free compressor—then try submitting again.`
}

export function rentalEmailSizeErrorMessage(): string {
  const totalMb =
    Math.round((RENTAL_MAX_EMAIL_BYTES / 1024 / 1024) * 10) / 10
  return `We couldn’t send your application — the total size is over Gmail’s limit (about ${totalMb} MB). Please compress your photos or upload fewer files, then submit again.`
}

export function totalRentalEmailBudgetForFiles(signatureBytes?: number): number {
  return (
    RENTAL_MAX_EMAIL_BYTES -
    RENTAL_PDF_SIZE_ESTIMATE_BYTES -
    (signatureBytes ?? RENTAL_SIGNATURE_ESTIMATE_BYTES)
  )
}

/**
 * Run before POST so users see a clear message instead of HTTP 413.
 * Pass exact `signatureBytes` after capturing PNGs for a precise total.
 */
export function validateRentalUploadSizes(
  form: HTMLFormElement,
  signatureBytes?: number,
): string | null {
  let fileSum = 0
  for (const el of form.querySelectorAll<HTMLInputElement>('input[type="file"]')) {
    for (const f of el.files ?? []) {
      if (f.size > RENTAL_MAX_BYTES_PER_FILE) {
        return `“${f.name}” is larger than we can accept for one file (about ${Math.round((RENTAL_MAX_BYTES_PER_FILE / 1024 / 1024) * 10) / 10} MB max). Try a smaller photo or a lower scan quality.`
      }
      fileSum += f.size
    }
  }
  const sig = signatureBytes ?? RENTAL_SIGNATURE_ESTIMATE_BYTES
  const fileBudget = totalRentalEmailBudgetForFiles(sig)
  if (fileSum > fileBudget) {
    return rentalUploadSizeErrorMessage()
  }
  if (fileSum + sig > RENTAL_MAX_MULTIPART_TOTAL_BYTES) {
    return rentalUploadSizeErrorMessage()
  }
  return null
}
