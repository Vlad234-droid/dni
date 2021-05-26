#!/bin/sh

if [ "$TYPEORM_RUN_MIGRATION" = "true" ]; then
    yarn ws:db migration:run
fi

yarn run:prod