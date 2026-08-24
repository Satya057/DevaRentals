const MAX_IMAGE_DIMENSION = 2048
const JPEG_QUALITY = 0.82
/** Skip compression for images already under this size. */
const SKIP_BELOW_BYTES = 450 * 1024

function outputName(original: string): string {
  const base = original.replace(/\.[^.]+$/, "") || "upload"
  return `${base}.jpg`
}

/**
 * Resize and re-encode phone/camera photos so uploads and email attachments finish faster.
 * PDFs and small images are returned unchanged.
 */
export async function compressUploadFile(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") {
    return file
  }
  if (file.size <= SKIP_BELOW_BYTES) {
    return file
  }

  return new Promise((resolve) => {
    const url = URL.createObjectURL(file)
    const img = new Image()

    img.onload = () => {
      URL.revokeObjectURL(url)

      let { width, height } = img
      const maxDim = MAX_IMAGE_DIMENSION
      if (width > maxDim || height > maxDim) {
        if (width >= height) {
          height = Math.round((height * maxDim) / width)
          width = maxDim
        } else {
          width = Math.round((width * maxDim) / height)
          height = maxDim
        }
      }

      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        resolve(file)
        return
      }

      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        (blob) => {
          if (!blob || blob.size >= file.size * 0.95) {
            resolve(file)
            return
          }
          resolve(
            new File([blob], outputName(file.name), {
              type: "image/jpeg",
              lastModified: file.lastModified,
            }),
          )
        },
        "image/jpeg",
        JPEG_QUALITY,
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      resolve(file)
    }

    img.src = url
  })
}

export async function compressUploadFiles(files: File[]): Promise<File[]> {
  return Promise.all(files.map((file) => compressUploadFile(file)))
}
