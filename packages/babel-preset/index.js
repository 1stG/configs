const { declare } = require('@babel/helper-plugin-utils')

module.exports = declare((api, opts) => {
  api.assertVersion(7)

  const { modules = false, react, typescript, vue } = opts

  const plugins = []
  const presets = [
    require('babel-preset-proposal-typescript'),
    [
      require('@babel/preset-env'),
      {
        modules,
      },
    ],
  ]

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
    overrides: !vue && [
      {
        test: /\.[jt]sx$/,
        plugins: reactPlugin && [reactPlugin],
        presets: [reactPreset],
      },
    ],
  }
})
