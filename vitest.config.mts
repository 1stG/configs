import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.spec.js', 'tests/**/*.spec.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['lcov', 'json'],
    },
  },
})
