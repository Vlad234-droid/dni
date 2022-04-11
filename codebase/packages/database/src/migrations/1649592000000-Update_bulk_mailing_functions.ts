import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class Update_bulk_mailing_functions implements MigrationInterface {
  name = 'Update_bulk_mailing_functions-1649592000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    // -- =========================================
    // -- fn_get_dni_bulk_mailing_affected_entities
    // -- =========================================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_get_dni_bulk_mailing_affected_entities(
        p_entity ccms_entity_descriptor, 
        p_only_published boolean DEFAULT true
      )
      RETURNS SETOF ccms_entity_descriptor
      LANGUAGE plpgsql
      ROWS 8
      AS $function$
      BEGIN
        SET search_path TO "$user", ${schema}, public;
          
        RETURN QUERY WITH params AS (
          SELECT 
              p_entity AS entity
            , p_only_published AS only_published
        ),
        ancestor AS (
          SELECT ARRAY_AGG(ancestor) AS ancestors
          FROM (
            SELECT 
                params.only_published
              , UNNEST(
                  CASE ce.entity_type::TEXT
                    WHEN 'post' THEN COALESCE(CASE WHEN ce.parent_event IS NULL THEN NULL ELSE ARRAY[ce.parent_event] end, ce.parent_networks)
                    WHEN 'event' THEN ARRAY[ROW(ce.entity_id, ce.entity_type)::ccms_entity_descriptor]
                    ELSE ARRAY[]::ccms_entity_descriptor[]
                  END
                ) AS ancestor
            FROM params, ccms_entity ce
            LEFT JOIN ccms_entity pce
            ON ce.parent_event = ROW(pce.entity_id, pce.entity_type)::ccms_entity_descriptor
            WHERE ROW(ce.entity_id, ce.entity_type)::ccms_entity_descriptor = params.entity
          ) ace
          LEFT JOIN ccms_entity nce
          ON ace.ancestor = ROW(nce.entity_id, nce.entity_type)::ccms_entity_descriptor
          WHERE ace.only_published = FALSE OR nce.entity_published_at < current_timestamp
        ), 
        unnested AS (
          SELECT UNNEST(
            CASE COALESCE(ARRAY_LENGTH(ancestor.ancestors, 1), 0) 
              WHEN 0 THEN 
                ARRAY[NULL::ccms_entity_descriptor] 
              ELSE 
                ARRAY[]::ccms_entity_descriptor[] 
            END
            || ancestor.ancestors  
            ) AS ancestor
          FROM params, ancestor 
        )
        SELECT DISTINCT
            (unnested.ancestor)."id"
          , (unnested.ancestor)."type" 
        FROM unnested
        ;
      END
      $function$
      ;
    `);

    // -- ============================
    // -- fn_get_dni_bulk_mailing_data
    // -- ============================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_get_dni_bulk_mailing_data(
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
            fn_get_dni_bulk_mailing_affected_entities(
              p_entity := entity, 
              p_only_published := TRUE) AS ancestor
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
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    // -- ============================
    // -- fn_get_dni_bulk_mailing_data
    // -- ============================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_get_dni_bulk_mailing_data(
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

    // -- =========================================
    // -- fn_get_dni_bulk_mailing_affected_entities
    // -- =========================================
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS fn_get_dni_bulk_mailing_affected_entities;
    `);

  }
}
