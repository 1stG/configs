const fs = require('fs')
const { resolve } = require('path')

const {
  identity,
  isMonorepo,
  isNgAvailable,
  isSrcDirAvailable,
  isSrcAppDirAvailable,
  isWebpackAvailable,
  magicNumbers,
  webpackSpecVars,
} = require('./_util')

const BABEL_CONFIG = resolve('babel.config.js')
const BABEL_RC_CONFIG = resolve('.babelrc.js')

let configFile

try {
  configFile = fs.existsSync(BABEL_CONFIG)
    ? BABEL_CONFIG
    : fs.existsSync(BABEL_RC_CONFIG)
    ? BABEL_RC_CONFIG
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
    'node/no-unsupported-features/es-syntax': 0,
  },
}

const BASE_TSCONFIG = resolve('tsconfig.base.json')
const DEFAULT_TSCONFIG = resolve('tsconfig.json')

const PROJECT_TSCONFIG = fs.existsSync(BASE_TSCONFIG)
  ? BASE_TSCONFIG
  : fs.existsSync(DEFAULT_TSCONFIG)
  ? DEFAULT_TSCONFIG
  : undefined

const TS_CONFIGS = [
  PROJECT_TSCONFIG,
  isMonorepo && 'packages/**/tsconfig.json',
].filter(identity)

let project

try {
  project = TS_CONFIGS.length ? TS_CONFIGS : require.resolve('@1stg/tsconfig')
} catch (e) {}

const resolveSettings = {
  'import/resolver': {
    ts: {
      alwaysTryTypes: true,
      directory: TS_CONFIGS,
    },
  },
  node: {
    resolvePaths: [
      resolve('node_modules/@types'),
      isSrcDirAvailable && !isNgAvailable && resolve('src'),
      isNgAvailable && isSrcAppDirAvailable && resolve('src/app'),
    ].filter(identity),
    tryExtensions: [
      '.ts',
      '.tsx',
      '.d.ts',
      '.vue',
      '.mjs',
      '.js',
      '.jsx',
      '.json',
      '.node',
      '.mdx',
    ],
  },
}

const tsBase = {
  files: '*.{ts,tsx}',
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier/@typescript-eslint',
  ],
  settings: resolveSettings,
  rules: {
    '@typescript-eslint/adjacent-overload-signatures': 2,
    '@typescript-eslint/array-type': [
      2,
      {
        default: 'array-simple',
      },
    ],
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/camelcase': [
      2,
      {
        properties: 'never',
        ignoreDestructuring: true,
        allow: isWebpackAvailable && webpackSpecVars,
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
    '@typescript-eslint/no-for-in-array': 2,
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
    '@typescript-eslint/no-useless-constructor': 2,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/prefer-for-of': 2,
    '@typescript-eslint/prefer-function-type': 2,
    '@typescript-eslint/triple-slash-reference': [
      2,
      { types: 'prefer-import' },
    ],
    '@typescript-eslint/unified-signatures': 2,
    'import/default': 0,
    'import/named': 0,
    'import/no-duplicates': 2,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'no-empty-function': 0,
    'no-useless-constructor': 0,
    'node/no-unsupported-features/es-syntax': 0,
    // @typescript-eslint/no-floating-promises has already handled this case
    'promise/always-return': 0,
    'promise/catch-or-return': 0,
  },
}

exports.ts = [
  tsBase,
  {
    files: '*.{ts,tsx}',
    excludedFiles: '*.d.ts',
    parserOptions: {
      project,
    },
    extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
    rules: {
      '@typescript-eslint/no-floating-promises': [
        2,
        {
          ignoreVoid: true,
        },
      ],
      '@typescript-eslint/no-magic-numbers': [
        2,
        {
          enforceConst: true,
          ignore: magicNumbers,
          ignoreArrayIndexes: true,
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
        },
      ],
      '@typescript-eslint/no-unnecessary-condition': [
        2,
        {
          ignoreRhs: true,
        },
      ],
      '@typescript-eslint/no-unnecessary-qualifier': 2,
      '@typescript-eslint/no-unnecessary-type-arguments': 2,
      '@typescript-eslint/prefer-readonly': 2,
      '@typescript-eslint/restrict-plus-operands': 2,
      'no-constant-condition': 0,
      'no-magic-numbers': 0,
    },
  },
]

exports.dTs = {
  files: '*.d.ts',
  rules: {
    'import/no-duplicates': 0,
    'import/order': 0,
  },
}

let tslint = false

try {
  require.resolve('tslint')
  tslint = true
} catch (e) {}

const TSLINT_CONFIG = resolve('tslint.json')

let lintFile

try {
  lintFile = fs.existsSync(TSLINT_CONFIG)
    ? TSLINT_CONFIG
    : require.resolve('@1stg/tslint-config')
} catch (e) {}

exports.tslint = {
  files: '*.{ts,tsx}',
  excludedFiles: '*.d.ts',
  plugins: ['@typescript-eslint/tslint'],
  rules: {
    '@typescript-eslint/tslint/config': [
      2,
      {
        lintFile,
      },
    ],
    // `ordered-imports` of tslint is better for now
    'import/order': 0,
  },
}

exports.angular = [
  {
    files: '*.ts',
    rules: {
      '@typescript-eslint/member-naming': 0,
    },
  },
  {
    files: ['*.component.ts', '*.module.ts', 'component.ts', 'module.ts'],
    rules: {
      '@typescript-eslint/no-extraneous-class': 0,
    },
  },
]

exports.react = {
  files: '*.{js,jsx,tsx}',
  extends: [
    'standard-jsx', // for Vue
    'standard-react',
    'plugin:react/recommended',
    'prettier',
    'prettier/react',
  ],
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

exports.vue = Object.assign({}, tsBase, {
  files: ['*.vue'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
  },
  extends: tsBase.extends.concat('plugin:vue/recommended', 'prettier/vue'),
})

exports.mdx = Object.assign({}, exports.react, {
  files: '*.{md,mdx}',
  extends: exports.react.extends.concat(['plugin:mdx/recommended']),
  settings: Object.assign({}, exports.react.settings, resolveSettings),
  rules: {
    'node/no-unsupported-features/es-syntax': 0,
  },
})

exports.jest = {
  files: '*.{spec,test}.{js,jsx,ts,tsx}',
  extends: ['plugin:jest/recommended'],
}

exports.test = {
  files: '**/{test,tests}/**/*.{js,jsx,mdx,ts,tsx,vue}',
  rules: {
    'node/no-extraneous-import': 0,
    'node/no-extraneous-require': 0,
  },
}

exports.overrides = exports.ts
  .concat(
    exports.js,
    exports.dTs,
    tslint && lintFile && exports.tslint,
    exports.react,
    exports.reactHooks,
    exports.reactTs,
    isNgAvailable && exports.angular,
    exports.vue,
    exports.mdx,
    exports.jest,
    exports.test,
  )
  .filter(identity)
