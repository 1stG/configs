const path = require('path')

const {
  isAngularAvailable,
  isReactAvailable,
  isPkgAvailable,
  isSvelteAvailable,
  isTsAvailable,
  isVueAvailable,
  tryFile,
  tryPkg,
  tryRequirePkg,
} = require('@pkgr/utils')

const { magicNumbers } = require('./_util')

const configFile =
  tryFile(path.resolve('babel.config.js')) ||
  tryFile(path.resolve('.babelrc.js')) ||
  tryPkg('@1stg/babel-preset/config')

const jsBase = {
  files: ['*.cjs', '*.mjs', '*.js', '*.jsx'],
  parser: '@babel/eslint-parser',
  parserOptions: configFile
    ? {
        babelOptions: {
          configFile,
        },
      }
    : {
        requireConfigFile: false,
      },
  plugins: ['@babel'],
  rules: {
    camelcase: [
      2,
      {
        properties: 'never',
        ignoreDestructuring: true,
      },
    ],
    'new-cap': 0,
    'no-invalid-this': 0,
    'no-unused-expressions': 0,
    '@babel/new-cap': 2,
    '@babel/no-invalid-this': 2,
    '@babel/no-unused-expressions': 2,
  },
}

exports.js = {
  ...jsBase,
  extends: ['plugin:jsdoc/recommended'],
  rules: {
    ...jsBase.rules,
    'jsdoc/require-jsdoc': 0,
    'jsdoc/require-param-description': 0,
  },
  settings: isTsAvailable
    ? {
        jsdoc: {
          mode: 'typescript',
        },
      }
    : undefined,
}

const project =
  tryFile(path.resolve('tsconfig.eslint.json')) ||
  tryFile(path.resolve('tsconfig.base.json')) ||
  tryFile(path.resolve('tsconfig.json')) ||
  tryPkg('@1stg/tsconfig')

const resolveSettings = {
  'import/external-module-folders': [
    'node_modules',
    'node_modules/@d-ts',
    'node_modules/@types',
  ],
  'import/resolver': {
    typescript: {
      alwaysTryTypes: true,
      project,
    },
  },
}

