"use client"

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react"
import SignaturePad from "signature_pad"
import { Button } from "@/components/ui/button"

export type SignaturePadFieldHandle = {
  isEmpty: () => boolean
  getPngBlob: () => Promise<Blob | null>
  clear: () => void
}

type SignaturePadFieldProps = {
  /** When false, pad is torn down (e.g. wizard step hidden) so size is correct when true. */
  active: boolean
  className?: string
  "aria-label"?: string
}

export const SignaturePadField = forwardRef<
  SignaturePadFieldHandle,
  SignaturePadFieldProps
>(function SignaturePadField(
  { active, className, "aria-label": ariaLabel },
  ref,
) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const padRef = useRef<SignaturePad | null>(null)

  useEffect(() => {
    if (!active) {
      padRef.current?.off()
      padRef.current = null
      return
    }

    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    let cancelled = false
    let attempts = 0

    const mountPad = () => {
      if (cancelled) return
      const w = wrap.clientWidth
      const h = wrap.clientHeight
      if (w < 8 || h < 8) {
        attempts += 1
        if (attempts < 30) {
          requestAnimationFrame(mountPad)
        }
        return
      }

      padRef.current?.off()

      const ratio = Math.max(window.devicePixelRatio || 1, 1)
      canvas.width = Math.floor(w * ratio)
      canvas.height = Math.floor(h * ratio)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.scale(ratio, ratio)
      }

      const pad = new SignaturePad(canvas, {
        penColor: "#292524",
        backgroundColor: "rgb(255,255,255)",
        minWidth: 0.5,
        maxWidth: 2.75,
      })
      padRef.current = pad
    }

    const id = requestAnimationFrame(() => requestAnimationFrame(mountPad))

    return () => {
      cancelled = true
      cancelAnimationFrame(id)
      padRef.current?.off()
      padRef.current = null
    }
  }, [active])

  useImperativeHandle(ref, () => ({
    isEmpty: () => padRef.current?.isEmpty() ?? true,
    getPngBlob: async () => {
      const pad = padRef.current
      if (!pad || pad.isEmpty()) return null
      const dataUrl = pad.toDataURL("image/png")
      const res = await fetch(dataUrl)
      return res.blob()
    },
    clear: () => padRef.current?.clear(),
  }))

  return (
    <div className={className}>
      <div
        ref={wrapRef}
        className="relative h-40 w-full overflow-hidden rounded-md border border-[#d4c5b0] bg-white touch-none"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full cursor-crosshair touch-none"
          aria-label={ariaLabel ?? "Draw your signature"}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute bottom-1 right-1 h-7 text-xs text-[#57534e] hover:text-[#8B2332]"
          onClick={() => padRef.current?.clear()}
        >
          Clear
        </Button>
      </div>
    </div>
  )
})
