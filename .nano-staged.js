import { defineConfig } from '@1stg/nano-staged'

export default defineConfig({
  linter: 'both',
  stylelint: true,
  typecheck: 'tsc',
  typeCoverage: true,
})
