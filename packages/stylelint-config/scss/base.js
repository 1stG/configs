module.exports = {
  customSyntax: 'postcss-scss',
  plugins: ['stylelint-scss'],
  rules: {
    'at-rule-no-unknown': null,
    'function-no-unknown': null,
    'scss/at-each-key-value-single-line': true,
    'scss/at-import-no-partial-leading-underscore': true,
    'scss/at-import-partial-extension-blacklist': ['sass', 'scss'],
    'scss/at-mixin-argumentless-call-parentheses': 'never',
    'scss/at-rule-no-unknown': true,
    'scss/comment-no-empty': true,
    'scss/dollar-variable-default': [
      true,
      {
        ignore: 'local',
      },
    ],
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/declaration-nested-properties': [
      'always',
      {
        except: 'only-of-namespace',
      },
    ],
    'scss/declaration-nested-properties-no-divided-groups': true,
    'scss/function-no-unknown': true,
    'scss/media-feature-value-dollar-variable': 'always',
    'scss/no-duplicate-dollar-variables': [
      true,
      {
        ignoreInsideAtRules: ['if', 'else'],
      },
    ],
    'scss/operator-no-unspaced': true,
    'scss/selector-nest-combinators': 'always',
    'scss/selector-no-redundant-nesting-selector': true,
  },
}
