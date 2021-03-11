# Diversity & Inclusion (dni)

This [monorepo](https://danluu.com/monorepo/) contains the menagerie of
applications

This application requires `yarn v.1.22.x` and `node v.14.4.x`.

## Monorepo based on Lerna & Yarn Workspaces

- Lerna - https://github.com/lerna/lerna
- Workspaces - https://classic.yarnpkg.com/en/docs/workspaces

## Prerequisites

### 1. Install tools

- Yarn - https://yarnpkg.com

Check that Yarn is installed by running: `yarn --version`

- NodeJS - https://nodejs.org

Check that NodeJS is installed by running: `node --version`

### 2. Install dependencies

All projects are managed by Lerna with Yarn Workspaces. Before
starting any of the applications, do the following to ensure all
dependencies are satisfied.

1.  Ensure you are in the top level root directory.
2.  Install top level packages by running: `yarn bootstrap`

### 3. Login into the private npm registry

Login into our private npm repository with your TPX (in lower case) and password

```
yarn npmrc:create '<TPX>:<password>'
```

## Configuration

1. Client. [Check out](packages/client/README.md#L5) for details
2. Server. [Check out](packages/server/README.md#L13) for details

## Available Scripts

Ensure you are in the top level root directory.

### Running project in development mode

- Run `yarn run:dev` to start in the development mode.
- Run `yarn run:local:dev` to start in the development mode with mock-server.
- Run `yarn run:prod` to start in the production mode.
- Run `yarn run:dev:server` to start server in development mode.
- Run `yarn run:dev:client` to start client in development mode.
- Run `yarn ws:client storybook` to start Storybook locally.
- Run `yarn ws:client build-storybook` to output a static Storybook in the `storybook-static` directory, which can then be deployed to any static site hosting service..

### Building project in production mode

- Run `yarn build:prod` to build.

### Bootstrap the packages in the repo. Installs all of their dependencies and links any cross-dependencies.

- Run `yarn bootstrap` to bootstrap.

### Cleanup.

- Run `yarn clean` to remove build artifact in packages.
- Run `yarn clean:all` to remove build artifacts and dependencies in packages and at the root level.

### Test.

- Run `yarn test` to run tests.
- Run `yarn test:coverage` to collect coverage.

- Run `yarn ws:client test` to run client tests.
- Run `yarn ws:server test` to run server tests.
- Run `yarn ws:mock-server test` to run mock-server tests.

## Packages

### server

The `server` is for production.

### client

The `client` is for UI part

### mock-server

The `mock-server` is only for development to enable developing against a
mocked data store.

## Work with packages

### Add dependency to package

- Run `ws:server add [-D] [PACKAGE]` to add dependency to package `server`
- Run `ws:client add [-D] [PACKAGE]` to add dependency to package `client`
- Run `ws:mock-server add [-D] [PACKAGE]` to add dependency to package `mock-server`

- Run `ws:connector:colleague add [-D] [PACKAGE]` to add dependency to package `colleague-api`
- Run `ws:connector:colleague-cms add [-D] [PACKAGE]` to add dependency to package `colleague-cms-api`
- Run `ws:connector:confirmit add [-D] [PACKAGE]` to add dependency to package `confirmit-api`
- Run `ws:connector:common add [-D] [PACKAGE]` to add dependency to package `common`

## Docker

Your TPX (in lower case) and password

- Run `docker:build:prod '<TPX>:<password>'` to build image
- Run `docker:run:prod` to run docker image
