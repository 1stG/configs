import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { isPkgAvailable, tryFile, tryPkg } from '@pkgr/utils'

export type Formatter = false | 'oxfmt' | 'prettier' | 'both'
export type Linter = false | 'oxlint' | 'eslint' | 'both'
export type Typecheck = false | 'tsc' | 'vue-tsc'

export interface NanoStagedOptions {
  /** Command overrides, e.g. to pass a config file. */
  commands?: Partial<Record<'oxfmt' | 'oxlint' | 'prettier' | 'stylelint', string>>
  /** Formatter(s) to run. @default installed Oxfmt, otherwise Prettier */
  formatter?: Formatter
  /** Linter to run before formatting. @default 'both' when both are installed */
  linter?: Linter
  /** Run `stylelint --fix` on style files. @default installed stylelint */
  stylelint?: boolean
  /** Type-check command to run. @default installed `vue-tsc`/`typescript` */
  typecheck?: Typecheck
  /** Explicit `tsconfig` path; discovered from `process.cwd()` when omitted. */
  tsconfig?: string
  /** Run `type-coverage` together with the type-check. @default installed type-coverage */
  typeCoverage?: boolean
  /** Optimize image files with the `i` command. @default installed @pkgr/imagemin */
  imagemin?: boolean
}

export type Task = string | string[] | (() => string | string[])
export type StagedConfig = Record<string, Task>

const CODE_FILES = 'cjs,cts,js,jsx,mjs,mts,ts,tsx,vue'
const STYLE_FILES = 'css,less,scss'
const DATA_FILES = 'gql,graphql,html,jsonc,json5,md,mdx,toml,yaml,yml'
const PRETTIER_FILES = 'ini,properties,pug,rb,sass,sh,styl,stylus'

const TSCONFIG_CANDIDATES = ['tsconfig.staged.json', 'tsconfig.json', 'tsconfig.base.json']

/**
 * Resolve the `tsconfig` used by the type-check tasks.
 *
 * Hooks run from the Git root, which is also `process.cwd()` when the config loads, so a path
 * relative to it stays readable and valid.
 */
const resolveTsconfig = (explicit?: string): string => {
  const cwd = process.cwd()
  const tsconfig = explicit
    ? tryFile(explicit, 'file', cwd)
    : tryFile(TSCONFIG_CANDIDATES, 'file', cwd) || tryPkg('@1stg/tsconfig')

  if (!tsconfig) {
    throw new Error('@1stg/nano-staged: no tsconfig found, pass `tsconfig` or disable `typecheck`')
  }

  return path.relative(cwd, tsconfig)
}

const resolveLinter = (): NanoStagedOptions['linter'] => {
  const oxlint = isPkgAvailable('oxlint')
  const eslint = isPkgAvailable('eslint')
  if (oxlint && eslint) {
    return 'both'
  }
  if (oxlint) {
    return 'oxlint'
  }
  return eslint ? 'eslint' : false
}

const hasProjectTsconfig = (explicit?: string): boolean => {
  const cwd = process.cwd()
  return Boolean(
    explicit ? tryFile(explicit, 'file', cwd) : tryFile(TSCONFIG_CANDIDATES, 'file', cwd),
  )
}

const resolveTypecheck = (explicit?: string): Typecheck => {
  const vueTscAvailable = isPkgAvailable('vue-tsc')
  if (!vueTscAvailable && !isPkgAvailable('typescript')) {
    return false
  }
  if (!hasProjectTsconfig(explicit)) {
    return false
  }
  return vueTscAvailable ? 'vue-tsc' : 'tsc'
}

const resolveFormatter = (): Formatter => (isPkgAvailable('oxfmt') ? 'both' : 'prettier')

/* eslint-disable sonarjs/cognitive-complexity -- config builder */

