import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class Rename_functions implements MigrationInterface {
  name = 'Rename_functions-1648450809000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    // -- =======================================================================
    // -- fn_get_ccms_entity_all_ancestors_3 --> fn_get_ccms_entity_all_ancestors
    // -- =======================================================================
    await queryRunner.query(`
      ALTER FUNCTION fn_get_ccms_entity_all_ancestors_3 RENAME TO fn_get_ccms_entity_all_ancestors;

      CREATE OR REPLACE FUNCTION fn_get_dni_bulk_mailing_data_3(
        p_entity ccms_entity_descriptor
      )
      RETURNS TABLE(colleague_uuid uuid)
      LANGUAGE plpgsql
      AS $function$
      BEGIN
        IF p_entity IS NULL 
        THEN
          RAISE EXCEPTION '"p_entity" parameter is required';
        END IF;
      
        IF p_entity."type" IS NULL
        THEN
          RAISE EXCEPTION '"p_entity.type" parameter is required'
            USING HINT = 'These options are available: "event", "post"';
        END IF;
      
        IF p_entity."id" IS NULL
        THEN
          RAISE EXCEPTION '"p_entity.id" parameter is required';
        END IF;
      
        SET search_path TO "$user", dni, public;
      
        RETURN QUERY WITH params AS (
          SELECT 
            p_entity AS entity
        ),
        ancestors AS (
          SELECT
            params.entity,
            fn_get_ccms_entity_all_ancestors(
              p_entity := entity, 
              p_only_published := TRUE,
              p_empty_if_none := FALSE) AS ancestor
          FROM params 
          JOIN ccms_entity ce 
          ON ce.entity_type = (params.entity)."type" AND ce.entity_id = (params.entity)."id"
        ),
        subscribed_colleagues AS (
          SELECT 
            settings.colleague_uuid
          FROM (
            SELECT 
              due.colleague_uuid as colleague_uuid,
              CASE (params.entity)."type"
                WHEN 'post' then coalesce(due.settings ->> 'receivePostsEmailNotifications', 'false')::BOOLEAN
                WHEN 'event' then coalesce(due.settings ->> 'receiveEventsEmailNotifications', 'false')::BOOLEAN
                ELSE FALSE
              END AS receive_notifications
            FROM params, dni_user_extras due
          ) settings
          WHERE receive_notifications = TRUE
        ),
        affected_colleagues AS (
          SELECT 
            DISTINCT sc.colleague_uuid
          FROM ancestors a
          CROSS JOIN subscribed_colleagues sc
          LEFT JOIN dni_user_subscription dus 
          ON sc.colleague_uuid = dus.colleague_uuid 
          WHERE (a.ancestor) IS NULL 
            OR ((a.ancestor)."type" = dus.subscription_entity_type AND (a.ancestor)."id" = dus.subscription_entity_id)
        )
        SELECT 
          ac.colleague_uuid
        FROM affected_colleagues ac
        ;
      END
      $function$
    `);

    // -- =========================================================================
    // -- fn_get_ccms_entity_root_ancestors_3 --> fn_get_ccms_entity_root_ancestors
    // -- =========================================================================
    await queryRunner.query(`
      ALTER FUNCTION fn_get_ccms_entity_root_ancestors_3 RENAME TO fn_get_ccms_entity_root_ancestors;
    `);

    // -- ===============================================================
    // -- fn_get_dni_bulk_mailing_data_3 --> fn_get_dni_bulk_mailing_data
    // -- ===============================================================
    await queryRunner.query(`
      ALTER FUNCTION fn_get_dni_bulk_mailing_data_3 RENAME TO fn_get_dni_bulk_mailing_data;
    `);

    // -- ===========================================================================================
    // -- fn_get_dni_user_notification_enriched_list_3 --> fn_get_dni_user_notification_enriched_list
    // -- ===========================================================================================
    await queryRunner.query(`
      ALTER FUNCTION fn_get_dni_user_notification_enriched_list_3 RENAME TO fn_get_dni_user_notification_enriched_list;
    `);

    // -- ===========================================================================================
    // -- fn_get_dni_user_notification_groupped_list_3 --> fn_get_dni_user_notification_groupped_list
    // -- ===========================================================================================
    await queryRunner.query(`
      ALTER FUNCTION fn_get_dni_user_notification_groupped_list_3 RENAME TO fn_get_dni_user_notification_groupped_list;
    `);

    // -- =================================================================================
    // -- fn_get_dni_user_notification_raw_list_3 --> fn_get_dni_user_notification_raw_list
    // -- =================================================================================
    await queryRunner.query(`
      ALTER FUNCTION fn_get_dni_user_notification_raw_list_3 RENAME TO fn_get_dni_user_notification_raw_list;
    `);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    // -- =================================================================================
    // -- fn_get_dni_user_notification_raw_list --> fn_get_dni_user_notification_raw_list_3
    // -- =================================================================================
    await queryRunner.query(`
      ALTER FUNCTION fn_get_dni_user_notification_raw_list RENAME TO fn_get_dni_user_notification_raw_list_3;
    `);

    // -- ===========================================================================================
    // -- fn_get_dni_user_notification_groupped_list --> fn_get_dni_user_notification_groupped_list_3
    // -- ===========================================================================================
    await queryRunner.query(`
      ALTER FUNCTION fn_get_dni_user_notification_groupped_list RENAME TO fn_get_dni_user_notification_groupped_list_3;
    `);

    // -- ===========================================================================================
    // -- fn_get_dni_user_notification_enriched_list --> fn_get_dni_user_notification_enriched_list_3
    // -- ===========================================================================================
    await queryRunner.query(`
      ALTER FUNCTION fn_get_dni_user_notification_enriched_list RENAME TO fn_get_dni_user_notification_enriched_list_3;
    `);

    // -- ===============================================================
    // -- fn_get_dni_bulk_mailing_data --> fn_get_dni_bulk_mailing_data_3
    // -- ===============================================================
    await queryRunner.query(`
      ALTER FUNCTION fn_get_dni_bulk_mailing_data RENAME TO fn_get_dni_bulk_mailing_data_3;
    `);

    // -- =========================================================================
    // -- fn_get_ccms_entity_root_ancestors --> fn_get_ccms_entity_root_ancestors_3
    // -- =========================================================================
    await queryRunner.query(`
      ALTER FUNCTION fn_get_ccms_entity_root_ancestors RENAME TO fn_get_ccms_entity_root_ancestors_3;
    `);

    // -- =======================================================================
    // -- fn_get_ccms_entity_all_ancestors --> fn_get_ccms_entity_all_ancestors_3
    // -- =======================================================================
    await queryRunner.query(`
      ALTER FUNCTION fn_get_ccms_entity_all_ancestors RENAME TO fn_get_ccms_entity_all_ancestors_3;

      CREATE OR REPLACE FUNCTION fn_get_dni_bulk_mailing_data_3(
        p_entity ccms_entity_descriptor
      )
      RETURNS TABLE(colleague_uuid uuid)
      LANGUAGE plpgsql
      AS $function$
      BEGIN
        IF p_entity IS NULL 
        THEN
          RAISE EXCEPTION '"p_entity" parameter is required';
        END IF;
      
        IF p_entity."type" IS NULL
        THEN
          RAISE EXCEPTION '"p_entity.type" parameter is required'
            USING HINT = 'These options are available: "event", "post"';
        END IF;
      
        IF p_entity."id" IS NULL
        THEN
          RAISE EXCEPTION '"p_entity.id" parameter is required';
        END IF;
      
        SET search_path TO "$user", dni, public;
      
        RETURN QUERY WITH params AS (
          SELECT 
            p_entity AS entity
        ),
        ancestors AS (
          SELECT
            params.entity,
            fn_get_ccms_entity_all_ancestors_3(
              p_entity := entity, 
              p_only_published := TRUE,
              p_empty_if_none := FALSE) AS ancestor
          FROM params 
          JOIN ccms_entity ce 
          ON ce.entity_type = (params.entity)."type" AND ce.entity_id = (params.entity)."id"
        ),
        subscribed_colleagues AS (
          SELECT 
            settings.colleague_uuid
          FROM (
            SELECT 
              due.colleague_uuid as colleague_uuid,
              CASE (params.entity)."type"
                WHEN 'post' then coalesce(due.settings ->> 'receivePostsEmailNotifications', 'false')::BOOLEAN
                WHEN 'event' then coalesce(due.settings ->> 'receiveEventsEmailNotifications', 'false')::BOOLEAN
                ELSE FALSE
              END AS receive_notifications
            FROM params, dni_user_extras due
          ) settings
          WHERE receive_notifications = TRUE
        ),
        affected_colleagues AS (
          SELECT 
            DISTINCT sc.colleague_uuid
          FROM ancestors a
          CROSS JOIN subscribed_colleagues sc
          LEFT JOIN dni_user_subscription dus 
          ON sc.colleague_uuid = dus.colleague_uuid 
          WHERE (a.ancestor) IS NULL 
            OR ((a.ancestor)."type" = dus.subscription_entity_type AND (a.ancestor)."id" = dus.subscription_entity_id)
        )
        SELECT 
          ac.colleague_uuid
        FROM affected_colleagues ac
        ;
      END
      $function$
    `);
  }
}
