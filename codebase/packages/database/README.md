# Diversity & Inclusion App (@dni/database)

## Prerequisites

Follow the [instructions](../../README.md#L13) of the root project

## Configuration for ENV (production/dev/stage)

Copy `.env.example` and rename to .env.[ENV] and configure correctly

```bash
$ cp .env.example .env.[ENV]
```

or

```bash
$ cp .env.example .env
```

where `[ENV] = production | dev | stage` and if missing it defaults to ''.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.

### Cleanup.

- Run `yarn clean:all` to remove build artifacts and dependencies in packages and at the root level.

### Docker

- Run `yarn docker:compose:up` create db.
- Run `yarn docker:compose:start` start db.
- Run `yarn docker:compose:down` stop db

### Migration

- Run `yarn migration:generate` generate migration.
- Run `yarn migration:create` create migration.
- Run `migration:show` show migrations
- Run `migration:run` run migration
- Run `migration:revert` revert migration

### Schema

- Run `yarn query` execute query.
- Run `yarn schema:sync` sync schema.
- Run `yarn schema:log` log schema.

### Entities & Subscribers

- Run `yarn entity:create` create entity.
- Run `yarn subscriber:create` create subscriber.
