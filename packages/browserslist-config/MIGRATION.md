# Migrating `@1stg/browserslist-config`

The `alauda` and `alauda-legacy` entry points are removed:

```diff
-{ "browserslist": ["extends @1stg/browserslist-config/alauda"] }
+{ "browserslist": ["Chrome >= 85", "Firefox >= 80"] }
```

The root, `latest` and `modern` entry points are unchanged:

```json
{ "browserslist": ["extends @1stg/browserslist-config"] }
```
