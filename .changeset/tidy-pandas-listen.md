---
"@1stg/eslint-config": minor
---

chore(deps): bump `eslint-plugin-markup` to v2 and require Node.js `>=24.11.0`

`eslint-plugin-markup@2` needs Node.js `>=24`, so `@1stg/eslint-config` now
declares the intersection of its dependencies' engines. The plugin also moves to
`markuplint@^5`, which removes the duplicate markuplint 4 tree that the previous
release carried alongside markuplint 5.
