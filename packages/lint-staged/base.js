const { resolve } = require('path')

let isStylelintAvailable

try {
  // eslint-disable-next-line node/no-extraneous-require
  isStylelintAvailable = !!require.resolve('stylelint')
} catch (e) {}

const config = {
  '.*rc': ['prettier --write', 'git add'],
  '*.{js,jsx,md,mdx,mjs,vue}': ['eslint --fix', 'git add'],
  '*.{gql,html,json,md,mdx,pug,vue,yaml,yml}': ['prettier --write', 'git add'],
  '*.{gif,jpeg,jpg,png,svg,webp}': [
    `node ${resolve(__dirname, 'imagemin')}`,
    'git add',
  ],
}

if (isStylelintAvailable) {
  config['*.{css,less,sass,scss,vue}'] = ['stylelint --fix', 'git add']
}

module.exports = config
