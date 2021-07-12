#!/bin/sh

if [ "$TYPEORM_RUN_MIGRATION" = "true" ]; then

    yarn ws:db typeorm query "DROP TABLE IF EXISTS \"public\".\"notification\" CASCADE;"
    yarn ws:db typeorm query "DROP TABLE IF EXISTS \"public\".\"employee_history\" CASCADE;"
    yarn ws:db typeorm query "DROP TABLE IF EXISTS \"public\".\"employee_network\" CASCADE;"
    yarn ws:db typeorm query "DROP TABLE IF EXISTS \"public\".\"employee_event\" CASCADE;"
    yarn ws:db typeorm query "DROP TYPE IF EXISTS \"public\".\"notification_entity_type_enum\" CASCADE;"
    yarn ws:db typeorm query "DROP TYPE IF EXISTS \"public\".\"notification_action_enum\" CASCADE;"
    yarn ws:db typeorm query "DROP TYPE IF EXISTS \"public\".\"employee_history_entity_type_enum\" CASCADE;"
    yarn ws:db typeorm query "DROP TYPE IF EXISTS \"public\".\"employee_history_action_enum\" CASCADE;"

    if [ "$TYPEORM_SCHEMA" != "" ]; then
        yarn ws:db typeorm query "CREATE SCHEMA IF NOT EXISTS \"$TYPEORM_SCHEMA\";" 
    fi
    yarn ws:db migration:run
fi

if [ "$CCRM_RUN_SYNC" = "true" ]; then
    yarn ws:server cli:cms-entities-init:prod
fi

yarn run:prod
