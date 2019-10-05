/* eslint-disable node/no-extraneous-require */
const { declare } = require('@babel/helper-plugin-utils')

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
      react,
      typescript,
      vue,
      useBuiltIns = 'usage',
    },
  ) => {
    api.assertVersion(7)

    const isDev = api.env('development')
    const isProd = api.env('production')

    const proposalTypeScriptPreset = require('babel-preset-proposal-typescript')

    const presets = [
      [
        proposalTypeScriptPreset,
        {
          isTSX: vue,
        },
      ],
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
          useBuiltIns,
        },
      ],
    ]

    const plugins = [require('@babel/plugin-proposal-class-properties')]

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

    if (typescript) {
      presets.push(require('@babel/preset-typescript'))
    }

    let reactHotLoaderAvailable = false

    try {
      reactHotLoaderAvailable = !!require.resolve('react-hot-loader/babel')
    } catch (e) {}

    const reactPreset = [
      require('@babel/preset-react'),
      {
        development: isDev,
      },
    ]
    const reactPlugin = api.env('production')
      ? [
          require('babel-plugin-transform-react-remove-prop-types'),
          {
            removeImport: true,
          },
        ]
      : isDev && reactHotLoaderAvailable && require('react-hot-loader/babel')

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
      overrides: vue
        ? undefined
        : [
            {
              test: /\.(js|md|ts)x$/,
              plugins: reactPlugin ? [reactPlugin] : undefined,
              presets: [
                [
                  proposalTypeScriptPreset,
                  {
                    isTSX: true, // enable jsx plugin for mdx
                  },
                ],
                reactPreset,
              ],
            },
          ],
    }
  },
)
