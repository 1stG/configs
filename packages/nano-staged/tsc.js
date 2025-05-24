import { tsconfig, typeCoverage } from './_utils.js'
import base from './base.js'

export default {
  ...base,
  '*.ts?(x)': () =>
    [
      `tsc -p ${tsconfig} --noEmit`,
      typeCoverage && `${typeCoverage} -p ${tsconfig}`,
    ].filter(Boolean),
}
