---
'@1stg/stylelint-config': major
---

Move syntax and plugin packages to optional peers: install `postcss-*` /
`stylelint-scss` only for the file types you lint, and the performance/browser
plugins only when you want their rules. Remove the unused `postcss-syntax`
dependency.
