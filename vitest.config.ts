import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    testTimeout: 15000,
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['lcov', 'json', 'text'],
    },
  },
})
