import base from './base.js'

export default {
  ...base,
  parser: {
    '\\.html$': 'markuplint-angular-parser',
  },
}
