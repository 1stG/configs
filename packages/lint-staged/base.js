const { isPkgAvailable } = require('@pkgr/utils')

const isEslintAvailable = isPkgAvailable('eslint')
const isStylelintAvailable = isPkgAvailable('stylelint')

const ESLINT_FILES = 'cjs,js,jsx,md,mdx,mjs,svelte,vue'
const TS_FILES = 'cts,mts,ts,tsx'
const STYLELINT_FILES = 'css,less,sass,scss,svelte,vue'

const config = [
  `*.{*sh,env,env.*,gql,html,json,properties,pug,rb,toml,yaml,yml${
    isEslintAvailable ? '' : ',' + ESLINT_FILES + ',' + TS_FILES
  }${isStylelintAvailable ? '' : ',' + STYLELINT_FILES}}`,
  '.!(nvm)rc',
  'Dockerfile',
].reduce(
  (acc, files) =>
    Object.assign(acc, {
      [files]: 'prettier --write',
    }),
  {},
)

if (isEslintAvailable) {
  Object.assign(config, {
    [`*.{${ESLINT_FILES}}`]: 'eslint --cache -f friendly --fix',
    [`*.{${TS_FILES}}`]: [
      'cross-env PARSER_NO_WATCH=true eslint --cache -f friendly --fix',
    ],
  })
}

if (isStylelintAvailable) {
  config[`*.{${STYLELINT_FILES},styl,stylus}`] = 'stylelint --cache --fix'
}

if (isPkgAvailable('@pkgr/imagemin')) {
  config['*.{gif,jpeg,jpg,png,svg,webp}'] = 'i'
}

module.exports = config
