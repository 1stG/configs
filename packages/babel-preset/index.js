/* eslint-disable sonarjs/cognitive-complexity */
import { declare } from '@babel/helper-plugin-utils'
import pluginProposalDecorators from '@babel/plugin-proposal-decorators'
import pluginTransformClassProperties from '@babel/plugin-transform-class-properties'
import pluginTransformTypeScript from '@babel/plugin-transform-typescript'
import presetEnv from '@babel/preset-env'
import presetReact from '@babel/preset-react'
import presetTypeScript from '@babel/preset-typescript'
import { tryRequirePkg } from '@pkgr/utils'
import vueJsx from '@vue/babel-plugin-jsx'
import vuePresetJsx from '@vue/babel-preset-jsx'
import importPlugin from 'babel-plugin-import'
import polyfillCorejs3 from 'babel-plugin-polyfill-corejs3'
import transformReactRemovePropTypes from 'babel-plugin-transform-react-remove-prop-types'
import transformRemoveConsole from 'babel-plugin-transform-remove-console'
import transformTypeScriptMetadata from 'babel-plugin-transform-typescript-metadata'
import proposalTypeScriptPreset from 'babel-preset-proposal-typescript'

const DEFAULT_ANTD_OPTIONS = {
  libraryName: 'antd',
  style: true,
}

export default declare(
  (
    api,
    {
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
      allowDeclareFields = true,
    },
  ) => {
    api.assertVersion('^8.0.0-0')

    const isDev = api.env('development')
    const isProd = api.env('production')

    const proposalTsOptions = { decoratorsLegacy, isTSX }

    if (esmodules !== undefined) {
      console.warn(
        '`esmodules` option is deprecated, please use top level `targets.esmodules` instead.\n' +
          'Please view https://babeljs.io/docs/en/options#targetsesmodules for more information.',
      )
    }

    /**
     * Presets are processed in last-to-first order
     *
     * @see https://babeljs.io/docs/en/presets#preset-ordering
     */
    const presets = [
      [
        presetEnv,
        {
          modules,
          shippedProposals: true,
          targets: esmodules
            ? {
                esmodules,
              }
            : undefined,
        },
      ],
      [proposalTypeScriptPreset, proposalTsOptions],
    ]

    if (typescript) {
      presets.splice(-1, 0, [
        presetTypeScript,
        {
          isTSX,
          allExtensions: isTSX,
          allowDeclareFields,
        },
      ])
    }

    const plugins = [
      ...(useBuiltIns
        ? [
            [
              polyfillCorejs3,
              {
                method:
                  useBuiltIns === 'entry' ? 'entry-global' : 'usage-global',
                proposals: true,
                version: '3.25',
              },
            ],
          ]
        : []),
      [
        pluginTransformTypeScript,
        {
          allowDeclareFields,
        },
      ],
      [
        pluginProposalDecorators,
        {
          version: decoratorsLegacy ? 'legacy' : '2023-11',
        },
      ],
      [
        pluginTransformClassProperties,
        {
          loose: classLoose,
        },
      ],
    ]

    if (metadata) {
      plugins.unshift(transformTypeScriptMetadata)
    }

    if (isProd) {
      plugins.push([
        transformRemoveConsole,
        {
          exclude: ['error', 'warn'],
        },
      ])
    }

    if (importOptions) {
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
      presetReact,
      {
        development: isDev,
        runtime:
          react && react.jsxRuntime != null ? react.jsxRuntime : 'automatic',
      },
    ]

    let reactPlugin

    if (isProd) {
      reactPlugin = [
        transformReactRemovePropTypes,
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
          vueJsx,
          {
            transformOn: true,
            optimize: true,
            ...vue.options,
          },
        ])
      } else {
        presets.push([vuePresetJsx, vue.options])
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
