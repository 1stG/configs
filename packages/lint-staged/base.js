/* eslint-disable sonarjs/no-duplicate-string */
const { isPkgAvailable } = require('@pkgr/utils')

const config = {
  '*.{*ignore,*sh,env,env.*,gql,html,json,properties,pug,vue,toml,yaml,yml}': [
    'prettier --write',
    'git add',
  ],
  '.!(*browserslist|npm|yarn)rc': ['prettier --write', 'git add'],
  '.{editorconfig|browserslistrc|npmrc|yarnrc}': [
    'prettier --write --parser sh',
    'git add',
  ],
  Dockerfile: ['prettier --write', 'git add'],
}

if (isPkgAvailable('stylelint')) {
  config['*.{css,less,sass,scss,vue}'] = ['stylelint --cache --fix', 'git add']
}

if (isPkgAvailable('@pkgr/imagemin')) {
  config['*.{gif,jpeg,jpg,png,svg,webp}'] = ['i', 'git add']
}

module.exports = config
