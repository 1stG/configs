const { preferPrettier } = require('@1stg/config')
const { isPkgAvailable } = require('@pkgr/utils')

const disablePrettierOptions = {
  rules: {
    'prettier/prettier': null,
  },
}

const eslintPrettierOptions =
  !preferPrettier && isPkgAvailable('eslint') && disablePrettierOptions

module.exports = loose => ({
  ...require('./base'),
  overrides: [
    {
      files: [
        '**/*.cjs',
        '**/*.cts',
        '**/*.js',
        '**/*.jsx',
        '**/*.mjs',
        '**/*.mts',
        '**/*.ts',
        '**/*.tsx',
      ],
      customSyntax: '@stylelint/postcss-css-in-js',
      ...eslintPrettierOptions,
    },
    {
      files: ['**/*.md', '**/*.mdx'],
      customSyntax: 'postcss-markdown',
      ...eslintPrettierOptions,
    },
    {
      files: ['**/*.html', '**/*.svelte', '**/*.vue'],
      customSyntax: 'postcss-html',
      ...eslintPrettierOptions,
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
    },
  ],
})
