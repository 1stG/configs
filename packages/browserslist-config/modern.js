module.exports = require('.')
  .filter(_ => !(_.includes('last') || _.includes('CN')))
  .concat(
    '> 1%',
    'last 3 versions',
    'not and_qq < 2',
    'not and_uc < 13',
    'not baidu < 8',
    'not bb < 11',
    'not ie <= 11',
    'not ie_mob <= 11',
    'not kaios < 3',
    'not op_mini all',
    'not op_mob < 50',
    'not samsung < 10',
  )
