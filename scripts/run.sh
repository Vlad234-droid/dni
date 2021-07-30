#!/bin/sh

if [ "$TYPEORM_RUN_MIGRATION" = "true" ]; then
    if [ "$TYPEORM_SCHEMA" != "" ]; then
        yarn ws:db typeorm query "CREATE SCHEMA IF NOT EXISTS \"$TYPEORM_SCHEMA\";" 
    fi
    yarn ws:db migration:run
fi

if [ "$CCRM_RUN_SYNC" = "true" ]; then
    yarn ws:server cli:cms-entities-init:prod
fi

yarn ws:server run:prod
