// @ts-check

import path from 'node:path'

import { preferPrettier } from '@1stg/config'
import {
  isMonorepo,
  isPkgAvailable,
  getMonorepoPkgs,
  tryRequirePkg,
  tryFile,
  tryPkg,
} from '@pkgr/utils'
import configPrettier from 'eslint-config-prettier'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'

/** @type {string[]} */
let allowModules = []

if (isMonorepo()) {
  allowModules = getMonorepoPkgs().reduce((acc, pkg) => {
    const pkgJson = tryRequirePkg(path.resolve(pkg, 'package.json'))
    if (!pkgJson) {
      return acc
    }
    const { name, peerDependencies = {}, dependencies = {} } = pkgJson
    // eslint-disable-next-line unicorn-x/prefer-spread
    return acc.concat(
      name,
      Object.keys(peerDependencies),
      Object.keys(dependencies),
    )
  }, /** @type {string[]} */ ([]))
}

export { allowModules }

export const isTsAvailable = isPkgAvailable('typescript')

export const isWebpackAvailable =
  isPkgAvailable('webpack') || isPkgAvailable('@rspack/core')

export const isReactPluginAvailable = isPkgAvailable(
  '@eslint-react/eslint-plugin',
)

export const webpackSpecVars = [
  '__non_webpack_require__',
  '__resourceQuery',
  '__webpack_chunk_load__',
  '__webpack_exports_info__',
  '__webpack_hash__',
  '__webpack_modules__',
  '__webpack_public_path__',
  '__webpack_require__',
  '__webpack_runtime_id__',
  'DEBUG',
]

export const magicNumbers = [
  -1, 0, 1, 2, 3, 5, 7, 10, 12, 15, 20, 24, 30, 31, 50, 60, 100, 365, 366, 500,
  768, 1000, 1024, 3600, 4200, 8080,
]

export const prettierExtends = tseslint.config(
  preferPrettier ? configPrettier : prettierRecommended,
)

export const project =
  tryFile('tsconfig.eslint.json') ||
  tryFile('tsconfig.base.json') ||
  tryFile('tsconfig.json') ||
  tryPkg('@1stg/tsconfig')

export const nonSourceRules = /** @type {const} */ ({
  'n/no-extraneous-import': 0,
  'n/no-extraneous-require': 0,
  'n/no-unsupported-features/es-builtins': 0,
})
