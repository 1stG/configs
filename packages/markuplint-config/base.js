module.exports = {
  extends: ['markuplint:recommended'],
  rules: {
    'attr-duplication': true,
    'case-sensitive-tag-name': true,
    'deprecated-element': true,
    'id-duplication': true,
    'required-attr': true,
    'use-list': false,
  },
  excludeFiles: ['**/node_modules/**'],
}
