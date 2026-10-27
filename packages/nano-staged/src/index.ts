import path from 'node:path'

import { isPkgAvailable, tryFile, tryPkg } from '@pkgr/utils'

export type Formatter = false | 'oxfmt' | 'prettier' | 'both'
export type Linter = false | 'oxlint' | 'eslint'
export type Typecheck = false | 'tsc' | 'vue-tsc'

export interface NanoStagedOptions {
  /** Command overrides, e.g. to pass a config file. */
  commands?: Partial<
    Record<'oxfmt' | 'oxlint' | 'prettier' | 'stylelint', string>
  >
  /** Base directory used to resolve `tsconfig`. @default process.cwd() */
  cwd?: string
  /** Formatter(s) to run. @default 'prettier' */
  formatter?: Formatter
  /** Linter to run before formatting. @default installed oxlint/eslint */
  linter?: Linter
  /** Run `stylelint --fix` on style files. @default installed stylelint */
  stylelint?: boolean
  /** Type-check command to run. @default false */
  typecheck?: Typecheck
  /** Explicit `tsconfig` path; discovered from `cwd` when omitted. */
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

/**
 * Resolve the `tsconfig` used by the type-check tasks.
 *
 * @returns A path relative to `cwd`.
 */
const resolveTsconfig = (cwd: string): string => {
  const tsconfig =
    tryFile(path.resolve(cwd, 'tsconfig.staged.json')) ||
    tryFile(path.resolve(cwd, 'tsconfig.json')) ||
    tryFile(path.resolve(cwd, 'tsconfig.base.json')) ||
    tryPkg('@1stg/tsconfig')

  if (!tsconfig) {
    throw new Error(
      '@1stg/nano-staged: no tsconfig found, pass `tsconfig` or disable `typecheck`',
    )
  }

  return path.relative(cwd, tsconfig)
}

const resolveLinter = (): NanoStagedOptions['linter'] => {
  if (isPkgAvailable('oxlint')) {
    return 'oxlint'
  }
  if (isPkgAvailable('eslint')) {
    return 'eslint'
  }
  return false
}

/* eslint-disable sonarjs/cognitive-complexity -- config builder */

export const defineConfig = ({
  commands = {},
  cwd = process.cwd(),
  formatter = 'prettier',
  linter = resolveLinter(),
  stylelint = isPkgAvailable('stylelint'),
  typecheck = false,
  tsconfig,
  typeCoverage = isPkgAvailable('type-coverage'),
  imagemin = isPkgAvailable('@pkgr/imagemin'),
}: NanoStagedOptions = {}): StagedConfig => {
  const config: StagedConfig = {}

  const command = {
    eslint: 'eslint --fix',
    oxfmt: 'oxfmt',
    oxlint: 'oxlint --fix',
    prettier: 'prettier --write',
    stylelint: 'stylelint --allow-empty-input --cache --fix',
    ...commands,
  }

  const lintTask = linter ? [command[linter]] : []
  const stylelintTask = stylelint ? [command.stylelint] : []
  const dataLinterTask = linter === 'eslint' ? [command.eslint] : []
  let formatterCommand: string | null = null
  if (formatter === 'prettier') {
    formatterCommand = command.prettier
  } else if (formatter !== false) {
    formatterCommand = command.oxfmt
  }

  const codeTask = [
    ...lintTask,
    ...(formatterCommand ? [formatterCommand] : []),
  ]
  const styleTask = [
    ...stylelintTask,
    ...(formatterCommand ? [formatterCommand] : []),
  ]
  const dataTask = [
    ...dataLinterTask,
    ...(formatterCommand ? [formatterCommand] : []),
  ]

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
    config['**/!(*package).json'] = [...dataLinterTask, command.oxfmt]
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
    const tsconfigPath = tsconfig ?? resolveTsconfig(cwd)
    const coverageTask = typeCoverage
      ? [`type-coverage -p ${tsconfigPath}`]
      : []

    if (typecheck === 'tsc') {
      config['*.ts?(x)'] = () => [
        `tsc -p ${tsconfigPath} --noEmit`,
        ...coverageTask,
      ]
    } else {
      config['*.{ts,tsx,vue}'] = () => [
        `vue-tsc -p ${tsconfigPath} --noEmit --incremental false`,
        ...coverageTask,
      ]
    }
  }

  return config
}

export default defineConfig()
