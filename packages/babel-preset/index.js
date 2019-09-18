const { declare } = require('@babel/helper-plugin-utils')

module.exports = declare((api, opts) => {
  api.assertVersion(7)

  const {
    generator,
    modules = false,
    react,
    typescript,
    vue,
    useBuiltIns = 'usage',
  } = opts

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

  const plugins = []

  if (!generator) {
    plugins.push([
      'module:fast-async',
      {
        useRuntimeModule: true,
      },
    ])
  }

  if (typescript) {
    presets.push(require('@babel/preset-typescript'))
  }

  const reactPreset = [
    require('@babel/preset-react'),
    {
      development: api.env('development'),
    },
  ]
  const reactPlugin = api.env('production')
    ? [
        require('babel-plugin-transform-react-remove-prop-types'),
        {
          removeImport: true,
        },
      ]
    : undefined

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
            plugins: reactPlugin && [reactPlugin],
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
})
