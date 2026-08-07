import { describe, it, expect } from "vitest"
import { formatNumber, isValidNumber, parseNumber } from "./numbers.ts"

describe("formatNumber()", () => {
  it("keeps clean inputs unchanged", () => {
    expect(formatNumber("")).toBe("")
    expect(formatNumber("123456")).toBe("123456")
    expect(formatNumber("1.234,56")).toBe("1.234,56")
  })

  it("keeps digits, dots, and commas, but removes everything else", () => {
    expect(formatNumber("€ 1.234,56")).toBe("1.234,56")
    expect(formatNumber("$12,345.67")).toBe("12,345.67")
    expect(formatNumber("1.234,56€")).toBe("1.234,56")
    expect(formatNumber("abc123def")).toBe("123")
    expect(formatNumber("tax: 99,50%")).toBe("99,50")
    expect(formatNumber("#12.34?")).toBe("12.34")
    expect(formatNumber(" -1 234,50 ")).toBe("1234,50")
  })
})

describe("isValidNumber()", () => {
  it("accepts numbers with optional thousand dots and optional decimal comma", () => {
    expect(isValidNumber("0")).toBe(true)
    expect(isValidNumber("123")).toBe(true)
    expect(isValidNumber("1.234")).toBe(true)
    expect(isValidNumber("1.234.567")).toBe(true)
    expect(isValidNumber("1234,56")).toBe(true)
    expect(isValidNumber("12,3")).toBe(true)
    expect(isValidNumber("123,")).toBe(true)
  })

  it("rejects invalid formats and characters", () => {
    expect(isValidNumber("")).toBe(false)
    expect(isValidNumber(".123")).toBe(false)
    expect(isValidNumber(",123")).toBe(false)
    expect(isValidNumber("-123")).toBe(false)
    expect(isValidNumber("1,234.56")).toBe(false)
    expect(isValidNumber("12 34")).toBe(false)
    expect(isValidNumber("abc")).toBe(false)
    expect(isValidNumber("abc123")).toBe(false)
  })
})

describe("parseNumber()", () => {
  it("returns NaN for invalid inputs", () => {
    expect(parseNumber("")).toBe(NaN)
    expect(parseNumber("-1")).toBe(NaN)
    expect(parseNumber("1,234.56")).toBe(NaN)
    expect(parseNumber("abc")).toBe(NaN)
    expect(parseNumber("abc123")).toBe(NaN)
  })

  it("parses valid numbers using comma as decimal separator", () => {
    expect(parseNumber("0")).toBe(0)
    expect(parseNumber("123")).toBe(123)
    expect(parseNumber("12,3")).toBe(12.3)
    expect(parseNumber("1234,56")).toBe(1234.56)
    expect(parseNumber("123,")).toBe(123)
  })

  it("ignores dots", () => {
    expect(parseNumber("1.23.45.67")).toBe(1234567)
    expect(parseNumber("1.234.567")).toBe(1234567)
    expect(parseNumber("1.234,56")).toBe(1234.56)
  })
})
