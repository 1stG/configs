/**
 * @type {Config}
 * @import { Config } from '@markuplint/ml-config'
 */
const base = {
  extends: ['markuplint:recommended'],
  rules: {
    'case-sensitive-tag-name': true,
    'no-deprecated-element': true,
    'no-duplicate-attr': true,
    'no-duplicate-id': true,
    'no-obsolete-element': true,
    'no-pseudo-list': false,
    'require-attr': true,
    'require-h1': false,
  },
  excludeFiles: ['**/node_modules/**'],
}

export default base
