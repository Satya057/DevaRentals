const MAX_IMAGE_DIMENSION = 2048
const JPEG_QUALITY = 0.82
/** Skip compression for images already under this size. */
const SKIP_IMAGE_BELOW_BYTES = 450 * 1024
/** Videos at or under this size are left as-is. */
const SKIP_VIDEO_BELOW_BYTES = 40 * 1024 * 1024
/** When a clip is over the skip size, re-encode toward this payload. */
const TARGET_VIDEO_BYTES = 40 * 1024 * 1024
export const MAX_SERVICE_ATTACHMENT_BYTES = 40 * 1024 * 1024

export type CompressUploadOptions = {
  onProgress?: (ratio: number) => void
  signal?: AbortSignal
}

function outputName(original: string): string {
  const base = original.replace(/\.[^.]+$/, "") || "upload"
  return `${base}.jpg`
}

export function formatBytes(n: number): string {
  if (n < 1024 * 1024) return `${Math.max(1, Math.round(n / 1024))} KB`
  return `${(n / (1024 * 1024)).toFixed(1)} MB`
}

function isVideoFile(file: File): boolean {
  if (file.type.startsWith("video/")) return true
  return /\.(mp4|mov|webm|m4v|avi|mkv|3gp|hevc|qt)$/i.test(file.name)
}

function throwIfAborted(signal?: AbortSignal) {
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError")
}

function pickVideoRecorderMime(): { mimeType: string; extension: string } {
  const options = [
    { mimeType: "video/webm;codecs=vp9,opus", extension: "webm" },
    { mimeType: "video/webm;codecs=vp8,opus", extension: "webm" },
    { mimeType: "video/webm;codecs=vp9", extension: "webm" },
    { mimeType: "video/webm;codecs=vp8", extension: "webm" },
    { mimeType: "video/webm", extension: "webm" },
    { mimeType: "video/mp4;codecs=avc1,mp4a.40.2", extension: "mp4" },
    { mimeType: "video/mp4", extension: "mp4" },
  ]
  const found = options.find((o) =>
    typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(o.mimeType),
  )
  return found ?? { mimeType: "", extension: "webm" }
}

function even(n: number): number {
  const v = Math.max(2, Math.round(n))
  return v % 2 === 0 ? v : v - 1
}

function targetSize(origW: number, origH: number, durationSec: number, fileBytes: number) {
  const longOrHuge = durationSec > 180 || fileBytes > 80 * 1024 * 1024
  const maxW = longOrHuge ? 1280 : 1920
  let width = origW
  let height = origH
  if (width > maxW) {
    height = (height * maxW) / width
    width = maxW
  }
  return { width: even(width), height: even(height) }
}

function videoBitrate(durationSec: number): number {
  const duration = Math.max(durationSec, 1)
  const audioBps = 64_000
  const totalBps = (TARGET_VIDEO_BYTES * 8) / duration
  return Math.round(Math.min(16_000_000, Math.max(400_000, totalBps - audioBps)))
}

async function compressImageFile(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") {
    return file
  }
  if (file.size <= SKIP_IMAGE_BELOW_BYTES) {
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

async function waitForVideoMetadata(video: HTMLVideoElement, signal?: AbortSignal): Promise<void> {
  if (video.readyState >= 1 && video.videoWidth > 0) return
  await new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      cleanup()
      reject(new Error("Timed out reading video"))
    }, 20000)
    const onAbort = () => {
      cleanup()
      reject(new DOMException("Aborted", "AbortError"))
    }
    const cleanup = () => {
      window.clearTimeout(timeout)
      video.removeEventListener("loadedmetadata", onMeta)
      video.removeEventListener("error", onErr)
      signal?.removeEventListener("abort", onAbort)
    }
    const onMeta = () => {
      cleanup()
      resolve()
    }
    const onErr = () => {
      cleanup()
      reject(new Error("Could not read video"))
    }
    video.addEventListener("loadedmetadata", onMeta)
    video.addEventListener("error", onErr)
    signal?.addEventListener("abort", onAbort)
  })
}

