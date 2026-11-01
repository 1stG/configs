---
"@1stg/nano-staged": minor
---

Auto-detect the type-check command from installed packages: `vue-tsc` first,
then `tsc` (via `typescript`), when a project tsconfig is discoverable; otherwise
disabled.
