# Migrating `@1stg/tsconfig`

## v5.0 → v5.1

The `lib` preset no longer enables `removeComments`, preserving JSDoc in
emitted declarations for editor hovers. It also enables `inlineSources` for
JavaScript source maps.

## v4 → v5

> Applies to **v4 → v5**.

The Angular presets (`angular.json`, `ng-lib.json`) are removed. The remaining
presets are still consumed with `"extends": "@1stg/tsconfig/..."`.
