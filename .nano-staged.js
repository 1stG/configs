import { createStaged } from '@1stg/nano-staged'

export default createStaged({
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
