/* eslint-disable sonarjs/no-duplicate-string */
const { resolve } = require('path')

const {
  isAngularAvailable,
  isReactAvailable,
  isPkgAvailable,
  isTsAvailable,
  isVueAvailable,
  tryFile,
  tryPkg,
} = require('@pkgr/utils')

const { camelCaseRule, magicNumbers } = require('./_util')

const configFile =
  tryFile(resolve('babel.config.js')) ||
  tryFile(resolve('.babelrc.js')) ||
  tryPkg('@1stg/babel-preset/config')

const jsBase = {
  files: '*.{mjs,js,jsx}',
  parser: 'babel-eslint',
  parserOptions: configFile && {
    babelOptions: {
      configFile,
    },
  },
  plugins: ['babel'],
  extends: ['prettier/babel'],
  rules: {
    camelcase: 0,
    'new-cap': 0,
    'no-invalid-this': 0,
    'no-unused-expressions': 0,
    'valid-typeof': 0,
    'babel/camelcase': [
      2,
      {
        properties: 'never',
        ignoreDestructuring: true,
      },
    ],
    'babel/new-cap': 2,
    'babel/no-invalid-this': 2,
    'babel/no-unused-expressions': 2,
    'babel/valid-typeof': 2,
  },
}

exports.js = jsBase

const project =
  tryFile(resolve('tsconfig.eslint.json')) ||
  tryFile(resolve('tsconfig.base.json')) ||
  tryFile(resolve('tsconfig.json')) ||
  tryPkg('@1stg/tsconfig')

const resolveSettings = {
  'import/external-module-folders': [
    'node_modules',
    'node_modules/@d-ts',
    'node_modules/@types',
  ],
  'import/resolver': {
    ts: {
      alwaysTryTypes: true,
      directory: project,
    },
  },
  node: {
    resolvePaths: [
      tryFile('node_modules/@d-ts', true),
      tryFile('node_modules/@types', true),
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
    '@typescript-eslint/camelcase': camelCaseRule,
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
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-extraneous-class': 0,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'import/no-duplicates': 0,
    'import/order': 0,
    'node/no-extraneous-import': 0,
  },
}

const TSLINT_CONFIG = tryFile(resolve('tslint.json'))
const lintFile = TSLINT_CONFIG || tryPkg('@1stg/tslint-config')

exports.tslint = {
  files: '*.{ts,tsx}',
  excludedFiles: '*.d.ts',
  plugins: TSLINT_CONFIG ? ['@typescript-eslint/tslint'] : undefined,
  rules: Object.assign(
    {
      // `ordered-imports` of tslint is better for now
      'import/order': 0,
    },
    TSLINT_CONFIG
      ? undefined
      : {
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

const vueExtends = ['plugin:vue/recommended', 'prettier', 'prettier/vue']

exports.vue = [
  Object.assign({}, jsBase, {
    parser: 'vue-eslint-parser',
    parserOptions: Object.assign({}, jsBase.parserOptions, {
      parser: jsBase.parser,
    }),
    extends: vueExtends,
  }),
  Object.assign({}, tsBase, {
    parser: 'vue-eslint-parser',
    files: '*.{vue,ts,tsx}',
    parserOptions: {
      parser: '@typescript-eslint/parser',
      extraFileExtensions: ['.vue'],
    },
    extends: tsBase.extends.concat(vueExtends),
  }),
]

exports.mdx = {
  files: '*.{md,mdx}',
  extends: reactJsx.extends.concat('plugin:mdx/recommended'),
  parserOptions: jsBase.parserOptions,
  settings: Object.assign({}, reactJsx.settings, resolveSettings),
}

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

exports.overrides = []
  .concat(
    isPkgAvailable('@babel/core') && exports.js,
    isTsAvailable && exports.ts,
    isPkgAvailable('tslint') && lintFile && exports.tslint,
    isReactAvailable && exports.react,
    isReactAvailable && exports.reactHooks,
    isReactAvailable && exports.reactTs,
    isVueAvailable && exports.vue,
    isAngularAvailable && exports.angular,
    exports.mdx,
    exports.jest,
    exports.test,
    exports.stories,
    exports.config,
    exports.dTs,
  )
  .filter(Boolean)
