---
"@1stg/nano-staged": patch
---

Use a shipped empty ignore file for Oxfmt so explicitly staged files are not
filtered by `.gitignore`, while still avoiding Oxfmt's `.prettierignore`
default. Use `.oxfmtignore` instead of the empty fallback when present, detect
`type-coverage` through its package metadata, and let fully ignored Oxfmt tasks
succeed with `--no-error-on-unmatched-pattern`.
