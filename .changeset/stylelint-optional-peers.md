---
'@1stg/stylelint-config': minor
---

Move language-specific syntax packages to optional peers: install `postcss-*`
/ `stylelint-scss` only for the file types you lint. Remove the unused
`postcss-syntax` dependency.
