import { defineConfig } from "oxlint"

export default defineConfig({
  plugins: ["eslint", "typescript", "unicorn", "oxc", "vue"],
  env: {
    browser: true,
  },
  categories: {
    correctness: "error",
  },
})
