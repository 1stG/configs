import { defineConfig } from '@1stg/nano-staged'

export default defineConfig({
  commands: {
    oxfmt: 'oxfmt -c oxfmt.config.js',
    oxlint: 'oxlint -c oxlint.config.js --fix',
  },
  formatter: 'both',
  linter: 'oxlint',
  stylelint: true,
  typecheck: 'tsc',
  typeCoverage: true,
})
