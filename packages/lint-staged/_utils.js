import path from 'node:path'

import { isPkgAvailable, tryFile, tryPkg } from '@pkgr/utils'

export const tsconfig = path.relative(
  process.cwd(),
  tryFile(path.resolve('tsconfig.staged.json')) ||
    tryFile(path.resolve('tsconfig.base.json')) ||
    tryFile(path.resolve('tsconfig.json')) ||
    tryPkg('@1stg/tsconfig'),
)

export const typeCoverage =
  isPkgAvailable('type-coverage/bin/type-coverage') && 'type-coverage'
