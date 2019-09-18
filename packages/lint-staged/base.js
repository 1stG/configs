const { resolve } = require('path')

module.exports = {
  '.*rc': ['prettier --write', 'git add'],
  '*.{js,jsx,md,mdx,mjs,vue}': ['eslint --fix', 'git add'],
  '*.{css,less,sass,scss,vue}': ['stylelint --fix', 'git add'],
  '*.{gql,html,json,md,mdx,vue,yaml,yml}': ['prettier --write', 'git add'],
  '*.{gif,jpeg,jpg,png,svg,webp}': [
    `node ${resolve(__dirname, 'imagemin')}`,
    'git add',
  ],
}
