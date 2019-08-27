module.exports = {
  '*.{mdx,mjs,js,jsx,vue}': ['eslint --fix', 'git add'],
  '*.{css,less,sass,scss,vue}': ['stylelint --fix', 'git add'],
  '.*rc': ['prettier --write', 'git add'],
  '*.{gql,html,json,md,vue,yml}': ['prettier --write', 'git add'],
}
