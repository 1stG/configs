const { allowModules } = require('@1stg/eslint-config/_util')

module.exports = {
  extends: '@1stg/eslint-config/recommended',
  settings: {
    node: {
      allowModules: allowModules.concat(
        'react-hot-loader',
        'tslint',
        'typescript',
        'webpack',
      ),
    },
  },
}
