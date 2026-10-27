---
'@1stg/eslint-config': minor
---

Add a `code` mode that lints JS/TS/JSX with `typescript-eslint` and
optional `eslint-plugin-regexp` / `eslint-plugin-sonarjs`, while `eslint-plugin-oxlint` keeps rules
already covered by Oxlint disabled. It is enabled automatically when `typescript-eslint` is installed; pass
`code: false` to disable it.
