const { declare } = require('@babel/helper-plugin-utils')

module.exports = declare((api, opts) => {
  api.assertVersion(7)

  const { modules = false, react, typescript } = opts

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

  if (react) {
    presets.push([
      require('@babel/preset-react'),
      {
        development: api.env('development'),
      },
    ])

    if (api.env('production')) {
      plugins.push([
        require('babel-plugin-transform-react-remove-prop-types'),
        {
          removeImport: true,
        },
      ])
    }
  }

  return {
    plugins,
    presets,
  }
})
