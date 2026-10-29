---
'@1stg/oxlint-config': minor
---

Enable the structural TypeScript-friendly `no-magic-numbers` defaults (array
indexes, default values, type indexes and numeric literal types) plus
`enforceConst`, reduce the shared ignore list to `-1`/`0`/`1`, and merge
consumer options/ignores with it. The named-declaration policy options stay
opt-in.
Add a dedicated `noMagicNumbers` option for domain constants.
