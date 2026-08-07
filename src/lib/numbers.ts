const formatter = Intl.NumberFormat("de-DE")

export function formatNumber(value: string | number): string {
  if (typeof value === "number") {
    return formatter.format(value)
  }

  return value.replaceAll(/[^.,0-9]/g, "")
}

export function isValidNumber(value: string): boolean {
  return !!value.match(/^[0-9][.0-9]*(,[0-9]*)?$/g)
}

export function parseNumber(value: string): number {
  if (!isValidNumber(value)) return NaN

  const sanitized = value.replaceAll(/[^,0-9]/g, "").replaceAll(",", ".")
  return parseFloat(sanitized)
}
