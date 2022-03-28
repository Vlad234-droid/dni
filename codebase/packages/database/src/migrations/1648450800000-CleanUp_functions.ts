import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class CleanUp_functions implements MigrationInterface {
  name = 'CleanUp_functions-1648450800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    // -- ====================
    // -- Drop redundant casts
    // -- ====================
    await queryRunner.query(`
      DROP CAST IF EXISTS (text as dni_entity_type_enum);
      DROP FUNCTION IF EXISTS fn_dni_convert_text_to_entity_type;
      DROP FUNCTION IF EXISTS fn_dni_is_entity_type;
    `);

    // -- ========================
    // -- Drop redundant functions
    // -- ========================
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS fn_get_dni_bulk_mailing_data;
      DROP FUNCTION IF EXISTS fn_get_dni_user_notification_enriched_list;
      DROP FUNCTION IF EXISTS fn_get_dni_user_notification_enriched_list_2;
      DROP FUNCTION IF EXISTS fn_get_dni_user_notification_groupped_list;
      DROP FUNCTION IF EXISTS fn_get_dni_user_notification_groupped_list_2;
      DROP FUNCTION IF EXISTS fn_get_dni_user_notification_raw_list;
      DROP FUNCTION IF EXISTS fn_get_dni_user_notification_raw_list_2;

      DROP FUNCTION IF EXISTS fn_get_ccms_entity_root_ancestors;
      DROP FUNCTION IF EXISTS fn_get_ccms_entity_all_ancestors;
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    //#region Resore redundant functions

    // -- ================================
    // -- fn_get_ccms_entity_all_ancestors
    // -- ================================
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS fn_get_ccms_entity_all_ancestors;
    `);

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_get_ccms_entity_all_ancestors(
          p_entity ccms_entity_descriptor
        , p_only_published boolean DEFAULT true
        , p_empty_if_none boolean DEFAULT true
        )
      RETURNS SETOF ccms_entity_descriptor
      LANGUAGE plpgsql
      ROWS 16
      AS $function$
      BEGIN
        SET search_path TO "$user", dni, public;
          
        RETURN QUERY WITH RECURSIVE entities(
          entity_id, 
          entity_type, 
          parent_entity_id, 
          parent_entity_type
        ) AS (
          SELECT 
            init.entity_id, 
            init.entity_type, 
            (init.parent_entity)."id" AS parent_entity_id, 
            (init.parent_entity)."type" AS parent_entity_type 
          FROM (
            SELECT 
              NULL::int4 AS entity_id, 
              NULL::dni_entity_type_enum AS entity_type, 
              UNNEST(CASE COALESCE(ARRAY_LENGTH(parents, 1), 0) WHEN 0 THEN ARRAY[NULL::ccms_entity_descriptor] ELSE parents END) AS parent_entity
            FROM ccms_entity
            WHERE entity_id = p_entity."id" AND entity_type = p_entity."type"
              AND ((entity_published_at IS NOT NULL) OR (p_only_published = FALSE))
              AND entity_deleted_at IS NULL
          ) init
          UNION
          SELECT 
            ee.entity_id, 
            ee.entity_type, 
            (ee.parent_entity)."id" as parent_entity_id, 
            (ee.parent_entity)."type" as parent_entity_type 
          FROM (
            SELECT 
              ce.entity_id, 
              ce.entity_type, 
              UNNEST(CASE COALESCE(ARRAY_LENGTH(ce.parents, 1), 0) WHEN 0 THEN ARRAY[NULL::ccms_entity_descriptor] ELSE ce.parents END) AS parent_entity,
              ce.entity_published_at,
              ce.entity_deleted_at
            FROM ccms_entity ce
          ) ee 
          JOIN entities
          ON  entities.parent_entity_id = ee.entity_id AND entities.parent_entity_type = ee.entity_type 
          WHERE ((ee.entity_published_at IS NOT NULL) OR (p_only_published = FALSE))
            AND ee.entity_deleted_at IS NULL
            -- additional dummy check for circular recursion
            AND ee.entity_id <> p_entity.id AND ee.entity_type <> p_entity."type"
        )
        SELECT DISTINCT
          (unnested.entity)."id", 
          (unnested.entity)."type" 
        FROM (
        SELECT UNNEST(
          CASE COALESCE(ARRAY_LENGTH(ARRAY_AGG(entity_id), 1), 0) 
            WHEN 0 THEN 
              CASE p_empty_if_none 
                WHEN FALSE THEN 
                  ARRAY[NULL::ccms_entity_descriptor] 
                ELSE 
                  ARRAY[]::ccms_entity_descriptor[] 
              END
            ELSE 
              ARRAY[]::ccms_entity_descriptor[] 
          END
          || ARRAY_AGG((entity_id,entity_type)::ccms_entity_descriptor)  
          ) as entity
          FROM entities 
            WHERE entities.entity_id IS NOT NULL 
              AND entities.entity_type IS NOT NULL
        ) unnested
        ;
      END
      $function$
    `);

    // -- =================================
    // -- fn_get_ccms_entity_root_ancestors
    // -- =================================
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS fn_get_ccms_entity_root_ancestors;
    `);

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_get_ccms_entity_root_ancestors(
          p_entity ccms_entity_descriptor
        , p_only_published boolean DEFAULT true
        , p_empty_if_none boolean DEFAULT true
        )
      RETURNS SETOF ccms_entity_descriptor
      LANGUAGE plpgsql
      ROWS 16
      AS $function$
      BEGIN
        SET search_path TO "$user", dni, public;
          
        RETURN QUERY WITH RECURSIVE entities(
          entity_id, 
          entity_type, 
          parent_entity_id, 
          parent_entity_type
        ) AS (
          SELECT 
            init.entity_id, 
            init.entity_type, 
            (init.parent_entity)."id" AS parent_entity_id, 
            (init.parent_entity)."type" AS parent_entity_type 
          FROM (
            SELECT 
              NULL::int4 AS entity_id, 
              NULL::dni_entity_type_enum AS entity_type, 
              UNNEST(CASE COALESCE(ARRAY_LENGTH(parents, 1), 0) WHEN 0 THEN ARRAY[NULL::ccms_entity_descriptor] ELSE parents END) AS parent_entity
            FROM ccms_entity
              WHERE entity_id = p_entity."id" AND entity_type = p_entity."type"
                AND ((entity_published_at IS NOT NULL) OR (p_only_published = FALSE))
                AND entity_deleted_at IS NULL
          ) init
          UNION
            SELECT 
              ee.entity_id, 
              ee.entity_type, 
              (ee.parent_entity)."id" as parent_entity_id, 
              (ee.parent_entity)."type" as parent_entity_type 
            FROM (
              SELECT 
              ce.entity_id, 
              ce.entity_type, 
              UNNEST(CASE COALESCE(ARRAY_LENGTH(ce.parents, 1), 0) WHEN 0 THEN ARRAY[NULL::ccms_entity_descriptor] ELSE ce.parents END) AS parent_entity,
              ce.entity_published_at,
              ce.entity_deleted_at
            FROM ccms_entity ce
          ) ee 
          JOIN entities
          ON entities.parent_entity_id = ee.entity_id AND entities.parent_entity_type = ee.entity_type 
          WHERE ((ee.entity_published_at IS NOT NULL) OR (p_only_published = FALSE))
            AND ee.entity_deleted_at IS NULL
            -- additional dummy check for circular recursion
            AND ee.entity_id <> p_entity.id AND ee.entity_type <> p_entity."type"
        )
        SELECT 
          entity_id AS "id", 
          entity_type AS "type"
        FROM (
          SELECT DISTINCT entity_id, entity_type
          FROM entities
          WHERE parent_entity_type IS NULL 
            AND parent_entity_id IS NULL
        ) ancestors
        WHERE p_empty_if_none = FALSE OR (p_empty_if_none = TRUE AND entity_id IS NOT NULL AND entity_type IS NOT NULL)
        ;
      END
      $function$
    `);

    // -- =======================================
    // -- fn_get_dni_user_notification_raw_list_2
    // -- =======================================
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS fn_get_dni_user_notification_raw_list_2;
    `);

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_get_dni_user_notification_raw_list_2(
          p_colleague_uuid UUID
        , p_filter_entity_types dni_entity_type_enum[] DEFAULT ARRAY['event'::dni_entity_type_enum, 'post'::dni_entity_type_enum]
        , p_filter_subscription_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum]
        , p_return_only_non_acknowledged boolean DEFAULT TRUE
        , p_affected_interval INTERVAL DEFAULT '3 mons'::INTERVAL
        )
      RETURNS TABLE(
          colleague_uuid UUID
        , entity_type dni_entity_type_enum
        , entity_id INTEGER
        , ancestors ccms_entity_descriptor[]
        , ancestors_count INTEGER
        , notified_at TIMESTAMP WITH TIME ZONE
        , acknowledged_at TIMESTAMP WITH TIME ZONE
        )
      LANGUAGE plpgsql
      AS $function$
      BEGIN
        SET search_path TO "$user", dni, public;
        
        RETURN QUERY WITH params AS (
          SELECT
            p_colleague_uuid AS colleague_uuid,
            p_filter_entity_types AS filter_entity_types,
            p_filter_subscription_entity_types AS filter_subscription_entity_types,
            p_return_only_non_acknowledged AS return_only_non_acknowledged,
            p_affected_interval AS affected_interval
        ),
        all_entities AS (
          SELECT 
            ce.entity_type,
            ce.entity_id,
            ce.entity_created_at,
            ce.entity_updated_at,
            ce.entity_published_at,
            ce.entity_deleted_at,
            coalesce(
              ce.entity_updated_at, 
              ce.entity_published_at) AS notified_at,
            fn_get_ccms_entity_all_ancestors(
              p_entity := ROW(ce.entity_id , ce.entity_type), 
              p_only_published := true,
              p_empty_if_none := false) AS ancestor
          FROM params, ccms_entity ce
          WHERE ce.entity_type = ANY(params.filter_entity_types) 
            AND ce.entity_deleted_at IS NULL 
            AND ce.entity_published_at IS NOT NULL 
            AND COALESCE(ce.entity_updated_at, ce.entity_published_at) > CURRENT_DATE - params.affected_interval
        ),
        filtered_entities AS (
          SELECT 
            ae.entity_type,
            ae.entity_id,
            ae.entity_created_at,
            ae.entity_updated_at,
            ae.entity_published_at,
            ae.entity_deleted_at,
            ae.notified_at,
            (ae.ancestor)."id" AS ancestor_id,
            (ae.ancestor)."type" AS ancestor_type
          FROM params, all_entities ae
          WHERE (ae.ancestor)."type" IS NULL
              OR (ae.ancestor)."type" = ANY(params.filter_subscription_entity_types) 
        ),
        colleague_subsriptions AS (
          SELECT
            dus.colleague_uuid,
            dus.subscription_entity_id AS entity_id,
            dus.subscription_entity_type AS entity_type 
          FROM params, dni_user_subscription dus 
          WHERE dus.colleague_uuid = params.colleague_uuid
            AND dus.subscription_entity_type = ANY(params.filter_subscription_entity_types)
        ),
        subscribed_colleague_entities AS (
          SELECT 
            fe.entity_type,
            fe.entity_id,
            fe.entity_created_at,
            fe.entity_updated_at,
            fe.entity_published_at,
            fe.entity_deleted_at,
            fe.notified_at,
            fe.ancestor_id,
            fe.ancestor_type
          FROM filtered_entities fe
          LEFT JOIN colleague_subsriptions cs 
          ON fe.ancestor_id = cs.entity_id AND fe.ancestor_type = cs.entity_type
          WHERE fe.ancestor_id IS NULL OR cs.colleague_uuid IS NOT NULL
        ),
        prepared_colleague_entities AS (
          SELECT  
            sce.entity_type,
            sce.entity_id,
            sce.entity_created_at,
            sce.entity_updated_at,
            sce.entity_published_at,
            sce.entity_deleted_at,
            max(sce.notified_at) AS notified_at,
            array_agg((ancestor_id, ancestor_type)::ccms_entity_descriptor) FILTER (WHERE ancestor_type IS NOT NULL) AS ancestors
          FROM params, subscribed_colleague_entities sce
          GROUP BY
            sce.entity_type,
            sce.entity_id,
            sce.entity_created_at,
            sce.entity_updated_at,
            sce.entity_published_at,
            sce.entity_deleted_at
        ),
        acknowledged_colleague_entities AS (
          SELECT 
            a.acknowledge_entity_id AS acknowledged_entity_id, 
            a.acknowledge_entity_type AS acknowledged_entity_type, 
            max(a.acknowledge_created_at) AS acknowledged_at
          FROM dni_user_notification_acknowledge a, params
          WHERE a.colleague_uuid = params.colleague_uuid
          GROUP BY 
            a.colleague_uuid, 
            a.acknowledge_entity_id, 
            a.acknowledge_entity_type
        )
        SELECT
          params.colleague_uuid AS colleague_uuid,
          pe.entity_type AS entity_type,
          pe.entity_id AS entity_id,
          pe.ancestors AS ancestors,
          coalesce(array_length(pe.ancestors, 1), 0) AS ancestors_count,
          pe.notified_at AS notified_at,
          ack.acknowledged_at AS acknowledged_at
        FROM params, prepared_colleague_entities pe
        LEFT JOIN acknowledged_colleague_entities ack
        ON pe.entity_id = ack.acknowledged_entity_id AND pe.entity_type = ack.acknowledged_entity_type
        WHERE return_only_non_acknowledged = FALSE OR (ack.acknowledged_at IS NULL) 
        ;
      END
      $function$
    `);

    // -- =====================================
    // -- fn_get_dni_user_notification_raw_list
    // -- =====================================
    await queryRunner.query(
        `CREATE OR REPLACE FUNCTION fn_get_dni_user_notification_raw_list(
              p_colleague_uuid uuid, 
              p_filter_entity_types dni_entity_type_enum[] DEFAULT ARRAY['event'::dni_entity_type_enum, 'post'::dni_entity_type_enum], 
              p_filter_subscription_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum], 
              p_return_only_non_acknowledged boolean DEFAULT true)
          RETURNS TABLE(
              colleague_uuid uuid, 
              entity_type dni_entity_type_enum, 
              entity_id integer, 
              parent_entity_type dni_entity_type_enum, 
              parent_entity_id integer, 
              root_ancestor_type dni_entity_type_enum, 
              root_ancestor_id integer, 
              notified_at timestamp with time zone, 
              acknowledged_at timestamp with time zone)
          LANGUAGE plpgsql
        AS $function$
        BEGIN
            SET search_path TO "$user", dni, public;
        
            RETURN QUERY SELECT 
              p_colleague_uuid as colleague_uuid,
              all_entities.entity_type as entity_type,
              all_entities.entity_id as entity_id,
              all_entities.parent_entity_type as parent_entity_type,
              all_entities.parent_entity_id as parent_entity_id,
              (all_entities.root_ancestor).type as root_ancestor_type,
              (all_entities.root_ancestor).id as root_ancestor_id,
              coalesce(
                  all_entities.entity_updated_at, 
                  all_entities.entity_published_at, 
                  all_entities.entity_created_at, now()) as notified_at,
              recent_acknowledge.acknowledged_at
            FROM (
              SELECT 
                  ce.entity_type,
                  ce.entity_id,
                  ce.parent_entity_type,
                  ce.parent_entity_id,
                  ce.entity_created_at,
                  ce.entity_updated_at,
                  ce.entity_published_at,
                  ce.entity_deleted_at,
                  fn_get_ccms_entity_root_ancestor(
                    p_entity := ROW(ce.entity_id , ce.entity_type), 
                    p_only_published := true) as root_ancestor
              FROM ccms_entity ce
              WHERE ce.entity_type = ANY(p_filter_entity_types) 
                  AND ce.entity_deleted_at IS NULL 
                  AND ce.entity_published_at IS NOT NULL 
            ) all_entities 
            LEFT JOIN dni_user_subscription dus 
              ON (all_entities.root_ancestor).id = dus.subscription_entity_id 
              AND (all_entities.root_ancestor).type = dus.subscription_entity_type
            LEFT JOIN fn_get_dni_user_recent_notification_acknowledgement(p_colleague_uuid) recent_acknowledge
              ON all_entities.entity_id = recent_acknowledge.acknowledged_entity_id
              AND all_entities.entity_type = recent_acknowledge.acknowledged_entity_type
            WHERE (((root_ancestor).type = ANY(p_filter_subscription_entity_types)  AND dus.colleague_uuid = p_colleague_uuid)
              OR (root_ancestor IS NULL AND dus.colleague_uuid IS NULL))
              AND (p_return_only_non_acknowledged = FALSE OR recent_acknowledge.acknowledged_at IS NULL)
            ;
        END
        $function$
        ;`,
      );
  
    // -- ============================================
    // -- fn_get_dni_user_notification_groupped_list_2
    // -- ============================================
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS fn_get_dni_user_notification_groupped_list_2;
    `);

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_get_dni_user_notification_groupped_list_2(
          p_colleague_uuid UUID
        , p_filter_entity_types dni_entity_type_enum[] DEFAULT ARRAY['event'::dni_entity_type_enum, 'post'::dni_entity_type_enum]
        , p_filter_subscription_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum, 'event'::dni_entity_type_enum]
        , p_filter_root_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum]
        , p_return_only_non_acknowledged boolean DEFAULT TRUE
        , p_return_only_one_ancestor_per_entity BOOLEAN DEFAULT TRUE
        , p_affected_interval INTERVAL DEFAULT '3 mons'::INTERVAL)
      RETURNS TABLE(
          ancestor_type dni_entity_type_enum
        , ancestor_id INTEGER
        , ancestor_instance JSONB
        , recent_notified_at TIMESTAMP WITH TIME ZONE
        , nested_total INTEGER
        , nested_as_object JSONB
        , nested_as_array JSONB
        )
      LANGUAGE plpgsql
      AS $function$
      BEGIN
        SET search_path TO "$user", dni, public;
        
        RETURN QUERY WITH params AS (
          SELECT 
            p_colleague_uuid AS colleague_uuid,
            p_filter_entity_types AS filter_entity_types, 
            p_filter_subscription_entity_types AS filter_subscription_entity_types, 
            p_filter_root_entity_types AS filter_root_entity_types,
            p_return_only_non_acknowledged AS return_only_non_acknowledged,
            p_return_only_one_ancestor_per_entity AS return_only_one_ancestor_per_entity,
            p_affected_interval AS affected_interval
        ),
        unnested_entities AS (
          SELECT 
            fn.colleague_uuid, 
            fn.entity_type,
            fn.entity_id,
            unnest(CASE fn.ancestors_count WHEN 0 THEN ARRAY[NULL::ccms_entity_descriptor] ELSE fn.ancestors END) AS ancestor,
            fn.ancestors_count,
            fn.notified_at,
            fn.acknowledged_at
          FROM params, fn_get_dni_user_notification_raw_list_2(
            p_colleague_uuid := params.colleague_uuid, 
            p_filter_entity_types := params.filter_entity_types, 
            p_filter_subscription_entity_types := params.filter_subscription_entity_types, 
            p_return_only_non_acknowledged := params.return_only_non_acknowledged, 
            p_affected_interval := params.affected_interval) fn
        ),
        ranked_entities AS (
          SELECT 
            ue.colleague_uuid, 
            ue.entity_type,
            ue.entity_id,
            CASE WHEN (ue.ancestor)."type" = ANY(params.filter_root_entity_types) THEN (ue.ancestor)."type" ELSE NULL END AS ancestor_type,
            CASE WHEN (ue.ancestor)."type" = ANY(params.filter_root_entity_types) THEN (ue.ancestor)."id" ELSE NULL END AS ancestor_id,
            ue.notified_at,
            ue.acknowledged_at,
            row_number() OVER (
              PARTITION BY ue.entity_type, ue.entity_id 
              ORDER BY fn_dni_get_entity_type_sort_rank((ue.ancestor)."type"), (ue.ancestor)."id") AS row_rank
          FROM params, unnested_entities ue
        ),
        aggregated_entities AS (
          SELECT 
            re.ancestor_type,
            re.ancestor_id,
            re.entity_type,
            ARRAY_AGG(re.entity_id) AS entity_ids,
            MAX(re.notified_at) AS recent_notified_at,
            count(*) AS count_entity_ids
          FROM params, ranked_entities re
          WHERE params.return_only_one_ancestor_per_entity = FALSE OR re.row_rank = 1
          GROUP BY
            re.ancestor_type,
            re.ancestor_id,
            re.entity_type
        ),
        prepared_entities AS (
          SELECT 
            ae.ancestor_type,
            ae.ancestor_id,
            MAX(ae.recent_notified_at) AS recent_notified_at,
            jsonb_object_agg(ae.entity_type, ae.entity_ids) AS nested_as_object,
            jsonb_agg(jsonb_build_object('entity_type', ae.entity_type, 'entities_ids', ae.entity_ids)) AS nested_as_array,
            sum(ae.count_entity_ids)::INTEGER AS nested_total
          FROM aggregated_entities ae
          GROUP BY
            ae.ancestor_type,
            ae.ancestor_id
        )
        SELECT 
          pe.ancestor_type,
          pe.ancestor_id,
          CASE WHEN pe.ancestor_id IS NULL THEN NULL ELSE jsonb_build_object(
            'id', pe.ancestor_id,
            'type', pe.ancestor_type,
            'slug', ce.entity_instance -> 'slug',
            'image', ce.entity_instance -> 'image',
            'shortDescription', ce.entity_instance -> 'shortDescription',
            'title', ce.entity_instance -> 'title',
            'archived', ce.entity_instance -> 'archived',
            'reactions', ce.entity_instance -> 'reactions',
            'authorName', ce.entity_instance -> 'authorName',
            'authorLocation', ce.entity_instance -> 'authorLocation'
          ) END AS ancestor_instance,
          pe.recent_notified_at,
          pe.nested_total,
          pe.nested_as_object,
          pe.nested_as_array
        FROM prepared_entities pe
        LEFT JOIN ccms_entity ce 
        ON pe.ancestor_type = ce.entity_type AND pe.ancestor_id = ce.entity_id 
        ;
      END
      $function$
    `);

    // -- ==========================================
    // -- fn_get_dni_user_notification_groupped_list
    // -- ==========================================
    await queryRunner.query(
        `CREATE OR REPLACE FUNCTION fn_get_dni_user_notification_groupped_list(
              p_colleague_uuid uuid, 
              p_filter_entity_types dni_entity_type_enum[] DEFAULT ARRAY['event'::dni_entity_type_enum, 'post'::dni_entity_type_enum], 
              p_filter_subscription_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum, 'event'::dni_entity_type_enum]
              )
          RETURNS TABLE(
              root_ancestor_type dni_entity_type_enum, 
              root_ancestor_id integer, 
              root_ancestor_instance jsonb, 
              details_as_object jsonb, 
              details_as_array jsonb, 
              recent_notified_at timestamp with time zone, 
              total_entities_count integer)
          LANGUAGE plpgsql
        AS $function$
        BEGIN
            SET search_path TO "$user", dni, public;
        
            RETURN QUERY WITH 
              params AS (SELECT 
                  p_colleague_uuid as colleague_uuid,
                  p_filter_entity_types as filter_entity_types, 
                  p_filter_subscription_entity_types as filter_subscription_entity_types, 
                  TRUE::boolean as return_only_non_acknowledged
              ),
              raw_notifications AS (SELECT
                  fn.entity_type as entity_type,
                  jsonb_agg(fn.entity_id) AS entity_ids,
                  fn.root_ancestor_type AS root_ancestor_type,
                  fn.root_ancestor_id AS root_ancestor_id,
                  max(fn.notified_at) AS recent_notified_at,
                  COUNT(*) as entities_count
              FROM params, fn_get_dni_user_notification_raw_list(
                  p_colleague_uuid := colleague_uuid
                  , p_filter_entity_types := filter_entity_types
                  , p_filter_subscription_entity_types := filter_subscription_entity_types
                  , p_return_only_non_acknowledged := return_only_non_acknowledged
              ) fn
              GROUP BY
                  fn.entity_type,
                  fn.colleague_uuid, 
                  fn.root_ancestor_id, 
                  fn.root_ancestor_type
              ),
              aggregated_notifications AS (SELECT 
                  rn.root_ancestor_type,
                  rn.root_ancestor_id,
                  root.entity_instance as root_ancestor_instance,
                  jsonb_object_agg(rn.entity_type, rn.entity_ids) as details_as_object,
                  jsonb_agg(jsonb_build_object('entityType', rn.entity_type, 'entitiesIds', rn.entity_ids)) as details_as_array,
                  MAX(rn.recent_notified_at) AS recent_notified_at,
                  SUM(rn.entities_count) as total_entities_count
              FROM raw_notifications rn
              LEFT JOIN ccms_entity root
              ON rn.root_ancestor_id = root.entity_id AND rn.root_ancestor_type = root.entity_type
              GROUP BY
                  rn.root_ancestor_type,
                  rn.root_ancestor_id,
                  root.entity_instance
              )
            SELECT 
              an.root_ancestor_type,
              an.root_ancestor_id,
              an.root_ancestor_instance,
              an.details_as_object,
              an.details_as_array,
              an.recent_notified_at,
              an.total_entities_count::integer as total_entities_count
            FROM aggregated_notifications an
            ORDER BY an.recent_notified_at DESC
            ;
        
        END
        $function$
        ;`,
      );
  
    // -- ============================================
    // -- fn_get_dni_user_notification_enriched_list_2
    // -- ============================================
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS fn_get_dni_user_notification_enriched_list_2;
    `);

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_get_dni_user_notification_enriched_list_2(
          p_colleague_uuid UUID
        , p_filter_entity_types dni_entity_type_enum[] DEFAULT ARRAY['event'::dni_entity_type_enum, 'post'::dni_entity_type_enum]
        , p_filter_subscription_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum, 'event'::dni_entity_type_enum]
        , p_filter_root_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum]
        , p_return_only_non_acknowledged BOOLEAN DEFAULT TRUE
        , p_return_only_one_ancestor_per_entity BOOLEAN DEFAULT TRUE
        , p_affected_interval INTERVAL DEFAULT '3 mons'::INTERVAL)
      RETURNS TABLE(
          entity_type dni_entity_type_enum
        , entity_id INTEGER
        , entity_instance JSONB
        , ancestor_type dni_entity_type_enum
        , ancestor_id INTEGER
        , ancestor_instance JSONB
        , notified_at TIMESTAMP WITH TIME ZONE
        , acknowledged_at TIMESTAMP WITH TIME ZONE
        )
      LANGUAGE plpgsql
      AS $function$
      BEGIN
        SET search_path TO "$user", dni, public;
          
        RETURN QUERY WITH params AS (
          SELECT 
            p_colleague_uuid AS colleague_uuid,
            p_filter_entity_types AS filter_entity_types, 
            p_filter_subscription_entity_types AS filter_subscription_entity_types, 
            p_filter_root_entity_types AS filter_root_entity_types,
            p_return_only_non_acknowledged AS return_only_non_acknowledged,
            p_return_only_one_ancestor_per_entity AS return_only_one_ancestor_per_entity,
            p_affected_interval AS affected_interval
        ),
        unnested_entities AS (
          SELECT 
            fn.colleague_uuid, 
            fn.entity_type,
            fn.entity_id,
            unnest(CASE fn.ancestors_count WHEN 0 THEN ARRAY[NULL::ccms_entity_descriptor] ELSE fn.ancestors END) AS ancestor,
            fn.ancestors_count,
            fn.notified_at,
            fn.acknowledged_at
          FROM params, fn_get_dni_user_notification_raw_list_2(
            p_colleague_uuid := params.colleague_uuid, 
            p_filter_entity_types := params.filter_entity_types, 
            p_filter_subscription_entity_types := params.filter_subscription_entity_types, 
            p_return_only_non_acknowledged := params.return_only_non_acknowledged, 
            p_affected_interval := params.affected_interval) fn
        ),
        ranked_entities AS (
          SELECT 
            ue.colleague_uuid, 
            ue.entity_type,
            ue.entity_id,
            CASE WHEN (ue.ancestor)."type" = ANY(params.filter_root_entity_types) THEN (ue.ancestor)."type" ELSE NULL END AS ancestor_type,
            CASE WHEN (ue.ancestor)."type" = ANY(params.filter_root_entity_types) THEN (ue.ancestor)."id" ELSE NULL END AS ancestor_id,
            ue.notified_at,
            ue.acknowledged_at,
            row_number() OVER (
              PARTITION BY ue.entity_type, ue.entity_id 
              ORDER BY fn_dni_get_entity_type_sort_rank((ue.ancestor)."type"), (ue.ancestor)."id") AS row_rank
          FROM params, unnested_entities ue
        )
        SELECT 
          re.entity_type,
          re.entity_id,
          CASE WHEN re.entity_id IS NULL THEN NULL ELSE jsonb_build_object(
            'id', re.entity_id,
            'type', re.entity_type,
            'slug', entity.entity_instance -> 'slug',
            'image', entity.entity_instance -> 'image',
            'shortDescription', entity.entity_instance -> 'shortDescription',
            'title', entity.entity_instance -> 'title',
            'archived', entity.entity_instance -> 'archived',
            'reactions', entity.entity_instance -> 'reactions',
            'authorName', entity.entity_instance -> 'authorName',
            'authorLocation', entity.entity_instance -> 'authorLocation'
          ) END AS entity_instance,
          re.ancestor_type,
          re.ancestor_id,
          CASE WHEN re.ancestor_id IS NULL THEN NULL ELSE jsonb_build_object(
            'id', re.ancestor_id,
            'type', re.ancestor_type,
            'slug', ancestor.entity_instance -> 'slug',
            'image', ancestor.entity_instance -> 'image',
            'shortDescription', ancestor.entity_instance -> 'shortDescription',
            'title', ancestor.entity_instance -> 'title',
            'archived', ancestor.entity_instance -> 'archived',
            'reactions', ancestor.entity_instance -> 'reactions',
            'authorName', ancestor.entity_instance -> 'authorName',
            'authorLocation', ancestor.entity_instance -> 'authorLocation'
          ) END AS ancestor_instance,
          re.notified_at,
          re.acknowledged_at
        FROM params, ranked_entities re
        LEFT JOIN ccms_entity entity
        ON re.entity_id = entity.entity_id AND re.entity_type = entity.entity_type
        LEFT JOIN ccms_entity ancestor
        ON re.ancestor_id = ancestor.entity_id AND re.ancestor_type = ancestor.entity_type
        WHERE params.return_only_one_ancestor_per_entity = FALSE OR re.row_rank = 1
        ORDER BY re.notified_at DESC
        ;
      END
      $function$
    `);

    // -- ==========================================
    // -- fn_get_dni_user_notification_enriched_list
    // -- ==========================================
    await queryRunner.query(
        `CREATE OR REPLACE FUNCTION fn_get_dni_user_notification_enriched_list(
              p_colleague_uuid uuid, 
              p_filter_entity_types dni_entity_type_enum[] DEFAULT ARRAY['event'::dni_entity_type_enum, 'post'::dni_entity_type_enum], 
              p_filter_subscription_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum, 'event'::dni_entity_type_enum]
              )
          RETURNS TABLE(
              entity_type dni_entity_type_enum, 
              entity_id integer, 
              entity_instance jsonb, 
              root_ancestor_type dni_entity_type_enum, 
              root_ancestor_id integer, 
              root_ancestor_instance jsonb, 
              parent_entity_type dni_entity_type_enum, 
              parent_entity_id integer, 
              parent_entity_instance jsonb, 
              notified_at timestamp with time zone)
          LANGUAGE plpgsql
        AS $function$
        BEGIN
            SET search_path TO "$user", dni, public;
        
            RETURN QUERY WITH 
              params AS (SELECT 
                  p_colleague_uuid as colleague_uuid,
                  p_filter_entity_types as filter_entity_types, 
                  p_filter_subscription_entity_types as filter_subscription_entity_types, 
                  TRUE::boolean as return_only_non_acknowledged
              )
            SELECT
              fn.entity_type AS entity_type,
              fn.entity_id AS entity_id,
              entity.entity_instance AS entity_instance,
              fn.root_ancestor_type AS root_ancestor_type,
              fn.root_ancestor_id AS root_ancestor_id,
              ancestor.entity_instance AS root_ancestor_instance,
              fn.parent_entity_type AS parent_entity_type,
              fn.parent_entity_id AS parent_entity_id,
              parent.entity_instance AS parent_entity_instance,
              fn.notified_at AS notified_at
            FROM params, fn_get_dni_user_notification_raw_list(
              p_colleague_uuid := colleague_uuid
              , p_filter_entity_types := filter_entity_types
              , p_filter_subscription_entity_types := filter_subscription_entity_types
              , p_return_only_non_acknowledged := return_only_non_acknowledged
            ) fn
            LEFT JOIN ccms_entity entity
            ON fn.entity_id = entity.entity_id AND fn.entity_type = entity.entity_type
            LEFT JOIN ccms_entity parent
            ON fn.parent_entity_id = parent.entity_id AND fn.parent_entity_type = parent.entity_type
            LEFT JOIN ccms_entity ancestor
            ON fn.root_ancestor_id = ancestor.entity_id AND fn.root_ancestor_type = ancestor.entity_type
            ORDER BY fn.notified_at DESC
            ;
        END
        $function$
        ;`,
      );

    // -- ============================
    // -- fn_get_dni_bulk_mailing_data
    // -- ============================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_get_dni_bulk_mailing_data(p_entity ccms_entity_descriptor)
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

    //#endregion
    
    //#region Resore redundant casts

    // -- ============================
    // -- fn_get_dni_user_mailing_data
    // -- ============================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_dni_is_entity_type(
          t text
        ) 
      RETURNS boolean
      STRICT IMMUTABLE
      LANGUAGE plpgsql
      AS $function$
      BEGIN
        RETURN (t = ANY(ENUM_RANGE(null::dni_entity_type_enum)::text[]));
      END
      $function$
    `);

    // -- ==================================
    // -- fn_dni_convert_text_to_entity_type
    // -- ==================================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_dni_convert_text_to_entity_type(
          t text
        ) 
      RETURNS dni_entity_type_enum
      STRICT IMMUTABLE
      LANGUAGE plpgsql
      AS $function$
      BEGIN
        IF NOT fn_dni_is_entity_type(t) THEN 
          RAISE EXCEPTION 'invalid entity_type ("%")', t; 
        END IF;

        RETURN t::dni_entity_type_enum;
      END
      $function$
    `);

    // -- ===================================
    // -- CAST (text as dni_entity_type_enum)
    // -- ===================================
    await queryRunner.query(`
      CREATE CAST (text as dni_entity_type_enum) WITH FUNCTION fn_dni_convert_text_to_entity_type(text);
    `);
    //#endregion

  }
}
