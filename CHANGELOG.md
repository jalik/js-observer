# Changelog

## v2.0.1 (2024-02-19)

- Fixed CJS file reference in package.json

## v2.0.0 (2024-02-19)

- **[BREAKING]** Use `Map` instead of `Array` to manage event listeners
- **[BREAKING]** Renamed `attach()` to `on()`
- **[BREAKING]** Renamed `detach()` to `off()`
- **[BREAKING]** Renamed `notify()` to `emit()`
- **[BREAKING]** Removed default export of `Observer` (use named import)
- **[BREAKING]** Changed CJS build output directory
- Added TypeScript generics to set context and event types (`Observer<Context, Event>`)
- Upgraded dependencies

## v1.2.1 (2023-04-14)

- Added missing dev dependency (rimraf)

## v1.2.0 (2023-04-14)

- Added TypeScript declaration files

## v1.1.14 (2022-10-18)

- Upgraded dependencies

## v1.1.13 (2021-09-20)

- Upgraded dependencies

## v1.1.12 (2021-06-14)

- Upgraded dependencies

## v1.1.11 (2021-05-18)

- Upgraded dependencies

## v1.1.10 (2021-01-18)

- Upgraded dependencies

## v1.1.9 (2020-11-10)

- Added `esnext` and `sideEffects` in package.json
- Renamed observer.js to Observer.js
- Upgraded dependencies

## v1.1.8 (2020-11-10) (deprecated)

**This version has been published with unwanted changes and has been deprecated right after.**

- Renamed observer.js to index.js

## v1.1.7 (2020-09-17)

- Upgraded dependencies

## v1.1.6 (2020-08-06)

- Upgraded dependencies

## v1.1.5 (2020-02-18)

- Upgraded dependencies

## v1.1.4 (2019-12-02)

- Upgraded dependencies

## v1.1.3 (2019-07-24)

- Upgraded dependencies

## v1.1.2 (2019-02-26)

- Upgraded dependencies

## v1.1.1 (2019-02-26)

- Upgraded dependencies

## v1.1.0 (2019-02-07)

- Lib available in ES6+ syntax (see `src` folder) to enable auto-completion in IDEs

## v1.0.6 (2019-01-17)

- Upgraded dependencies

## v1.0.5 (2018-10-10)

- Removed unused devDependencies

## v1.0.4 (2018-10-10)

- Upgraded devDependencies

## v1.0.3 (2018-06-07)

- Upgraded devDependencies

## v1.0.2 (2018-03-11)

- Export `Observer` using ES6 default export

## v1.0.1 (2017-11-21)

- Upgraded README

## v1.0.0 (2017-11-19)

- First public release
