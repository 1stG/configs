module.exports = {
  '*.{js,jsx,md,mdx,mjs,vue}': ['eslint --fix', 'git add'],
  '*.{css,less,sass,scss,vue}': ['stylelint --fix', 'git add'],
  '.*rc': ['prettier --write', 'git add'],
  '*.{gql,html,json,md,mdx,vue,yaml,yml}': ['prettier --write', 'git add'],
}
