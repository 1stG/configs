const fs = require('fs')
const path = require('path')

const BABEL_CONFIG = path.resolve('babel.config.js')

let configFile

try {
  configFile = fs.existsSync(BABEL_CONFIG)
    ? BABEL_CONFIG
    : require.resolve('@1stg/babel-preset/config')
} catch (e) {}

exports.js = {
  files: '*.{mjs,js,jsx}',
  parser: 'babel-eslint',
  parserOptions: configFile && {
    babelOptions: {
      configFile,
    },
  },
  plugins: ['babel'],
  rules: {
    'babel/new-cap': 2,
    'babel/camelcase': 2,
    'babel/no-invalid-this': 2,
    'babel/no-unused-expressions': 2,
    'babel/valid-typeof': 2,
  },
}

const BASE_TSCONFIG = path.resolve('tsconfig.base.json')
const DEFAULT_TSCONFIG = path.resolve('tsconfig.json')

exports.ts = {
  files: '*.{ts,tsx}',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: fs.existsSync(BASE_TSCONFIG)
      ? BASE_TSCONFIG
      : fs.existsSync(DEFAULT_TSCONFIG)
      ? DEFAULT_TSCONFIG
      : require.resolve('@1stg/tsconfig'),
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    '@typescript-eslint/adjacent-overload-signatures': 2,
    '@typescript-eslint/array-type': [
      2,
      {
        default: 'array-simple',
      },
    ],
    '@typescript-eslint/consistent-type-definitions': [2, 'interface'],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': [
      2,
      {
        accessibility: 'no-public',
        overrides: {
          parameterProperties: 'off',
        },
      },
    ],
    '@typescript-eslint/member-naming': [
      2,
      {
        private: '^_',
      },
    ],
    '@typescript-eslint/member-ordering': 2,
    '@typescript-eslint/no-empty-function': 2,
    '@typescript-eslint/no-extraneous-class': 2,
    '@typescript-eslint/no-floating-promises': 2,
    '@typescript-eslint/no-for-in-array': 2,
    '@typescript-eslint/no-misused-promises': 2,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-parameter-properties': 0,
    '@typescript-eslint/no-require-imports': 2,
    '@typescript-eslint/no-this-alias': [
      2,
      {
        allowDestructuring: true,
        allowedNames: ['self'],
      },
    ],
    '@typescript-eslint/no-type-alias': [
      2,
      {
        allowAliases: 'in-unions-and-intersections',
        allowCallbacks: 'always',
        allowLiterals: 'in-unions-and-intersections',
        allowMappedTypes: 'always',
      },
    ],
    '@typescript-eslint/no-unnecessary-qualifier': 2,
    '@typescript-eslint/no-unnecessary-type-arguments': 2,
    '@typescript-eslint/no-useless-constructor': 2,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/prefer-for-of': 2,
    '@typescript-eslint/prefer-function-type': 2,
    '@typescript-eslint/prefer-readonly': 2,
    '@typescript-eslint/restrict-plus-operands': 2,
    '@typescript-eslint/triple-slash-reference': [
      2,
      { types: 'prefer-import' },
    ],
    '@typescript-eslint/unbound-method': 2,
    '@typescript-eslint/unified-signatures': 2,
    'import/default': 0,
    'import/named': 0,
    'import/no-duplicates': 2,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'no-empty-function': 0,
    'no-useless-constructor': 0,
  },
}

let TSLINT_CONFIG = path.resolve('tslint.json')

try {
  TSLINT_CONFIG = fs.existsSync(TSLINT_CONFIG)
    ? TSLINT_CONFIG
    : require.resolve('@1stg/tslint-config')
} catch (e) {}

exports.tslint = {
  files: '*.{ts,tsx}',
  plugins: ['@typescript-eslint/tslint'],
  rules: {
    '@typescript-eslint/tslint/config': [
      2,
      TSLINT_CONFIG && {
        lintFile: TSLINT_CONFIG,
      },
    ],
  },
}

exports.react = {
  files: '*.{js,jsx,tsx}',
  extends: ['plugin:react/recommended', 'prettier/react'],
  settings: {
    react: {
      version: 'detect',
    },
  },
}

exports.reactHooks = {
  files: '*.{js,jsx,ts,tsx}',
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 2,
  },
}

exports.reactTs = {
  files: '*.{ts,tsx}',
  rules: {
    'no-restricted-imports': [2, 'prop-types'],
    'react/prop-types': 0,
  },
}

exports.dTs = {
  files: '*.d.ts',
  parserOptions: {
    project: null,
  },
  rules: {
    '@typescript-eslint/adjacent-overload-signatures': 0,
    '@typescript-eslint/await-thenable': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/no-unnecessary-qualifier': 0,
    '@typescript-eslint/no-unnecessary-type-arguments': 0,
    '@typescript-eslint/no-unnecessary-type-assertion': 0,
    '@typescript-eslint/prefer-regexp-exec': 0,
    '@typescript-eslint/prefer-includes': 0,
    '@typescript-eslint/prefer-readonly': 0,
    '@typescript-eslint/prefer-string-starts-ends-with': 0,
    '@typescript-eslint/require-await': 0,
    '@typescript-eslint/restrict-plus-operands': 0,
    '@typescript-eslint/unbound-method': 0,
    'import/no-duplicates': 0,
    'import/order': 0,
  },
}

exports.vue = {
  files: ['*.vue'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    // TODO: find out how to split .js and .ts files
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
  },
  extends: ['plugin:vue/recommended', 'prettier/vue'],
  plugins: ['vue'],
}

exports.mdx = Object.assign({}, exports.react, {
  files: ['*.mdx'],
  extends: exports.react.extends.concat([
    'plugin:mdx/recommended',
    'plugin:mdx/overrides',
  ]),
})

exports.jest = {
  files: '*.{spec,test}.{js,jsx,ts,tsx}',
  extends: ['plugin:jest/recommended'],
}

let tslint = false

try {
  require.resolve('tslint')
  tslint = true
} catch (e) {}

exports.overrides = [
  exports.js,
  exports.ts,
  exports.react,
  exports.reactHooks,
  exports.reactTs,
  exports.dTs,
  exports.vue,
  exports.mdx,
  exports.jest,
]

if (!tslint) {
  exports.overrides.push(exports.tslint)
}
