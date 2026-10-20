---
"@1stg/prettier-config": minor
---

chore(deps): bump `prettier-plugin-toml` to v4

`prettier-plugin-toml@4` loads tombi through its prebuilt native Node.js binding
instead of the WebAssembly build, so the ~6.6 MB `tombi_wasm_bg.wasm` is no
longer resolved and read on the first format, and
`@dual-bundle/import-meta-resolve` is gone. The plugin now requires Node.js
`>=20`, which this config's `^22.18.0 || >=24.11.0` already covers.

With 4.1, Prettier's core options (including its defaults) take precedence over a
discovered `tombi.toml`, and the plugin no longer ships `smol-toml` or a
JavaScript configuration cache. The exposed options and the formatting itself
are otherwise unchanged.
