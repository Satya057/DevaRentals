import Image from "next/image"
import { cn } from "@/lib/utils"

/** Main site logo — same file as favicon (`public/rental-dv-logo.jpg`) */
const LOGO_PATH = "/rental-dv-logo.jpg"

type BrandLogoMarkProps = {
  className?: string
  /** LCP: set on header instance only */
  priority?: boolean
}

export function BrandLogoMark({ className, priority = false }: BrandLogoMarkProps) {
  return (
    <div
      className={cn(
        "relative flex h-12 max-h-12 w-auto max-w-[min(15rem,52vw)] shrink-0 items-center justify-center overflow-hidden rounded-md",
        className,
      )}
    >
      <Image
        src={LOGO_PATH}
        alt="Deva Rentals"
        width={280}
        height={112}
        className="h-12 w-auto max-h-12 object-contain object-left"
        unoptimized
        priority={priority}
      />
    </div>
  )
}