async function compressVideoFile(
  file: File,
  options?: CompressUploadOptions,
): Promise<File> {
  if (file.size <= SKIP_VIDEO_BELOW_BYTES) {
    options?.onProgress?.(1)
    return file
  }
  if (typeof MediaRecorder === "undefined" || typeof document === "undefined") {
    return file
  }

  throwIfAborted(options?.signal)
  options?.onProgress?.(0.02)

  const url = URL.createObjectURL(file)
  const video = document.createElement("video")
  video.playsInline = true
  video.preload = "auto"
  video.controls = false
  video.muted = true
  video.setAttribute("playsinline", "true")
  video.style.position = "fixed"
  video.style.left = "-9999px"
  video.style.width = "2px"
  video.style.height = "2px"
  document.body.appendChild(video)
  video.src = url

  let audioContext: AudioContext | null = null

  const cleanup = () => {
    try {
      video.pause()
    } catch {
      /* ignore */
    }
    video.removeAttribute("src")
    video.load()
    video.remove()
    URL.revokeObjectURL(url)
    void audioContext?.close().catch(() => {})
  }

  try {
    await waitForVideoMetadata(video, options?.signal)
    throwIfAborted(options?.signal)

    try {
      await video.play()
      video.pause()
      video.currentTime = 0
    } catch {
      /* some browsers still expose dimensions without play */
    }

    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0
    const origW = video.videoWidth || 1280
    const origH = video.videoHeight || 720
    if (!origW || !origH) return file

    const { width, height } = targetSize(origW, origH, duration, file.size)
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return file

    const fps = 24
    if (typeof canvas.captureStream !== "function") return file
    const canvasStream = canvas.captureStream(fps)

    try {
      const AC = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (AC) {
        audioContext = new AC()
        if (audioContext.state === "suspended") await audioContext.resume()
        video.muted = false
        video.volume = 1
        const src = audioContext.createMediaElementSource(video)
        const dest = audioContext.createMediaStreamDestination()
        src.connect(dest)
        const audioTrack = dest.stream.getAudioTracks()[0]
        if (audioTrack) canvasStream.addTrack(audioTrack)
      }
    } catch {
      video.muted = true
    }

    const { mimeType, extension } = pickVideoRecorderMime()
    const bitsPerSecond = videoBitrate(duration || 30)
    const recorder = mimeType
      ? new MediaRecorder(canvasStream, { mimeType, videoBitsPerSecond: bitsPerSecond, audioBitsPerSecond: 64_000 })
      : new MediaRecorder(canvasStream, { videoBitsPerSecond: bitsPerSecond, audioBitsPerSecond: 64_000 })

    const chunks: Blob[] = []
    recorder.ondataavailable = (ev) => {
      if (ev.data && ev.data.size > 0) chunks.push(ev.data)
    }

    const recorded = new Promise<Blob>((resolve, reject) => {
      recorder.onstop = () => {
        resolve(new Blob(chunks, { type: recorder.mimeType || mimeType || "video/webm" }))
      }
      recorder.onerror = () => reject(new Error("Video compression failed"))
    })

    let drawing = true
    const draw = () => {
      if (!drawing) return
      ctx.drawImage(video, 0, 0, width, height)
      if (duration > 0) {
        options?.onProgress?.(Math.min(0.95, video.currentTime / duration))
      }
      requestAnimationFrame(draw)
    }

    const stopRecording = () => {
      drawing = false
      ctx.drawImage(video, 0, 0, width, height)
      if (recorder.state === "recording") {
        recorder.requestData()
        recorder.stop()
      }
    }

    const onEnded = () => stopRecording()
    video.addEventListener("ended", onEnded, { once: true })

    const abortTimer = window.setTimeout(
      () => stopRecording(),
      Math.max(20_000, (duration || 30) * 1000 + 15_000),
    )

    const onAbort = () => {
      window.clearTimeout(abortTimer)
      video.removeEventListener("ended", onEnded)
      try {
        video.pause()
      } catch {
        /* ignore */
      }
      stopRecording()
    }
    options?.signal?.addEventListener("abort", onAbort)

    video.currentTime = 0
    try {
      await video.play()
    } catch {
      video.muted = true
      await video.play()
    }

    recorder.start(250)
    draw()

    const blob = await recorded
    window.clearTimeout(abortTimer)
    options?.signal?.removeEventListener("abort", onAbort)
    canvasStream.getTracks().forEach((t) => t.stop())
    throwIfAborted(options?.signal)

    options?.onProgress?.(1)
    if (!blob.size) return file
    if (blob.size >= file.size * 0.95 && file.size <= MAX_SERVICE_ATTACHMENT_BYTES) {
      return file
    }

    const base = file.name.replace(/\.[^.]+$/, "") || "video"
    return new File([blob], `${base}-compressed.${extension}`, {
      type: blob.type || (extension === "mp4" ? "video/mp4" : "video/webm"),
      lastModified: Date.now(),
    })
  } finally {
    cleanup()
  }
}

/**
 * Resize photos and re-encode large videos in the browser so uploads stay under email limits.
 * PDFs, documents, GIFs, and already-small media are returned unchanged.
 */
export async function compressUploadFile(
  file: File,
  options?: CompressUploadOptions,
): Promise<File> {
  try {
    throwIfAborted(options?.signal)
    if (isVideoFile(file)) {
      return await compressVideoFile(file, options)
    }
    const out = await compressImageFile(file)
    options?.onProgress?.(1)
    return out
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err
    console.warn("[compress-upload]", err)
    return file
  }
}

export async function compressUploadFiles(files: File[]): Promise<File[]> {
  return Promise.all(files.map((file) => compressUploadFile(file)))
}
