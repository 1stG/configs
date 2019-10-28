module.exports = {
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export', 'local', 'global'],
      },
    ],
  },
}
