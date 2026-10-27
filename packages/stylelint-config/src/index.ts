import { isPkgAvailable } from '@pkgr/utils'
import type { Config } from 'stylelint'

import { scss, scssLoose } from './scss.js'

export interface StylelintConfigOptions extends Config {
  /** Ignore the CSS Modules pseudo classes. @default false */
  modules?: boolean
  /** Run Prettier as a Stylelint rule. @default false */
  prettier?: boolean
  /** Add the SCSS syntax and rules. @default false */
  scss?: boolean
  /** Add the SCSS syntax with the strict rules off. @default false */
  scssLoose?: boolean
  /** Ignore Vue-specific pseudo elements. @default false */
  vue?: boolean
}

export const defineConfig = ({
  modules = false,
  prettier = isPkgAvailable('stylelint-prettier'),
  scss: scssEnabled = false,
  scssLoose: scssLooseEnabled = false,
  vue = isPkgAvailable('vue'),
  ...options
}: StylelintConfigOptions = {}): Config => {
  const ignorePseudoElements = vue ? ['v-deep', 'v-global', 'v-slotted'] : []

  const toArray = <T>(value: T | T[] | undefined): T[] => {
    if (value === undefined) {
      return []
    }
    return Array.isArray(value) ? value : [value]
  }

  const extraPlugins = toArray(options.plugins)
  const extended = [
    'stylelint-config-standard',
    ...(prettier ? ['stylelint-prettier/recommended'] : []),
    ...toArray(options.extends),
  ]

  return {
    ...options,
    extends: extended,
    plugins: [
      'stylelint-high-performance-animation',
      'stylelint-no-unsupported-browser-features',
      ...extraPlugins,
    ],
    rules: {
      'at-rule-empty-line-before': null,
      'plugin/no-low-performance-animation-properties': true,
      'plugin/no-unsupported-browser-features': [
        true,
        {
          ignore: ['css3-cursors', 'css-media-resolution', 'css-resize', 'rem'],
          severity: 'warning',
        },
      ],
      'selector-attribute-quotes': null,
      'selector-class-pattern': [
        String.raw`^[a-z]([\da-z-]+)?(__([\da-z]+-?)+)?(--([\da-z]+-?)+){0,2}$`,
        {
          message: 'Expected class selector to be kebab-case or BEM',
          resolveNestedSelectors: true,
        },
      ],
      'selector-pseudo-element-colon-notation': 'single',
      ...(ignorePseudoElements.length > 0 && {
        'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements }],
      }),
      ...(modules && {
        'selector-pseudo-class-no-unknown': [
          true,
          { ignorePseudoClasses: ['export', 'global', 'local'] },
        ],
      }),
      ...options.rules,
    },
    overrides: [
      {
        files: ['**/*.md', '**/*.mdx'],
        customSyntax: 'postcss-markdown',
      },
      {
        files: ['**/*.html', '**/*.vue'],
        customSyntax: 'postcss-html',
      },
      {
        files: ['**/*.less'],
        customSyntax: 'postcss-less',
      },
      ...(scssEnabled || scssLooseEnabled
        ? [
            {
              files: ['**/*.sass', '**/*.scss'],
              ...(scssLooseEnabled ? scssLoose : scss),
            },
          ]
        : []),
      ...(options.overrides ?? []),
    ],
  }
}

export default defineConfig()
