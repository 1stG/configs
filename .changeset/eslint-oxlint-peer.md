---
'@1stg/eslint-config': minor
---

Make `oxlint` an explicit required peer. The config already relies on
`eslint-plugin-oxlint` to disable rules owned by Oxlint, so omitting Oxlint
would silently skip those checks.
