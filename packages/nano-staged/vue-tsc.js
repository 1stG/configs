import { tsconfig, typeCoverage } from './_utils.js'
import base from './base.js'

export default {
  ...base,
  '*.{vue,ts,tsx}': () =>
    [
      `vue-tsc -p ${tsconfig} --noEmit --incremental false`,
      typeCoverage,
    ].filter(Boolean),
}
