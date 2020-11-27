/* eslint-disable sonarjs/no-duplicate-string */
const { isPkgAvailable } = require('@pkgr/utils')

const config = {
  '*.{*sh,env,env.*,gql,html,json,properties,pug,rb,vue,toml,yaml,yml}': [
    'prettier --write',
  ],
  '.!(*browserslist|npm|yarn)rc': ['prettier --write'],
  '.{editorconfig|browserslistrc|npmrc|yarnrc}': [
    'prettier --write --parser sh',
  ],
  Dockerfile: ['prettier --write'],
}

if (isPkgAvailable('stylelint')) {
  config['*.{css,less,sass,scss,vue}'] = ['stylelint --cache --fix']
}

if (isPkgAvailable('@pkgr/imagemin')) {
  config['*.{gif,jpeg,jpg,png,svg,webp}'] = ['i']
}

module.exports = config
