/**
 * Vercel serverless (and similar) reject the whole POST with **413** if the multipart body is
 * larger than ~4.5 MB — before our route runs. Keep every file + signature PNGs under this budget.
 */
export const RENTAL_MAX_BYTES_PER_FILE = 1.8 * 1024 * 1024

/** Sum of all file inputs + signature blobs in one submit (leave headroom for multipart framing vs ~4.5 MB host cap). */
export const RENTAL_MAX_MULTIPART_TOTAL_BYTES = Math.floor(3.8 * 1024 * 1024)

/** Conservative estimate for two signature PNGs before we measure blobs. */
export const RENTAL_SIGNATURE_ESTIMATE_BYTES = 900 * 1024

export function rentalUploadSizeErrorMessage(): string {
  const totalMb = Math.round((RENTAL_MAX_MULTIPART_TOTAL_BYTES / 1024 / 1024) * 10) / 10
  const perMb = Math.round((RENTAL_MAX_BYTES_PER_FILE / 1024 / 1024) * 10) / 10
  return `The files you added are a bit too big to send all at once. Please keep each photo or PDF under about ${perMb} MB, and all attachments together under about ${totalMb} MB. You can use your phone’s “medium” photo quality, resize images, or use a free compressor—then try submitting again.`
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
  if (fileSum + sig > RENTAL_MAX_MULTIPART_TOTAL_BYTES) {
    return rentalUploadSizeErrorMessage()
  }
  return null
}
