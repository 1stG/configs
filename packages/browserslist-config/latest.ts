import not = require('./_not.js')

const config: string[] = [
  'defaults and last 1 version and fully supports es6-module',
  'last 2 node major versions and maintained node versions',
  ...not,
]

export = config
