const fs = require('fs')
const { resolve } = require('path')

const {
  isNgAvailable,
  isSrcDirAvailable,
  isSrcAppDirAvailable,
  isWebpackAvailable,
  magicNumbers,
  tryFile,
  webpackSpecVars,
} = require('./_util')

const BABEL_CONFIG = resolve('babel.config.js')
const BABEL_RC_CONFIG = resolve('.babelrc.js')

let configFile

try {
  configFile =
    tryFile(BABEL_CONFIG) ||
    tryFile(BABEL_RC_CONFIG) ||
    require.resolve('@1stg/babel-preset/config')
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
    camelcase: 0,
    'new-cap': 0,
    'no-invalid-this': 0,
    'no-unused-expressions': 0,
    'valid-typeof': 0,
    'babel/camelcase': 2,
    'babel/new-cap': 2,
    'babel/no-invalid-this': 2,
    'babel/no-unused-expressions': 2,
    'babel/valid-typeof': 2,
  },
}

const TS_CONFIGS = [
  tryFile(resolve('tsconfig.eslint.json')) ||
    tryFile(resolve('tsconfig.base.json')) ||
    tryFile(resolve('tsconfig.json')),
].filter(Boolean)

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
    ].filter(Boolean),
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
    '@typescript-eslint/no-use-before-define': [
      2,
      {
        classes: false,
        functions: false,
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
      {
        lib: 'never',
        path: 'always',
        types: 'prefer-import',
      },
    ],
    '@typescript-eslint/unified-signatures': 2,
    'import/default': 0,
    'import/named': 0,
    'import/no-duplicates': 2,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'no-empty-function': 0,
    'no-unused-vars': 0,
    'no-useless-constructor': 0,
    'node/no-missing-import': 0, // TypeScript itself has handle this
    'node/shebang': 0,
    // @typescript-eslint/no-floating-promises has already handled there case
    'promise/always-return': 0,
    'promise/catch-or-return': 0,
  },
}

exports.ts = [
  tsBase,
  {
    files: '{bin,cli}.ts',
    rules: {
      'node/shebang': 0,
    },
  },
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
    '@typescript-eslint/no-extraneous-class': 0,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'import/no-duplicates': 0,
    'import/order': 0,
    'node/no-extraneous-import': 0,
  },
}

let tslint = false

try {
  tslint = !!require.resolve('tslint')
} catch (e) {}

const TSLINT_CONFIG = resolve('tslint.json')
const tslintConfigAvailable = fs.existsSync(TSLINT_CONFIG)

let lintFile = tslintConfigAvailable ? TSLINT_CONFIG : undefined

try {
  lintFile = lintFile || require.resolve('@1stg/tslint-config')
} catch (e) {}

exports.tslint = {
  files: '*.{ts,tsx}',
  excludedFiles: '*.d.ts',
  plugins: tslintConfigAvailable ? ['@typescript-eslint/tslint'] : undefined,
  rules: Object.assign(
    {
      // `ordered-imports` of tslint is better for now
      'import/order': 0,
    },
    tslintConfigAvailable || {
      '@typescript-eslint/tslint/config': [
        2,
        {
          lintFile,
        },
      ],
    },
  ),
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

const reactJsx = {
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

exports.react = [
  Object.assign(
    {
      files: '*.{js,jsx,tsx}',
      rules: {
        'react/jsx-boolean-value': [2, 'always'],
        'react/jsx-handler-names': [
          2,
          {
            eventHandlerPrefix: false,
            eventHandlerPropPrefix: 'on',
          },
        ],
      },
    },
    reactJsx,
  ),
  {
    files: '*.tsx',
    rules: {
      'react/display-name': 0,
    },
  },
]

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

exports.mdx = Object.assign({}, reactJsx, {
  files: '*.{md,mdx}',
  extends: reactJsx.extends.concat(['plugin:mdx/recommended']),
  settings: Object.assign({}, reactJsx.settings, resolveSettings),
})

const nonSourceRules = {
  'node/no-extraneous-import': 0,
  'node/no-extraneous-require': 0,
  'node/no-unsupported-features/es-builtins': 0,
}

exports.test = {
  files: '**/{__test__,test,tests}/**/*.{js,jsx,mdx,ts,tsx,vue}',
  rules: nonSourceRules,
}

exports.jest = {
  files: '*.{spec,test}.{js,jsx,ts,tsx}',
  extends: ['plugin:jest/recommended'],
  rules: exports.test.rules,
}

exports.stories = {
  files: '**/stories/**/*.{js,jsx,mdx,ts,tsx,vue}',
  rules: nonSourceRules,
}

exports.config = {
  files: ['.*rc.js', '*.config.{js,ts}'],
  rules: nonSourceRules,
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
    exports.stories,
    exports.config,
  )
  .filter(Boolean)
