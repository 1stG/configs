const { isPkgAvailable } = require('@pkgr/utils')

const withEslintOptions = isPkgAvailable('eslint') && {
  rules: {
    'prettier/prettier': null,
  },
}

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
      ...withEslintOptions,
    },
    {
      files: ['**/*.md', '**/*.mdx'],
      customSyntax: 'postcss-markdown',
      ...withEslintOptions,
    },
    {
      files: ['**/*.html', '**/*.svelte', '**/*.vue'],
      customSyntax: 'postcss-html',
      ...withEslintOptions,
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
