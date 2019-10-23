const { allowModules } = require('@1stg/eslint-config/_util')

module.exports = {
  extends: '@1stg/eslint-config/recommended',
  settings: {
    node: {
      allowModules: allowModules.concat(
        '@pkgr/imagemin',
        'react-hot-loader',
        'tslint',
        'typescript',
        'webpack',
      ),
    },
  },
}
