---
"@1stg/postcss-config": minor
---

chore(deps): bump `cssnano-preset-advanced` to v10

The `advanced` preset no longer removes vendor prefixes or sorts declarations:
upstream dropped its bundled `autoprefixer` and `css-declaration-sorter`
dependencies, and the `autoprefixer` / `cssDeclarationSorter` preset options are
gone, so passing them has no effect.

Prefixes are still handled by the `autoprefixer` plugin this config already runs
before `cssnano` (with its default `remove: true`), so no CSS loses its prefixes;
only declaration order changes. To keep sorting declarations, add
`css-declaration-sorter` with `keepOverrides: true` to your own PostCSS plugin
list.
