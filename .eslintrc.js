module.exports = {
  extends: '@1stg/eslint-config/recommended',
  settings: {
    node: {
      allowModules: ['@pkgr/imagemin', 'react-hot-loader', 'webpack'],
    },
  },
}
