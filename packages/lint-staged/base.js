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
  '.*rc': ['prettier --write', 'git add'],
  '*.{js,jsx,md,mdx,mjs,vue}': ['eslint --fix', 'git add'],
  '*.{gql,html,json,md,mdx,pug,vue,yaml,yml}': ['prettier --write', 'git add'],
}

if (isStylelintAvailable) {
  config['*.{css,less,sass,scss,vue}'] = ['stylelint --fix', 'git add']
}

if (isImageminAvailable) {
  config['*.{gif,jpeg,jpg,png,svg,webp}'] = ['i', 'git add']
}

module.exports = config
