import { defineConfig } from "oxlint"

export default defineConfig({
  plugins: ["eslint", "typescript", "unicorn", "oxc", "promise", "vitest", "vue"],
  env: {
    browser: true,
  },
  categories: {
    correctness: "error",
  },
})
