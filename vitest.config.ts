import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    // Babel 8 is ESM only, so the first transform pays for loading the whole
    // plugin graph plus `core-js-compat`, which does not fit in the 5s default.
    testTimeout: 30_000,
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['lcov', 'json', 'text'],
    },
  },
})
