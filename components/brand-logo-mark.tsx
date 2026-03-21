import Image from "next/image"
import { cn } from "@/lib/utils"

const LOGO_PATH = "/pic/Logo1.png"

type BrandLogoMarkProps = {
  className?: string
}

/** Square brand mark — `public/pic/Logo1.png` on brand background `#6C1517`. */
export function BrandLogoMark({ className }: BrandLogoMarkProps) {
  return (
    <div
      className={cn(
        "relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#6C1517] shadow-sm",
        className,
      )}
    >
      <Image
        src={LOGO_PATH}
        alt="Deva Rentals"
        width={88}
        height={88}
        className="h-full w-full origin-top scale-[1.82] object-contain object-top"
        unoptimized
      />
    </div>
  )
}
