// @ts-check

import path from 'node:path'

import { tryFile, tryPkg } from '@pkgr/utils'

/**
 * @typedef {object} NanoStagedOptions
 * @property {Partial<Record<'oxfmt' | 'oxlint' | 'prettier' | 'stylelint', string>>} [commands] Command overrides, e.g. to pass a config file.
 * @property {string} [cwd=process.cwd()] Base directory used to resolve `tsconfig`.
 * @property {false | 'oxfmt' | 'prettier' | 'both'} [formatter='prettier'] Formatter(s) to run.
 * @property {false | 'oxlint' | 'eslint'} [linter=false] Linter to run before formatting.
 * @property {boolean} [stylelint=false] Run `stylelint --fix` on style files.
 * @property {false | 'tsc' | 'ngc' | 'vue-tsc'} [typecheck=false] Type-check command to run.
 * @property {string} [tsconfig] Explicit `tsconfig` path; discovered from `cwd` when omitted.
 * @property {boolean} [typeCoverage=false] Run `type-coverage` together with the type-check.
 * @property {boolean} [imagemagick=false] Optimize image files with the `i` command.
 */

/** @typedef {string | string[] | (() => string | string[])} Task */
/** @typedef {Record<string, Task>} StagedConfig */

const CODE_FILES = 'cjs,cts,js,jsx,mjs,mts,ts,tsx,vue'
const STYLE_FILES = 'css,less,scss'
const DATA_FILES = 'gql,graphql,html,json,jsonc,json5,md,mdx,toml,yaml,yml'
const PRETTIER_FILES = 'ini,properties,pug,rb,sass,sh,styl,stylus'

/**
 * Resolve the `tsconfig` used by the type-check tasks.
 *
 * @param {string} cwd
 * @returns {string} A path relative to `cwd`.
 */
const resolveTsconfig = cwd => {
  const tsconfig =
    tryFile(path.resolve(cwd, 'tsconfig.staged.json')) ||
    tryFile(path.resolve(cwd, 'tsconfig.base.json')) ||
    tryFile(path.resolve(cwd, 'tsconfig.json')) ||
    tryPkg('@1stg/tsconfig')

  if (!tsconfig) {
    throw new Error(
      '@1stg/nano-staged: no tsconfig found, pass `tsconfig` or disable `typecheck`',
    )
  }

  return path.relative(cwd, tsconfig)
}

/**
 * @param {NanoStagedOptions} [options]
 * @returns {StagedConfig}
 */
export const createStaged = ({
  commands = {},
  cwd = process.cwd(),
  formatter = 'prettier',
  linter = false,
  stylelint = false,
  typecheck = false,
  tsconfig,
  typeCoverage = false,
  imagemagick = false,
} = {}) => {
  /** @type {StagedConfig} */
  const config = {}

  const command = {
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
    config[`*.{${PRETTIER_FILES}}`] = command.prettier
    config['.!(browserslist|nvm|yarn)rc'] = command.prettier
    config['Dockerfile'] = command.prettier
  } else if (formatter === 'oxfmt') {
    config[`*.{${CODE_FILES}}`] = [...lintTask, command.oxfmt]
    config[`*.{${STYLE_FILES}}`] = [...stylelintTask, command.oxfmt]
    config[`*.{${DATA_FILES}}`] = command.oxfmt
  } else if (formatter === 'both') {
    config[`*.{${CODE_FILES}}`] = [...lintTask, command.oxfmt]
    config[`*.{${STYLE_FILES}}`] = [...stylelintTask, command.oxfmt]
    config[`*.{${DATA_FILES}}`] = command.oxfmt
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

export default createStaged()
