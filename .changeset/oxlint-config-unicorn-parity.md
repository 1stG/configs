---
"@1stg/oxlint-config": minor
"@1stg/eslint-config": minor
---

Restore recommended-rule coverage by reusing `oxlint-config-recommended` for the
supported ESLint, typescript-eslint, and Unicorn rules. ESLint runs the five
Unicorn rules Oxlint does not yet support when code mode is enabled. Code mode
is inferred from `typescript-eslint`, so consumers without it keep it disabled.
