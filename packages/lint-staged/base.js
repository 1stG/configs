let isStylelintAvailable

try {
  // eslint-disable-next-line node/no-extraneous-require
  isStylelintAvailable = !!require.resolve('stylelint')
} catch (e) {}

let isImageminAvailable

try {
  // eslint-disable-next-line node/no-extraneous-require, node/no-missing-require
  isImageminAvailable = !!require.resolve('@1stg/imagemin')
} catch (e) {}

const config = {
  '.!(*browserslist|npm|yarn)rc': ['prettier --write', 'git add'],
  '*.{js,jsx,md,mdx,mjs,vue}': ['eslint -f friendly --fix', 'git add'],
  '*.{gql,html,json,pug,vue,toml,yaml,yml}': ['prettier --write', 'git add'],
}

if (isStylelintAvailable) {
  config['*.{css,less,sass,scss,vue}'] = ['stylelint --fix', 'git add']
}

if (isImageminAvailable) {
  config['*.{gif,jpeg,jpg,png,svg,webp}'] = ['i', 'git add']
}

module.exports = config