const tsBase = {
  files: ['*.ts', '*.tsx'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
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
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/ban-types': [
      2,
      {
        types: {
          object: false,
        },
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
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/member-ordering': 2,
    '@typescript-eslint/naming-convention': 0, // TODO: find better config
    '@typescript-eslint/no-empty-function': 2,
    '@typescript-eslint/no-extraneous-class': [
      2,
      {
        allowWithDecorator: true,
      },
    ],
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
    '@typescript-eslint/prefer-optional-chain': 2,
    '@typescript-eslint/prefer-ts-expect-error': 2,
    '@typescript-eslint/sort-type-union-intersection-members': 2,
    '@typescript-eslint/triple-slash-reference': [
      2,
      {
        lib: 'never',
        path: 'always',
        types: 'prefer-import',
      },
    ],
    '@typescript-eslint/unified-signatures': 2,
    camelcase: 0,
    'import/default': 0,
    'import/named': 0,
    'import/namespace': 0,
    'import/no-duplicates': 2,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'no-empty-function': 0,
    'no-restricted-syntax': [
      2,
      {
        selector:
          'TSTypeAliasDeclaration > .typeAnnotation[type=/^(TS.*Keyword|TSTypeReference)$/]:not(:has(TSTypeParameterInstantiation)):not(:has(TSQualifiedName))',
        message:
          'Type alias references simple `Ts*Keyword`s or `TSTypeReference` only is not allowed',
      },
    ],
    'no-unused-vars': 0,
    'no-use-before-define': 0,
    'no-useless-constructor': 0,
    'n/shebang': 0,
    // covered by @typescript-eslint/no-floating-promises
    'promise/always-return': 0,
    'promise/catch-or-return': 0,
    // ts itself has guaranteed it
    'unicorn/no-array-callback-reference': 0,
    // covered by @typescript-eslint/no-extraneous-class
    'unicorn/no-static-only-class': 0,
    // covered by @typescript-eslint/no-this-alias
    'unicorn/no-this-assignment': 0,
  },
}

exports.ts = [
  tsBase,
  {
    files: '{bin,cli}.ts',
    rules: {
      'n/shebang': 0,
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
      '@typescript-eslint/no-unnecessary-condition': 2,
      '@typescript-eslint/no-unnecessary-qualifier': 2,
      '@typescript-eslint/no-unnecessary-type-arguments': 2,
      '@typescript-eslint/prefer-readonly': 2,
      '@typescript-eslint/prefer-reduce-type-parameter': 2,
      '@typescript-eslint/prefer-string-starts-ends-with': 2,
      '@typescript-eslint/require-array-sort-compare': [
        2,
        {
          ignoreStringArrays: true,
        },
      ],
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
  },
}

const reactJsx = {
  extends: ['standard-react', 'plugin:react/recommended', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
}

exports.react = [
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
      'sonar/function-name': isTsAvailable
        ? [2, { format: '^_?[a-zA-Z][a-zA-Z0-9]*\\$?$' }]
        : 0,
    },
    ...reactJsx,
  },
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

const vueExtends = ['plugin:vue/recommended', 'prettier']

exports.vue = [
  {
    ...jsBase,
    files: [...jsBase.files, !isTsAvailable && '*.vue'].filter(Boolean),
    parser: 'vue-eslint-parser',
    parserOptions: {
      ...jsBase.parserOptions,
      parser: jsBase.parser,
    },
    extends: vueExtends,
  },
  isTsAvailable && {
    ...tsBase,
    files: [...tsBase.files, '*.vue'],
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
      extraFileExtensions: ['.vue'],
    },
    extends: [...tsBase.extends, ...vueExtends],
  },
  {
    files: '*.vue',
    rules: {
      'no-unused-vars': 0,
      '@typescript-eslint/no-unused-vars': 0,
    },
  },
].filter(Boolean)

const svelteBase = {
  files: '*.svelte',
  plugins: ['svelte'],
  processor: 'svelte/svelte',
  rules: {
    'prettier/prettier': 0, // https://github.com/sveltejs/eslint-plugin-svelte3/issues/16,
    'sonar/label-position': 0,
    'sonar/no-labels': 0,
  },
}

exports.svelte = isTsAvailable
  ? {
      ...tsBase,
      ...svelteBase,
      parserOptions: {
        extraFileExtensions: ['.svelte'],
      },
      settings: {
        ...tsBase.settings,
        'svelte/typescript': tryRequirePkg('typescript'),
      },
    }
  : {
      ...jsBase,
      ...svelteBase,
    }

exports.angular = [
  {
    files: '*.ts',
    excludedFiles: '*.d.ts',
    parserOptions: {
      project,
    },
    extends: [
      'plugin:@angular-eslint/recommended',
      'plugin:@angular-eslint/template/process-inline-templates',
      'prettier',
    ],
    rules: {
      '@angular-eslint/prefer-on-push-component-change-detection': 1,
    },
  },
  {
    files: '*.html',
    extends: [
      'plugin:@angular-eslint/template/recommended',
      'plugin:markup/recommended',
    ],
    parser: 'angular-eslint-template-parser',
    rules: {
      '@angular-eslint/template/eqeqeq': [
        2,
        {
          allowNullOrUndefined: true,
        },
      ],
      'prettier/prettier': 0,
      'spaced-comment': 0,
    },
  },
  {
    files: '*.html',
    excludedFiles: '*inline-template-*.component.html',
    extends: ['prettier'],
    rules: {
      'prettier/prettier': [
        2,
        {
          parser: 'angular',
        },
      ],
    },
  },
  {
    files: '*inline-template-*.component.html',
    rules: {
      'unicorn/no-empty-file': 0,
    },
  },
]

exports.html = {
  files: '*.html',
  extends: 'plugin:markup/recommended',
  rules: {
    'prettier/prettier': [
      2,
      {
        parser: 'html',
      },
    ],
  },
}

exports.md = {
  files: '*.md',
  extends: ['plugin:mdx/recommended'],
}

exports.mdx = {
  files: '*.mdx',
  extends: [...reactJsx.extends, 'plugin:mdx/recommended'],
  parserOptions: jsBase.parserOptions,
  settings: { ...reactJsx.settings, ...resolveSettings },
}

const nonSourceRules = {
  'n/no-extraneous-import': 0,
  'n/no-extraneous-require': 0,
  'n/no-unsupported-features/es-builtins': 0,
}

exports.test = {
  files: '**/{__test__,test,tests}/**/*',
  rules: nonSourceRules,
}

exports.jest = {
  files: '*.{spec,test}.{js,jsx,ts,tsx}',
  extends: ['plugin:jest/recommended'],
  rules: exports.test.rules,
}

exports.script = exports.scripts = {
  files: '**/scripts/**/*',
  rules: nonSourceRules,
}

exports.story = exports.stories = {
  files: ['**/.storybook/**/*', '**/stories/**/*'],
  rules: nonSourceRules,
}

exports.config = exports.configs = {
  files: ['.*.js', '*.config.{js,ts}'],
  rules: nonSourceRules,
}

exports.overrides = []
  // eslint-disable-next-line unicorn/prefer-spread
  .concat(
    isPkgAvailable('@babel/core') && exports.js,
    isTsAvailable && exports.ts,
    isReactAvailable && exports.react,
    isReactAvailable && exports.reactHooks,
    isReactAvailable && exports.reactTs,
    isVueAvailable && exports.vue,
    isSvelteAvailable && exports.svelte,
    isAngularAvailable ? exports.angular : exports.html,
    exports.md,
    exports.mdx,
    isPkgAvailable('jest') && exports.jest,
    exports.test,
    exports.scripts,
    exports.stories,
    exports.configs,
    exports.dTs,
  )
  .filter(Boolean)
