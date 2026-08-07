import { describe, it, expect } from "vitest"

import { formatCurrency } from "./currency.ts"

describe("formatCurrency()", () => {
  it("formats positive integers with two decimals and thousand separators", () => {
    expect(formatCurrency(0)).toBe("0,00\u00A0€")
    expect(formatCurrency(1234)).toBe("1.234,00\u00A0€")
    expect(formatCurrency(1234567)).toBe("1.234.567,00\u00A0€")
  })

  it("formats positive decimals with comma and two decimals", () => {
    expect(formatCurrency(1234.56)).toBe("1.234,56\u00A0€")
    expect(formatCurrency(9.99)).toBe("9,99\u00A0€")
    expect(formatCurrency(1000.1)).toBe("1.000,10\u00A0€")
  })

  it("formats negative numbers with leading minus sign", () => {
    expect(formatCurrency(-1234.56)).toBe("-1.234,56\u00A0€")
  })
})
