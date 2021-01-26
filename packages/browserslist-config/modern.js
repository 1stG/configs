module.exports = [
  require('.')
    .filter(_ => !_.includes('last') && !_.includes('CN'))
    .join(',') + ' and > 1% and last 3 versions and supports es6-module',
]
