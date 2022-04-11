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
                    WHEN 'event' THEN ce.parent_networks
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

    // -- =====================================
    // -- fn_get_dni_user_notification_raw_list
    // -- =====================================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_get_dni_user_notification_raw_list(
          p_colleague_uuid UUID
        , p_filter_entity_types dni_entity_type_enum[] DEFAULT ARRAY['event'::dni_entity_type_enum, 'post'::dni_entity_type_enum]
        , p_filter_subscription_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum]
        , p_return_only_non_acknowledged BOOLEAN DEFAULT TRUE
        , p_affected_interval INTERVAL DEFAULT '3 mons'::INTERVAL
      )
      RETURNS TABLE(
          colleague_uuid uuid
        , entity_type dni_entity_type_enum
        , entity_id integer
        , ancestors ccms_entity_descriptor[]
        , ancestors_count integer
        , notified_at timestamp with time zone
        , acknowledged_at timestamp with time zone
      )
      LANGUAGE plpgsql
      AS $function$
      BEGIN
        SET search_path TO "$user", dni, public;
        
        RETURN QUERY WITH params AS (
          SELECT
              p_colleague_uuid AS colleague_uuid
            , p_filter_entity_types AS filter_entity_types
            , p_filter_subscription_entity_types AS filter_subscription_entity_types
            , p_return_only_non_acknowledged AS return_only_non_acknowledged
            , p_affected_interval AS affected_interval
        ),
        entities_with_ancestors AS (
          SELECT 
              ce.entity_type
            , ce.entity_id
            , ce.entity_created_at
            , ce.entity_updated_at
            , ce.entity_published_at
            , ce.entity_deleted_at
            , COALESCE(ce.entity_updated_at, ce.entity_published_at) AS notified_at
            , ARRAY_REMOVE(
              CASE ce.entity_type::TEXT
                WHEN 'post' THEN COALESCE(CASE WHEN ce.parent_event IS NULL THEN NULL ELSE ARRAY[ce.parent_event] end, ce.parent_networks)
                WHEN 'event' THEN ce.parent_networks
                --WHEN 'network' THEN ARRAY[ROW(ce.entity_id, ce.entity_type)::ccms_entity_descriptor]
                ELSE ARRAY[]::ccms_entity_descriptor[]
              END
            , null) AS ancestors
        FROM params, ccms_entity ce
          LEFT JOIN ccms_entity pce
          ON ce.parent_event = ROW(pce.entity_id, pce.entity_type)::ccms_entity_descriptor
          WHERE ce.entity_type = ANY(params.filter_entity_types) 
            AND ce.entity_deleted_at IS NULL 
            AND ce.entity_published_at < CURRENT_TIMESTAMP 
            AND COALESCE(ce.entity_updated_at, ce.entity_published_at) > CURRENT_DATE - params.affected_interval
        ),
        all_entities AS (
          select 
              entities_with_ancestors.entity_type
            , entities_with_ancestors.entity_id
            , entities_with_ancestors.entity_created_at
            , entities_with_ancestors.entity_updated_at
            , entities_with_ancestors.entity_published_at
            , entities_with_ancestors.entity_deleted_at
            , entities_with_ancestors.notified_at
            , UNNEST(
                CASE COALESCE(ARRAY_LENGTH(entities_with_ancestors.ancestors, 1), 0) 
                WHEN 0 THEN ARRAY[NULL::ccms_entity_descriptor]
                ELSE entities_with_ancestors.ancestors 
                END
              ) as ancestor
          from entities_with_ancestors
        ),
        filtered_entities AS (
          SELECT 
              ae.entity_type
            , ae.entity_id
            , ae.entity_created_at
            , ae.entity_updated_at
            , ae.entity_published_at
            , ae.entity_deleted_at
            , ae.notified_at
            , ae.ancestor AS ancestor
          FROM params, all_entities ae
          LEFT JOIN ccms_entity ace
          ON ae.ancestor = ROW(ace.entity_id, ace.entity_type)::ccms_entity_descriptor
          WHERE (ae.ancestor)."type" IS NULL 
            OR ((ae.ancestor)."type" = ANY(params.filter_subscription_entity_types) AND ace.entity_published_at < CURRENT_TIMESTAMP)
        ),
        colleague_subsriptions AS (
          SELECT
              dus.colleague_uuid
            , dus.subscription_entity_id AS entity_id
            , dus.subscription_entity_type AS entity_type 
          FROM params, dni_user_subscription dus 
          WHERE dus.colleague_uuid = params.colleague_uuid
            AND dus.subscription_entity_type = ANY(params.filter_subscription_entity_types)
        ),
        subscribed_colleague_entities AS (
          SELECT 
              fe.entity_type
            , fe.entity_id
            , fe.entity_created_at
            , fe.entity_updated_at
            , fe.entity_published_at
            , fe.entity_deleted_at
            , fe.notified_at
            , fe.ancestor
          FROM filtered_entities fe
          LEFT JOIN colleague_subsriptions cs 
          ON fe.ancestor = ROW(cs.entity_id, cs.entity_type)::ccms_entity_descriptor
          WHERE (fe.ancestor)."id" IS NULL OR cs.colleague_uuid IS NOT NULL
        ),
        prepared_colleague_entities AS (
          SELECT  
              sce.entity_type
            , sce.entity_id
            , sce.entity_created_at
            , sce.entity_updated_at
            , sce.entity_published_at
            , sce.entity_deleted_at
            , MAX(sce.notified_at) AS notified_at
            , ARRAY_AGG(ancestor) FILTER (WHERE (ancestor)."type" IS NOT NULL) AS ancestors
          FROM params, subscribed_colleague_entities sce
          GROUP BY
              sce.entity_type
            , sce.entity_id
            , sce.entity_created_at
            , sce.entity_updated_at
            , sce.entity_published_at
            , sce.entity_deleted_at
        ),
        acknowledged_colleague_entities AS (
          SELECT 
              a.acknowledge_entity_id AS acknowledged_entity_id
            , a.acknowledge_entity_type AS acknowledged_entity_type
            , MAX(a.acknowledge_created_at) AS acknowledged_at
          FROM dni_user_notification_acknowledge a, params
          WHERE a.colleague_uuid = params.colleague_uuid
          GROUP BY 
              a.colleague_uuid
            , a.acknowledge_entity_id
            , a.acknowledge_entity_type
        )
        SELECT
            params.colleague_uuid AS colleague_uuid
          , pe.entity_type AS entity_type
          , pe.entity_id AS entity_id
          , pe.ancestors AS ancestors
          , COALESCE(array_length(pe.ancestors, 1), 0) AS ancestors_count
          , pe.notified_at AS notified_at
          , ack.acknowledged_at AS acknowledged_at
        FROM params, prepared_colleague_entities pe
        LEFT JOIN acknowledged_colleague_entities ack
        ON pe.entity_id = ack.acknowledged_entity_id AND pe.entity_type = ack.acknowledged_entity_type
        WHERE return_only_non_acknowledged = FALSE OR (ack.acknowledged_at IS NULL) 
        ;
      END
      $function$
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    // -- =====================================
    // -- fn_get_dni_user_notification_raw_list
    // -- =====================================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_get_dni_user_notification_raw_list(
          p_colleague_uuid UUID
        , p_filter_entity_types dni_entity_type_enum[] DEFAULT ARRAY['event'::dni_entity_type_enum, 'post'::dni_entity_type_enum]
        , p_filter_subscription_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum]
        , p_return_only_non_acknowledged BOOLEAN DEFAULT TRUE
        , p_affected_interval INTERVAL DEFAULT '3 mons'::INTERVAL
      )
      RETURNS TABLE(
          colleague_uuid uuid
        , entity_type dni_entity_type_enum
        , entity_id integer
        , ancestors ccms_entity_descriptor[]
        , ancestors_count integer
        , notified_at timestamp with time zone
        , acknowledged_at timestamp with time zone
      )
      LANGUAGE plpgsql
      AS $function$
      BEGIN
        SET search_path TO "$user", dni, public;
        
        RETURN QUERY WITH params AS (
          SELECT
              p_colleague_uuid AS colleague_uuid
            , p_filter_entity_types AS filter_entity_types
            , p_filter_subscription_entity_types AS filter_subscription_entity_types
            , p_return_only_non_acknowledged AS return_only_non_acknowledged
            , p_affected_interval AS affected_interval
        ),
        entities_with_ancestors AS (
          SELECT 
              ce.entity_type
            , ce.entity_id
            , ce.entity_created_at
            , ce.entity_updated_at
            , ce.entity_published_at
            , ce.entity_deleted_at
            , COALESCE(ce.entity_updated_at, ce.entity_published_at) AS notified_at
            , ARRAY_REMOVE(pce.parent_networks || ce.parent_networks || ce.parent_event, null) AS ancestors
          FROM params, ccms_entity ce
          LEFT JOIN ccms_entity pce
          ON ce.parent_event = ROW(pce.entity_id, pce.entity_type)::ccms_entity_descriptor
          WHERE ce.entity_type = ANY(params.filter_entity_types) 
            AND ce.entity_deleted_at IS NULL 
            AND ce.entity_published_at < CURRENT_TIMESTAMP 
            AND COALESCE(ce.entity_updated_at, ce.entity_published_at) > CURRENT_DATE - params.affected_interval
        ),
        all_entities AS (
          select 
              entities_with_ancestors.entity_type
            , entities_with_ancestors.entity_id
            , entities_with_ancestors.entity_created_at
            , entities_with_ancestors.entity_updated_at
            , entities_with_ancestors.entity_published_at
            , entities_with_ancestors.entity_deleted_at
            , entities_with_ancestors.notified_at
            , UNNEST(
                CASE COALESCE(ARRAY_LENGTH(entities_with_ancestors.ancestors, 1), 0) 
                WHEN 0 THEN ARRAY[NULL::ccms_entity_descriptor]
                ELSE entities_with_ancestors.ancestors 
                END
              ) as ancestor
          from entities_with_ancestors
        ),
        filtered_entities AS (
          SELECT 
              ae.entity_type
            , ae.entity_id
            , ae.entity_created_at
            , ae.entity_updated_at
            , ae.entity_published_at
            , ae.entity_deleted_at
            , ae.notified_at
            , ae.ancestor AS ancestor
          FROM params, all_entities ae
          LEFT JOIN ccms_entity ace
          ON ae.ancestor = ROW(ace.entity_id, ace.entity_type)::ccms_entity_descriptor
          WHERE (ae.ancestor)."type" IS NULL 
            OR ((ae.ancestor)."type" = ANY(params.filter_subscription_entity_types) AND ace.entity_published_at < CURRENT_TIMESTAMP)
        ),
        colleague_subsriptions AS (
          SELECT
              dus.colleague_uuid
            , dus.subscription_entity_id AS entity_id
            , dus.subscription_entity_type AS entity_type 
          FROM params, dni_user_subscription dus 
          WHERE dus.colleague_uuid = params.colleague_uuid
            AND dus.subscription_entity_type = ANY(params.filter_subscription_entity_types)
        ),
        subscribed_colleague_entities AS (
          SELECT 
              fe.entity_type
            , fe.entity_id
            , fe.entity_created_at
            , fe.entity_updated_at
            , fe.entity_published_at
            , fe.entity_deleted_at
            , fe.notified_at
            , fe.ancestor
          FROM filtered_entities fe
          LEFT JOIN colleague_subsriptions cs 
          ON fe.ancestor = ROW(cs.entity_id, cs.entity_type)::ccms_entity_descriptor
          WHERE (fe.ancestor)."id" IS NULL OR cs.colleague_uuid IS NOT NULL
        ),
        prepared_colleague_entities AS (
          SELECT  
              sce.entity_type
            , sce.entity_id
            , sce.entity_created_at
            , sce.entity_updated_at
            , sce.entity_published_at
            , sce.entity_deleted_at
            , MAX(sce.notified_at) AS notified_at
            , ARRAY_AGG(ancestor) FILTER (WHERE (ancestor)."type" IS NOT NULL) AS ancestors
          FROM params, subscribed_colleague_entities sce
          GROUP BY
              sce.entity_type
            , sce.entity_id
            , sce.entity_created_at
            , sce.entity_updated_at
            , sce.entity_published_at
            , sce.entity_deleted_at
        ),
        acknowledged_colleague_entities AS (
          SELECT 
              a.acknowledge_entity_id AS acknowledged_entity_id
            , a.acknowledge_entity_type AS acknowledged_entity_type
            , MAX(a.acknowledge_created_at) AS acknowledged_at
          FROM dni_user_notification_acknowledge a, params
          WHERE a.colleague_uuid = params.colleague_uuid
          GROUP BY 
              a.colleague_uuid
            , a.acknowledge_entity_id
            , a.acknowledge_entity_type
        )
        SELECT
            params.colleague_uuid AS colleague_uuid
          , pe.entity_type AS entity_type
          , pe.entity_id AS entity_id
          , pe.ancestors AS ancestors
          , COALESCE(array_length(pe.ancestors, 1), 0) AS ancestors_count
          , pe.notified_at AS notified_at
          , ack.acknowledged_at AS acknowledged_at
        FROM params, prepared_colleague_entities pe
        LEFT JOIN acknowledged_colleague_entities ack
        ON pe.entity_id = ack.acknowledged_entity_id AND pe.entity_type = ack.acknowledged_entity_type
        WHERE return_only_non_acknowledged = FALSE OR (ack.acknowledged_at IS NULL) 
        ;
      END
      $function$
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
