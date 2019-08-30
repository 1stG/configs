module.exports = {
  '*.{js,jsx,mdx,mjs,vue}': ['eslint --fix', 'git add'],
  '*.{css,less,sass,scss,vue}': ['stylelint --fix', 'git add'],
  '.*rc': ['prettier --write', 'git add'],
  '*.{gql,html,json,md,vue,yaml,yml}': ['prettier --write', 'git add'],
}
