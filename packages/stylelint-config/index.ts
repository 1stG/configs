import type { Config } from 'stylelint'

import { scss, scssLoose } from './scss.js'

export interface StylelintConfigOptions {
  /** Ignore Angular-specific pseudo elements. @default false */
  angular?: boolean
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
  angular = false,
  modules = false,
  prettier = false,
  scss: scssEnabled = false,
  scssLoose: scssLooseEnabled = false,
  vue = false,
}: StylelintConfigOptions = {}): Config => {
  const ignorePseudoElements = [
    ...(angular ? ['ng-deep'] : []),
    ...(vue ? ['v-deep', 'v-global', 'v-slotted'] : []),
  ]

  const config: Config = {
    extends: [
      'stylelint-config-standard',
      ...(prettier ? ['stylelint-prettier/recommended'] : []),
    ],
    plugins: [
      'stylelint-high-performance-animation',
      'stylelint-no-unsupported-browser-features',
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
    ],
  }

  return config
}

export default defineConfig()
