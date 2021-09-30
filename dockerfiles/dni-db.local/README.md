## Database startup

To start compose with Postgres DB run this command from `dockerfiles/dni-db.local` folder:
```shell
docker-compose up
```

To start in background add `-d` key, like this:
```shell
docker-compose up -d
```

## Database initialization
To initialize Database, run this command from `codebase` folder:
```shell
yarn ws:db migration:run
```
