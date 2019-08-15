module.exports = {
  '*.{mdx,mjs,js,jsx,ts,tsx}': ['eslint --fix', 'git add'],
  '.*rc': ['prettier --write', 'git add'],
  '*.{css,gql,html,json,less,md,sass,scss,yml}': [
    'prettier --write',
    'git add',
  ],
}
