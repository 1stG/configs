/**
 * @type {Config}
 * @import { Config } from '@markuplint/ml-config'
 */
const base = {
  extends: ['markuplint:recommended'],
  rules: {
    'attr-duplication': true,
    'case-sensitive-tag-name': true,
    'deprecated-element': true,
    'id-duplication': true,
    'required-attr': true,
    'required-h1': false,
    'use-list': false,
  },
  excludeFiles: ['**/node_modules/**'],
}

export default base
