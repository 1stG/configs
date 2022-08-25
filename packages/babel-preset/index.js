/* eslint-disable sonarjs/cognitive-complexity */
const { declare } = require('@babel/helper-plugin-utils')
const { tryRequirePkg } = require('@pkgr/utils')

const DEFAULT_ANTD_OPTIONS = {
  libraryName: 'antd',
  style: true,
}

module.exports = declare(
  (
    api,
    {
      async = 'promises',
      import: importOptions,
      modules = false,
      esmodules,
      react,
      typescript,
      vue,
      isTSX = vue,
      metadata,
      useBuiltIns = 'usage',
      decoratorsLegacy = true,
      classLoose,
      decoratorsBeforeExport = decoratorsLegacy === true ? undefined : true,
      allowDeclareFields = true,
    },
  ) => {
    api.assertVersion(7)

    const isDev = api.env('development')
    const isProd = api.env('production')

    const proposalTypeScriptPreset = require('babel-preset-proposal-typescript')

    const proposalTsOptions = { classLoose, decoratorsLegacy, isTSX }

    if (esmodules !== undefined) {
      console.warn(
        '`esmodules` option is deprecated, please use top level `targets.esmodules` instead.\n' +
          'Please view https://babeljs.io/docs/en/options#targetsesmodules for more information.',
      )
    }

    /**
     * presets are processed in last-to-first order
     *
     * @see https://babeljs.io/docs/en/presets#preset-ordering
     */
    const presets = [
      [
        require('@babel/preset-env'),
        {
          modules,
          exclude:
            async === 'generator'
              ? undefined
              : [
                  '@babel/transform-async-to-generator',
                  '@babel/transform-regenerator',
                ],
          bugfixes: true,
          corejs: {
            version: '3.25',
            proposals: true,
          },
          shippedProposals: true,
          targets: esmodules
            ? {
                esmodules,
              }
            : undefined,
          useBuiltIns,
        },
      ],
      [proposalTypeScriptPreset, proposalTsOptions],
    ]

    if (typescript) {
      presets.splice(-1, 0, [
        require('@babel/preset-typescript'),
        {
          isTSX,
          allExtensions: isTSX,
          allowDeclareFields,
        },
      ])
    }

    const plugins = [
      [
        require('@babel/plugin-transform-typescript'),
        {
          allowDeclareFields,
        },
      ],
      [
        require('@babel/plugin-proposal-decorators'),
        {
          decoratorsBeforeExport,
          legacy: decoratorsLegacy,
        },
      ],
      [
        require('@babel/plugin-proposal-class-properties'),
        {
          loose: classLoose,
        },
      ],
    ]

    if (metadata) {
      plugins.unshift(require('babel-plugin-transform-typescript-metadata'))
    }

    if (isProd) {
      plugins.push([
        require('babel-plugin-transform-remove-console'),
        {
          exclude: ['error', 'warn'],
        },
      ])
    }

    if (async === 'fast') {
      plugins.push([
        require('fast-async'),
        {
          useRuntimeModule: true,
        },
      ])
    } else if (async === 'promise' || async === 'promises') {
      plugins.push(require('babel-plugin-transform-async-to-promises'))
    }

    if (importOptions) {
      const importPlugin = require('babel-plugin-import')
      if (importOptions === true) {
        plugins.push([importPlugin, DEFAULT_ANTD_OPTIONS])
      } else if (Array.isArray(importOptions)) {
        plugins.push([importPlugin, DEFAULT_ANTD_OPTIONS, ...importOptions])
      } else {
        plugins.push(
          [
            importPlugin,
            {
              ...DEFAULT_ANTD_OPTIONS,
              ...importOptions.antd,
            },
          ],
          ...(importOptions.plugins || []),
        )
      }
    }

    const reactPreset = [
      require('@babel/preset-react'),
      {
        development: isDev,
        runtime:
          react && react.jsxRuntime != null ? react.jsxRuntime : 'automatic',
      },
    ]

    let reactPlugin

    if (isProd) {
      reactPlugin = [
        require('babel-plugin-transform-react-remove-prop-types'),
        {
          removeImport: true,
        },
      ]
    } else if (isDev) {
      const reactRefreshBabelPlugin = tryRequirePkg('react-refresh/babel')
      reactPlugin =
        react &&
        (react.plugin === 'refresh' ||
          (react.plugin == null && reactRefreshBabelPlugin))
          ? reactRefreshBabelPlugin
          : tryRequirePkg('react-hot-loader/babel')
    }

    if (react) {
      presets.push(reactPreset)

      if (reactPlugin) {
        plugins.push(reactPlugin)
      }
    }

    if (vue) {
      const vuePkg = tryRequirePkg('vue/package.json')
      const majorVersion = +(
        vue.version || (vue === true ? vuePkg && vuePkg.version : String(vue))
      ).split('.')[0]
      if (majorVersion === 3) {
        plugins.push([
          require('@vue/babel-plugin-jsx'),
          {
            transformOn: true,
            optimize: true,
            ...vue.options,
          },
        ])
      } else {
        presets.push([require('@vue/babel-preset-jsx'), vue.options])
      }
    }

    return {
      presets,
      plugins,
      overrides: isTSX
        ? undefined
        : [
            {
              test: /\.(js|md|ts)x$/,
              presets: [
                [
                  proposalTypeScriptPreset,
                  { ...proposalTsOptions, isTSX: true },
                ],
              ],
              plugins: reactPlugin ? [reactPlugin] : undefined,
            },
          ],
    }
  },
)
