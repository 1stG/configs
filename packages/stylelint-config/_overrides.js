const { preferPrettier } = require('@1stg/config')
const { isPkgAvailable } = require('@pkgr/utils')

const disablePrettierOptions = !preferPrettier &&
  isPkgAvailable('eslint') && {
    rules: {
      'prettier/prettier': null,
    },
  }

module.exports = loose => ({
  ...require('./base'),
  overrides: [
    {
      files: ['**/*.md', '**/*.mdx'],
      customSyntax: 'postcss-markdown',
      ...disablePrettierOptions,
    },
    {
      files: ['**/*.html', '**/*.svelte', '**/*.vue'],
      customSyntax: 'postcss-html',
      ...disablePrettierOptions,
    },
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
    {
      files: ['**/*.sass', '**/*.scss'],
      ...(loose ? require('./scss/loose') : require('./scss')),
    },
    {
      files: ['**/*.styl', '**/*.stylus'],
      customSyntax: 'postcss-styl',
      extends: ['stylelint-stylus/standard', 'stylelint-prettier/recommended'],
      rules: {
        'function-no-unknown': null,
      },
    },
  ],
})
