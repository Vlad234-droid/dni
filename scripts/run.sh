#!/bin/sh

if [ "$TYPEORM_RUN_MIGRATION" = "true" ]; then
    if [ "$TYPEORM_SCHEMA" != "" ]; then
        yarn ws:db typeorm query "CREATE SCHEMA IF NOT EXISTS \"$TYPEORM_SCHEMA\";" 
    fi

    yarn ws:db migration:run
    yarn ws:db migration:show
fi

if [ "$CCMS_RUN_SYNC" = "true" ]; then
        yarn ws:db cli:ccms-sync
fi

yarn ws:server start