export const defineConfig = ({
  commands = {},
  formatter = resolveFormatter(),
  linter = resolveLinter(),
  stylelint = isPkgAvailable('stylelint'),
  tsconfig,
  typecheck = resolveTypecheck(tsconfig),
  typeCoverage = isPkgAvailable('type-coverage/package.json'),
  imagemin = isPkgAvailable('@pkgr/imagemin'),
}: NanoStagedOptions = {}): StagedConfig => {
  const config: StagedConfig = {}

  const cwd = process.cwd()
  const emptyIgnore = path.relative(
    cwd,
    fileURLToPath(new URL('../.oxfmt-empty-ignore', import.meta.url)),
  )
  const oxfmtIgnore = tryFile('.oxfmtignore', 'file', cwd)
  const oxfmtCommand = `oxfmt --ignore-path ${emptyIgnore}${
    oxfmtIgnore ? ' --ignore-path .oxfmtignore' : ''
  }`

  const command = {
    eslint: 'eslint --fix',
    oxfmt: oxfmtCommand,
    oxlint: 'oxlint --fix',
    prettier: 'prettier --write',
    stylelint: 'stylelint --allow-empty-input --cache --fix',
    ...commands,
  }

  const lintTask = [
    ...(linter === 'oxlint' || linter === 'both' ? [command.oxlint] : []),
    ...(linter === 'eslint' || linter === 'both' ? [command.eslint] : []),
  ]
  const stylelintTask = stylelint ? [command.stylelint] : []
  const dataLinterTask = linter === 'eslint' || linter === 'both' ? [command.eslint] : []
  let formatterCommand: string | null = null
  if (formatter === 'prettier') {
    formatterCommand = command.prettier
  } else if (formatter !== false) {
    formatterCommand = command.oxfmt
  }

  const codeTask = [...lintTask, ...(formatterCommand ? [formatterCommand] : [])]
  const styleTask = [...stylelintTask, ...(formatterCommand ? [formatterCommand] : [])]
  const dataTask = [...dataLinterTask, ...(formatterCommand ? [formatterCommand] : [])]

  if (codeTask.length > 0) {
    config[`*.{${CODE_FILES}}`] = codeTask
  }

  if (styleTask.length > 0) {
    config[`*.{${STYLE_FILES}}`] = styleTask
  }

  if (dataTask.length > 0) {
    config[`*.{${DATA_FILES}}`] = dataTask
  }

  if (formatter === 'prettier') {
    config['**/*.json'] = [...dataLinterTask, command.prettier]
    config[`*.{${PRETTIER_FILES}}`] = command.prettier
    config['.!(browserslist|nvm|yarn)rc'] = command.prettier
    config['Dockerfile'] = command.prettier
  } else if (formatter === 'oxfmt') {
    config['**/*.json'] = [...dataLinterTask, command.oxfmt]
  } else if (formatter === 'both') {
    // `prettier-plugin-pkg` only handles package.json; other JSON stays on Oxfmt.
    config['**/!(*package.json).json'] = [...dataLinterTask, command.oxfmt]
    config['**/package.json'] = [...dataLinterTask, command.prettier]
    config[`*.{${PRETTIER_FILES}}`] = command.prettier
    config['.!(browserslist|nvm|yarn)rc'] = command.prettier
    config['Dockerfile'] = command.prettier
  } else if (dataLinterTask.length > 0) {
    config['**/*.json'] = dataLinterTask
  }

  if (imagemin) {
    config['*.{gif,jpeg,jpg,png,svg,webp}'] = 'i'
  }

  if (typecheck) {
    const tsconfigPath = resolveTsconfig(tsconfig)
    const coverageTask = typeCoverage ? [`type-coverage -p ${tsconfigPath}`] : []

    if (typecheck === 'tsc') {
      config['*.{cts,mts,ts,tsx}'] = () => [`tsc -p ${tsconfigPath} --noEmit`, ...coverageTask]
    } else {
      config['*.{cts,mts,ts,tsx,vue}'] = () => [
        `vue-tsc -p ${tsconfigPath} --noEmit --incremental false`,
        ...coverageTask,
      ]
    }
  }

  return config
}

export default defineConfig()
