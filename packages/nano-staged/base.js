import { preferPrettier } from '@1stg/config'
import { isPkgAvailable } from '@pkgr/core'

const isEslintAvailable = isPkgAvailable('eslint')
const isStylelintAvailable = isPkgAvailable('stylelint')

const useEslintPrettier = isEslintAvailable && !preferPrettier
const useStylelintPrettier = isStylelintAvailable && !preferPrettier

const ESLINT_PRETTIER_FILES =
  'cjs,cts,js,json,jsonc,json5,jsx,html,md,mdx,mjs,mts,pug,toml,ts,tsx,vue,yaml,yml'
const STYLELINT_PRETTIER_FILES = 'css,less,sass,scss,styl,stylus,vue'

const config = [
  `*.{*sh,env,env.*,gql,ini,properties,rb${
    isEslintAvailable ? '' : ',' + ESLINT_PRETTIER_FILES
  }${isStylelintAvailable ? '' : ',' + STYLELINT_PRETTIER_FILES}}`,
  '.!(browserslist|nvm|yarn)rc',
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
    [`*.{${ESLINT_PRETTIER_FILES}}`]: [
      'eslint --cache --fix',
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

export default config
