import { tsconfig, typeCoverage } from './_utils'
import base from './base.js'

export default {
  ...base,
  '*.{html,ts}': () => `ngc -p ${tsconfig} --noEmit`,
  '*.ts?(x)': () => [typeCoverage].filter(Boolean),
}
