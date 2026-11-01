---
"@1stg/nano-staged": patch
---

Use a shipped empty ignore file for Oxfmt so explicitly staged files are not
filtered by `.gitignore`, while still avoiding Oxfmt's `.prettierignore`
default. Use `.oxfmtignore` instead of the empty fallback when present, and detect
`type-coverage` through its package metadata.
