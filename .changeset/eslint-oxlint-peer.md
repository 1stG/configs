---
'@1stg/eslint-config': patch
---

Import `eslint-plugin-oxlint` statically and always apply its disable list.
The `oxlint: false` option is removed because omitting Oxlint would silently
skip those checks; Oxlint itself remains required through the plugin peer.
