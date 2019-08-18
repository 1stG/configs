module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'standard',
    'plugin:prettier/recommended',
    'prettier/standard',
  ],
  plugins: ['standard', 'prettier'],
  rules: {
    'import/order': [
      2,
      {
        'newlines-between': 'always',
      },
    ],
    'no-empty': [
      2,
      {
        allowEmptyCatch: true,
      },
    ],
    'no-empty-function': 2,
    'prefer-const': 2,
  },
}
