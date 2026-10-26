import { defineConfig } from '@1stg/nano-staged'

export default defineConfig({
  commands: {
    oxfmt:
      'oxfmt --ignore-path .gitignore --ignore-path .prettierignore --ignore-path .oxfmtignore',
  },
  formatter: 'both',
  linter: 'oxlint',
  stylelint: true,
  typecheck: 'tsc',
  typeCoverage: true,
})
