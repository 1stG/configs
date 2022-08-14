const { preferPrettier } = require('@1stg/config')
const { isPkgAvailable } = require('@pkgr/utils')

const isEslintAvailable = isPkgAvailable('eslint')
const isStylelintAvailable = isPkgAvailable('stylelint')

const useEslintPrettier = isEslintAvailable && !preferPrettier
const useStylelintPrettier = isStylelintAvailable && !preferPrettier

const ESLINT_PRETTIER_FILES =
  'cjs,cts,js,json,jsonc,json5,jsx,html,md,mdx,mjs,mts,pug,svelte,toml,ts,tsx,vue,yaml,yml'
const STYLELINT_PRETTIER_FILES = 'css,less,sass,scss,styl,stylus,svelte,vue'

const config = [
  `*.{*sh,env,env.*,gql,ini,properties,rb${
    isEslintAvailable ? '' : ',' + ESLINT_PRETTIER_FILES
  }${isStylelintAvailable ? '' : ',' + STYLELINT_PRETTIER_FILES}}`,
  '.!(browserslistrc|nvm)rc',
  'Dockerfile',
].reduce(
  (acc, files) =>
    Object.assign(acc, {
      // eslint-disable-next-line sonarjs/no-duplicate-string
      [files]: 'prettier --write',
    }),
  {},
)

if (isEslintAvailable) {
  Object.assign(config, {
    [`*.{${ESLINT_PRETTIER_FILES}}`]: [
      'eslint --cache -f friendly --fix',
      ...(useEslintPrettier ? [] : ['prettier --write']),
    ],
  })
}

if (isStylelintAvailable) {
  config[`*.{${STYLELINT_PRETTIER_FILES}}`] = [
    'stylelint --allow-empty-input --cache --fix',
    ...(useStylelintPrettier ? [] : ['prettier --write']),
  ]
}

if (isPkgAvailable('@pkgr/imagemin')) {
  config['*.{gif,jpeg,jpg,png,svg,webp}'] = 'i'
}

module.exports = config
