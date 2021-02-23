const base = require('@1stg/prettier-config')

module.exports = {
  ...base,
  overrides: [
    ...base.overrides,
    // for test cases
    {
      files: ['*.ng.html'],
      options: {
        parser: 'angular',
      },
    },
  ],
}
