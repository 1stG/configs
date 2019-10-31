const { isPkgAvailable, tryFile } = require('@pkgr/utils')

const config = Object.assign({}, require('./base'))

if (isPkgAvailable('eslint')) {
  Object.assign(
    config,
    {
      '*.{js,jsx,md,mdx,mjs,vue}': [
        'eslint --cache -f friendly --fix',
        'git add',
      ],
    },
    require('./ts-eslint'),
  )
}

if (isPkgAvailable('tslint') && tryFile('tslint.json')) {
  Object.assign(config, require('./ts-tslint'))
}

module.exports = config
