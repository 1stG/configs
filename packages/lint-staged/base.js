/* eslint-disable node/no-extraneous-require */
let isStylelintAvailable

try {
  isStylelintAvailable = !!require.resolve('stylelint')
} catch (e) {}

let isImageminAvailable

try {
  isImageminAvailable = !!require.resolve('@pkgr/imagemin')
} catch (e) {}

const config = {
  '*.{js,jsx,md,mdx,mjs,vue}': ['eslint --cache -f friendly --fix', 'git add'],
  '*.{*ignore,*sh,env,env.*,gql,html,json,pug,vue,toml,yaml,yml}': [
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

if (isStylelintAvailable) {
  config['*.{css,less,sass,scss,vue}'] = ['stylelint --fix', 'git add']
}

if (isImageminAvailable) {
  config['*.{gif,jpeg,jpg,png,svg,webp}'] = ['i', 'git add']
}

module.exports = config
