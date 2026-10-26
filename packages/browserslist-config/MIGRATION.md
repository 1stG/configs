# Migrating `@1stg/browserslist-config`

> Applies to **v2 → v3**.

The `alauda` and `alauda-legacy` entry points are removed:

```diff
-{ "browserslist": ["extends @1stg/browserslist-config/alauda"] }
+{ "browserslist": ["Chrome >= 85", "Firefox >= 80"] }
```

The root, `latest` and `modern` entry points are unchanged:

```json
{ "browserslist": ["extends @1stg/browserslist-config"] }
```
