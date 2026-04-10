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
