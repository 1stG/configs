module.exports = loose => ({
  ...require('./base'),
  overrides: [
    {
      files: [
        '**/*.js',
        '**/*.jsx',
        '**/*.cjs',
        '**/*.mjs',
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
      files: ['**/*.scss'],
      ...(loose ? require('./scss/loose') : require('./scss')),
    },
  ],
})
