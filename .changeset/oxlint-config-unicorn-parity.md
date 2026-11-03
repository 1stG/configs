---
"@1stg/oxlint-config": minor
"@1stg/eslint-config": minor
---

Restore recommended-rule coverage by reusing `oxlint-config-recommended` for the
supported ESLint, typescript-eslint, and Unicorn rules. ESLint reuses
`eslint-plugin-unicorn` recommended; `eslint-plugin-oxlint` disables the rules
already covered by Oxlint. Code mode is inferred from `typescript-eslint`, so
consumers without it keep it disabled. Unicorn rules that conflict with Oxfmt
comments or would force public API renames are disabled. The legacy TypeScript exception for
 is preserved.
