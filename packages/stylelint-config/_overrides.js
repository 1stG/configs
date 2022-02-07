module.exports = loose => ({
  ...require('./base'),
  overrides: [
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
