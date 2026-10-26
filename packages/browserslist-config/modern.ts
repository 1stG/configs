import not = require('./_not.js')

const config: string[] = [
  'defaults and > 0.5% and last 3 versions and fully supports es6-module',
  'maintained node versions',
  ...not,
]

export = config
