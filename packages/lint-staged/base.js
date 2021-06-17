const { isPkgAvailable, tryFile } = require('@pkgr/utils')

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
  Object.assign(
    config,
    {
      '*.{cjs,js,jsx,md,mdx,mjs,svelte,vue}':
        'eslint --cache -f friendly --fix',
    },
    require('./ts-eslint'),
  )
}

if (isPkgAvailable('stylelint')) {
  config['*.{css,less,sass,scss,vue}'] = 'stylelint --cache --fix'
}

if (isPkgAvailable('tslint') && tryFile('tslint.json')) {
  Object.assign(config, require('./ts-tslint'))
}

if (isPkgAvailable('@pkgr/imagemin')) {
  config['*.{gif,jpeg,jpg,png,svg,webp}'] = 'i'
}

module.exports = config
