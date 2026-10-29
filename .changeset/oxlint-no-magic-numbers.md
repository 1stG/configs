---
'@1stg/oxlint-config': minor
---

Enable the structural TypeScript-friendly `no-magic-numbers` defaults (array
indexes, default values, type indexes and numeric literal types) plus
`enforceConst`, curate the shared ignore list to common values, and expose all
rule options through `noMagicNumbers`, whose `ignore` is merged with the
shared list. `rules` overrides remain as-is. Named declarations (enums,
readonly/class fields and default parameters) count as naming the number;
`detectObjects` stays opt-in.
