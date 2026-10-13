---
"@1stg/markuplint-config": minor
---

chore(deps): bump `markuplint-angular-parser` to v4 and adopt markuplint 5 rule names

The angular preset now uses the parser release that targets markuplint 5
(`@markuplint/ml-ast@^5`, `@markuplint/parser-utils@^5`), so it no longer pulls
markuplint 4 internals alongside markuplint 5.

The base preset also swaps the rule names markuplint 5 deprecated (and removes in
v6) for the current ones: `attr-duplication` → `no-duplicate-attr`,
`id-duplication` → `no-duplicate-id`, `deprecated-element` →
`no-obsolete-element` plus `no-deprecated-element`, `required-attr` →
`require-attr`, `required-h1` → `require-h1` and `use-list` → `no-pseudo-list`.
