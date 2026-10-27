# Migrating `@1stg/config`

> No breaking change; stays on the current **v1.x** line.

No public API change. The glob lists (`iniRcFiles`, `shRcFiles`,
`nonJsonRcFiles`, `jsoncFiles`) and `isEnvEnabled`/`isEnvDisabled` keep their
signatures. The package now ships compiled declarations from TypeScript.
