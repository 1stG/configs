/* eslint-disable sonarjs/cognitive-complexity */
const { declare } = require('@babel/helper-plugin-utils')
const { isPkgAvailable } = require('@pkgr/utils')

const DEFAULT_ANTD_OPTIONS = {
  libraryName: 'antd',
  style: true,
}

module.exports = declare(
  (
    api,
    {
      generator,
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
      classLoose = decoratorsLegacy === true,
      decoratorsBeforeExport = decoratorsLegacy === true ? undefined : true,
    },
  ) => {
    api.assertVersion(7)

    const isDev = api.env('development')
    const isProd = api.env('production')

    const proposalTypeScriptPreset = require('babel-preset-proposal-typescript')

    const proposalTsOptions = Object.assign({
      classLoose,
      decoratorsLegacy,
      isTSX,
    })

    const presets = [
      [proposalTypeScriptPreset, proposalTsOptions],
      [
        require('@babel/preset-env'),
        {
          modules,
          exclude: generator
            ? undefined
            : [
                '@babel/transform-async-to-generator',
                '@babel/transform-regenerator',
              ],
          corejs: {
            version: 3,
            proposals: true,
          },
          targets: {
            esmodules,
          },
          useBuiltIns,
        },
      ],
    ]

    if (typescript) {
      presets.push([
        require('@babel/preset-typescript'),
        {
          isTSX,
          allExtensions: isTSX,
        },
      ])
    }

    const plugins = [
      [
        '@babel/plugin-proposal-decorators',
        {
          decoratorsBeforeExport,
          legacy: decoratorsLegacy,
        },
      ],
      [
        '@babel/plugin-proposal-class-properties',
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

    if (!generator) {
      plugins.push([
        require('fast-async'),
        {
          useRuntimeModule: true,
        },
      ])
    }

    if (importOptions) {
      const importPlugin = require('babel-plugin-import')
      if (importOptions === true) {
        plugins.push([importPlugin, DEFAULT_ANTD_OPTIONS])
      } else if (Array.isArray(importOptions)) {
        plugins.push([importPlugin, DEFAULT_ANTD_OPTIONS].concat(importOptions))
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
      },
    ]
    const reactPlugin = isProd
      ? [
          require('babel-plugin-transform-react-remove-prop-types'),
          {
            removeImport: true,
          },
        ]
      : isDev &&
        isPkgAvailable('react-hot-loader/babel') &&
        // eslint-disable-next-line node/no-missing-require
        require('react-hot-loader/babel')

    if (react) {
      presets.push(reactPreset)

      if (reactPlugin) {
        plugins.push(reactPlugin)
      }
    }

    if (vue) {
      presets.push('@vue/babel-preset-jsx')
    }

    return {
      plugins,
      presets,
      overrides: isTSX
        ? undefined
        : [
            {
              test: /\.(js|md|ts)x$/,
              presets: [
                [
                  proposalTypeScriptPreset,
                  Object.assign({}, proposalTsOptions, { isTSX: true }),
                ],
              ],
              plugins: reactPlugin ? [reactPlugin] : undefined,
            },
          ],
    }
  },
)
