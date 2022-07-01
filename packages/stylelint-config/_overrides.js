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
    },
    {
      files: ['**/*.md', '**/*.mdx'],
      customSyntax: 'postcss-markdown',
    },
    {
      files: ['**/*.html', '**/*.svelte', '**/*.vue'],
      customSyntax: 'postcss-html',
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
