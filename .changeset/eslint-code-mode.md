---
'@1stg/eslint-config': minor
---

Add an opt-in `code` mode that lints JS/TS/JSX with `typescript-eslint` and
optional `eslint-plugin-regexp` / `eslint-plugin-sonarjs`, while `eslint-plugin-oxlint` keeps rules
already covered by Oxlint disabled. It defaults to whether
`typescript-eslint` is installed; the repository enables it automatically.
