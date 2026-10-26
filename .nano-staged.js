import { defineConfig } from '@1stg/nano-staged'

export default defineConfig({
  commands: {
    oxfmt: 'oxfmt -c oxfmt.config.mjs',
    oxlint: 'oxlint -c oxlint.config.mjs --fix',
  },
  formatter: 'both',
  linter: 'oxlint',
  stylelint: true,
  typecheck: 'tsc',
  typeCoverage: true,
})
