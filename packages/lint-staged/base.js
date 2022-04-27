const { isPkgAvailable } = require('@pkgr/utils')

const config = [
  '*.{*sh,env,env.*,gql,html,json,properties,pug,rb,svelte,vue,toml,yaml,yml}',
  '.*rc',
  'Dockerfile',
].reduce(
  (acc, files) =>
    Object.assign(acc, {
      [files]: 'prettier --write',
    }),
  {},
)

if (isPkgAvailable('eslint')) {
  Object.assign(config, {
    '*.{cjs,js,jsx,md,mdx,mjs,svelte,vue}': 'eslint --cache -f friendly --fix',
    '*.{ts,tsx}': [
      'cross-env PARSER_NO_WATCH=true eslint --cache -f friendly --fix',
    ],
  })
}

if (isPkgAvailable('stylelint')) {
  config['*.{css,less,sass,scss,vue}'] = 'stylelint --cache --fix'
}

if (isPkgAvailable('@pkgr/imagemin')) {
  config['*.{gif,jpeg,jpg,png,svg,webp}'] = 'i'
}

module.exports = config
