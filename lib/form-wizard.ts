const STEP_FIELD_SELECTOR =
  "input:not([type=hidden]), textarea" as const

/** True if every required native field in the step subtree is valid (no UI). */
export function stepFieldsAreValid(root: HTMLElement | null): boolean {
  if (!root) return true
  const candidates = root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
    STEP_FIELD_SELECTOR,
  )
  for (const el of candidates) {
    if (!el.required) continue
    if (!el.checkValidity()) return false
  }
  return true
}

/** Validates required native inputs/textareas inside a step container (multi-step forms). */
export function validateStepNativeFields(root: HTMLElement | null): boolean {
  if (!root) return true
  const candidates = root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
    STEP_FIELD_SELECTOR,
  )
  for (const el of candidates) {
    if (!el.required) continue
    if (!el.checkValidity()) {
      el.reportValidity()
      el.focus()
      return false
    }
  }
  return true
}

/** Human-readable labels for invalid required native fields (for summary UI). */
export function collectInvalidRequiredFieldLabels(root: HTMLElement | null): string[] {
  if (!root) return []
  const out: string[] = []
  const seen = new Set<string>()

  const labelForControl = (el: HTMLInputElement | HTMLTextAreaElement): string => {
    if (el.id) {
      try {
        const forLab = root.querySelector(`label[for="${CSS.escape(el.id)}"]`)
        const t = forLab?.textContent?.replace(/\s*\*+\s*/g, "").trim()
        if (t) return t
      } catch {
        /* ignore invalid id selector */
      }
    }
    const wrap = el.parentElement
    if (wrap) {
      const lab = wrap.querySelector(":scope > label")
      const t = lab?.textContent?.replace(/\s*\*+\s*/g, "").trim()
      if (t) return t
    }
    const ph = el.getAttribute("placeholder")?.trim()
    if (ph) return ph
    if (el.name) return el.name.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()).trim()
    return "Required field"
  }

  const candidates = root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
    STEP_FIELD_SELECTOR,
  )
  for (const el of candidates) {
    if (!el.required) continue
    if (!el.checkValidity()) {
      const text = labelForControl(el)
      if (!seen.has(text)) {
        seen.add(text)
        out.push(text)
      }
    }
  }
  return out
}

/** Radix Checkbox: must be checked (e.g. terms agreement). */
export function validateRadixCheckboxChecked(
  root: HTMLElement | null,
  checkboxId: string,
): boolean {
  if (!root) return true
  const box = root.querySelector<HTMLElement>(`#${checkboxId}`)
  if (!box) return true
  if (box.getAttribute("data-state") !== "checked") {
    box.focus()
    return false
  }
  return true
}
