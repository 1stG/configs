---
"@1stg/nano-staged": minor
---

Auto-detect the formatter consistently with the linter: `both` only when
Oxfmt and Prettier are installed, `oxfmt` or `prettier` when only one is
installed, otherwise disabled. Prettier is now an optional peer dependency.
