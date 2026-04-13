import { cn } from "@/lib/utils"

type FormStepProgressProps = {
  step: number
  stepTitles: string[]
  /** Default "Step"; rental form uses "Section". */
  stepLabel?: "Step" | "Section"
  className?: string
  /** Extra aria-label for the progress region (e.g. form name). */
  ariaLabel?: string
}

/**
 * Progress bars + label under each segment so users see upcoming steps from step 1.
 */
export function FormStepProgress({
  step,
  stepTitles,
  stepLabel = "Step",
  className,
  ariaLabel,
}: FormStepProgressProps) {
  const n = stepTitles.length

  return (
    <div className={cn("space-y-2 border-b border-[#d4c5b0]/60 pb-3", className)}>
      <p className="text-sm font-medium text-[#333]">
        {stepLabel} {step + 1} of {n}
        <span className="font-normal text-muted-foreground"> — {stepTitles[step]}</span>
      </p>

      <div
        className="grid gap-x-1.5 gap-y-0.5"
        style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={n}
        aria-label={ariaLabel}
      >
        {stepTitles.map((title, i) => (
          <div key={i} className="flex min-w-0 flex-col gap-1.5">
            <span
              className={cn(
                "h-1.5 w-full shrink-0 rounded-full transition-colors duration-300",
                i <= step ? "bg-[#8B2332]" : "bg-[#d4c5b0]/80",
              )}
              aria-hidden
            />
            <span
              className={cn(
                "hyphens-auto text-center text-[10px] leading-snug sm:text-xs",
                i === step && "font-normal text-[#1c1917]",
                i < step && "text-muted-foreground line-through decoration-muted-foreground/40",
                i > step && "text-muted-foreground",
              )}
            >
              <span className="sr-only">
                {stepLabel} {i + 1}:{" "}
              </span>
              {title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
