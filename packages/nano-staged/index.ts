import path from 'node:path'

import { tryFile, tryPkg } from '@pkgr/utils'

export type Formatter = false | 'oxfmt' | 'prettier' | 'both'
export type Linter = false | 'oxlint' | 'eslint'
export type Typecheck = false | 'tsc' | 'ngc' | 'vue-tsc'

export interface NanoStagedOptions {
  /** Command overrides, e.g. to pass a config file. */
  commands?: Partial<
    Record<'oxfmt' | 'oxlint' | 'prettier' | 'stylelint', string>
  >
  /** Base directory used to resolve `tsconfig`. @default process.cwd() */
  cwd?: string
  /** Formatter(s) to run. @default 'prettier' */
  formatter?: Formatter
  /** Linter to run before formatting. @default false */
  linter?: Linter
  /** Run `stylelint --fix` on style files. @default false */
  stylelint?: boolean
  /** Type-check command to run. @default false */
  typecheck?: Typecheck
  /** Explicit `tsconfig` path; discovered from `cwd` when omitted. */
  tsconfig?: string
  /** Run `type-coverage` together with the type-check. @default false */
  typeCoverage?: boolean
  /** Optimize image files with the `i` command. @default false */
  imagemagick?: boolean
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

export const defineConfig = ({
  commands = {},
  cwd = process.cwd(),
  formatter = 'prettier',
  linter = false,
  stylelint = false,
  typecheck = false,
  tsconfig,
  typeCoverage = false,
  imagemagick = false,
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

  if (formatter === 'prettier') {
    config[`*.{${CODE_FILES}}`] = [...lintTask, command.prettier]
    config[`*.{${STYLE_FILES}}`] = [...stylelintTask, command.prettier]
    config[`*.{${DATA_FILES}}`] = command.prettier
    config['**/*.json'] = command.prettier
    config[`*.{${PRETTIER_FILES}}`] = command.prettier
    config['.!(browserslist|nvm|yarn)rc'] = command.prettier
    config['Dockerfile'] = command.prettier
  } else if (formatter === 'oxfmt') {
    config[`*.{${CODE_FILES}}`] = [...lintTask, command.oxfmt]
    config[`*.{${STYLE_FILES}}`] = [...stylelintTask, command.oxfmt]
    config[`*.{${DATA_FILES}}`] = command.oxfmt
    config['**/*.json'] = command.oxfmt
  } else if (formatter === 'both') {
    config[`*.{${CODE_FILES}}`] = [...lintTask, command.oxfmt]
    config[`*.{${STYLE_FILES}}`] = [...stylelintTask, command.oxfmt]
    config[`*.{${DATA_FILES}}`] = command.oxfmt
    // `prettier-plugin-pkg` only handles package.json; other JSON stays on Oxfmt.
    config['**/!(*package).json'] = command.oxfmt
    config['**/package.json'] = command.prettier
    config[`*.{${PRETTIER_FILES}}`] = command.prettier
    config['.!(browserslist|nvm|yarn)rc'] = command.prettier
  }

  for (const [files, task] of Object.entries(config)) {
    if (Array.isArray(task) && task.length === 0) {
      delete config[files]
    }
  }

  if (imagemagick) {
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
    } else if (typecheck === 'ngc') {
      config['*.{html,ts}'] = () => [
        `ngc -p ${tsconfigPath} --noEmit`,
        ...coverageTask,
      ]
    } else if (typecheck === 'vue-tsc') {
      config['*.{ts,tsx,vue}'] = () => [
        `vue-tsc -p ${tsconfigPath} --noEmit --incremental false`,
        ...coverageTask,
      ]
    }
  }

  return config
}

export default defineConfig()
