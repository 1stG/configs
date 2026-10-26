import { defineConfig } from '@1stg/nano-staged'

export default defineConfig({
  formatter: 'both',
  linter: 'oxlint',
  stylelint: true,
  typecheck: 'tsc',
  typeCoverage: true,
})
