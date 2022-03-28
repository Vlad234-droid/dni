import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class Fix_functions implements MigrationInterface {
  name = 'Fix_functions-1648450809500';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    // -- ==========================================
    // -- fn_get_dni_user_notification_enriched_list
    // -- ==========================================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_get_dni_user_notification_enriched_list(
          p_colleague_uuid uuid
        , p_filter_entity_types dni_entity_type_enum[] DEFAULT ARRAY['event'::dni_entity_type_enum, 'post'::dni_entity_type_enum]
        , p_filter_subscription_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum, 'event'::dni_entity_type_enum]
        , p_filter_root_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum]
        , p_return_only_non_acknowledged boolean DEFAULT true
        , p_return_only_one_ancestor_per_entity boolean DEFAULT true
        , p_affected_interval interval DEFAULT '3 mons'::interval
        , p_object_case_enum jsonb_object_case_enum DEFAULT 'default'::jsonb_object_case_enum
      )
      RETURNS TABLE(
          entity_type dni_entity_type_enum
        , entity_id integer
        , entity_instance jsonb
        , ancestor_type dni_entity_type_enum
        , ancestor_id integer
        , ancestor_instance jsonb
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
            , p_filter_root_entity_types AS filter_root_entity_types
            , p_return_only_non_acknowledged AS return_only_non_acknowledged
            , p_return_only_one_ancestor_per_entity AS return_only_one_ancestor_per_entity
            , p_affected_interval AS affected_interval
            , p_object_case_enum AS object_case_enum
        ),
        unnested_entities AS (
          SELECT 
              fn.colleague_uuid
            , fn.entity_type
            , fn.entity_id
            , UNNEST(
                CASE fn.ancestors_count 
                WHEN 0 THEN ARRAY[NULL::ccms_entity_descriptor] 
                ELSE fn.ancestors 
                END
              ) AS ancestor
            , fn.ancestors_count
            , fn.notified_at
            , fn.acknowledged_at
          FROM params, fn_get_dni_user_notification_raw_list(
              p_colleague_uuid := params.colleague_uuid
            , p_filter_entity_types := params.filter_entity_types
            , p_filter_subscription_entity_types := params.filter_subscription_entity_types
            , p_return_only_non_acknowledged := params.return_only_non_acknowledged
            , p_affected_interval := params.affected_interval
            ) fn
        ),
        ranked_entities AS (
          SELECT 
              ue.colleague_uuid
            , ue.entity_type
            , ue.entity_id
            , CASE 
              WHEN (ue.ancestor)."type" = ANY(params.filter_root_entity_types) THEN (ue.ancestor)."type" 
              ELSE NULL 
              END AS ancestor_type
            , CASE 
              WHEN (ue.ancestor)."type" = ANY(params.filter_root_entity_types) THEN (ue.ancestor)."id" 
              ELSE NULL 
              END AS ancestor_id
            , ue.notified_at
            , ue.acknowledged_at
            , ROW_NUMBER() OVER (
              PARTITION BY ue.entity_type, ue.entity_id 
              ORDER BY fn_dni_get_entity_type_sort_rank((ue.ancestor)."type"), (ue.ancestor)."id") AS row_rank
          FROM params, unnested_entities ue
        )
        SELECT 
            re.entity_type
          , re.entity_id
          , CASE 
            WHEN re.entity_id IS NULL THEN NULL 
            ELSE jsonb_object_convert_case(jsonb_build_ccms_entity(entity.entity_instance, re.entity_type), object_case_enum)
            END AS entity_instance
          , re.ancestor_type
          , re.ancestor_id
          , CASE 
            WHEN re.ancestor_id IS NULL THEN NULL 
            ELSE jsonb_object_convert_case(jsonb_build_ccms_entity(ancestor.entity_instance, re.ancestor_type), object_case_enum)
            END AS ancestor_instance
          , re.notified_at
          , re.acknowledged_at
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
    // -- fn_get_dni_user_notification_groupped_list
    // -- ==========================================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_get_dni_user_notification_groupped_list(
          p_colleague_uuid uuid
        , p_filter_entity_types dni_entity_type_enum[] DEFAULT ARRAY['event'::dni_entity_type_enum, 'post'::dni_entity_type_enum]
        , p_filter_subscription_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum, 'event'::dni_entity_type_enum]
        , p_filter_root_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum]
        , p_return_only_non_acknowledged boolean DEFAULT true
        , p_return_only_one_ancestor_per_entity boolean DEFAULT true
        , p_affected_interval interval DEFAULT '3 mons'::interval
        , p_object_case_enum jsonb_object_case_enum DEFAULT 'default'::jsonb_object_case_enum
        )
      RETURNS TABLE(
          ancestor_type dni_entity_type_enum
        , ancestor_id integer
        , ancestor_instance jsonb
        , recent_notified_at timestamp with time zone
        , nested_entities_total integer
        , nested_entities jsonb
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
            , p_filter_root_entity_types AS filter_root_entity_types
            , p_return_only_non_acknowledged AS return_only_non_acknowledged
            , p_return_only_one_ancestor_per_entity AS return_only_one_ancestor_per_entity
            , p_affected_interval AS affected_interval
            , p_object_case_enum AS object_case_enum
        ),
        unnested_entities AS (
          SELECT 
              fn.colleague_uuid
            , fn.entity_type
            , fn.entity_id
            , UNNEST(
                CASE fn.ancestors_count 
                WHEN 0 THEN ARRAY[NULL::ccms_entity_descriptor] 
                ELSE fn.ancestors 
                END
              ) AS ancestor
            , fn.ancestors_count
            , fn.notified_at
            , fn.acknowledged_at
          FROM params, fn_get_dni_user_notification_raw_list(
              p_colleague_uuid := params.colleague_uuid
            , p_filter_entity_types := params.filter_entity_types
            , p_filter_subscription_entity_types := params.filter_subscription_entity_types
            , p_return_only_non_acknowledged := params.return_only_non_acknowledged
            , p_affected_interval := params.affected_interval
            ) fn
        ),
        ranked_entities AS (
          SELECT 
              ue.colleague_uuid
            , ue.entity_type
            , ue.entity_id
            , CASE 
              WHEN (ue.ancestor)."type" = ANY(params.filter_root_entity_types) THEN ue.ancestor 
              ELSE NULL 
              END AS ancestor
            , ue.notified_at
            , ue.acknowledged_at
            , row_number() OVER (
              PARTITION BY ue.entity_type, ue.entity_id 
              ORDER BY fn_dni_get_entity_type_sort_rank((ue.ancestor)."type"), (ue.ancestor)."id") AS row_rank
          FROM params, unnested_entities ue
        ),
        prepared_entities AS (
          SELECT 
            re.ancestor
            , MAX(re.notified_at) AS recent_notified_at
            , jsonb_agg(jsonb_build_object('entity_type', re.entity_type, 'entity_id', re.entity_id)) AS nested_entities
            , COUNT(*)::integer AS nested_entities_total
          FROM params, ranked_entities re
          WHERE params.return_only_one_ancestor_per_entity = FALSE OR re.row_rank = 1
          GROUP BY
            re.ancestor
        )
        SELECT 
            (pe.ancestor)."type" AS ancestor_type
          , (pe.ancestor)."id" AS ancestor_id
          , CASE 
            WHEN (pe.ancestor)."id" IS NULL THEN NULL 
            ELSE jsonb_object_convert_case(jsonb_build_ccms_entity(ce.entity_instance, (pe.ancestor)."type"), object_case_enum)
            END AS ancestor_instance
          , pe.recent_notified_at
          , pe.nested_entities_total
          , jsonb_object_convert_case(pe.nested_entities, object_case_enum) AS nested_entities
        FROM params, prepared_entities pe
        LEFT JOIN ccms_entity ce 
        ON pe.ancestor = ROW(ce.entity_id, ce.entity_type)::ccms_entity_descriptor 
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

    // -- ==========================================
    // -- fn_get_dni_user_notification_enriched_list
    // -- ==========================================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_get_dni_user_notification_enriched_list(
          p_colleague_uuid uuid
        , p_filter_entity_types dni_entity_type_enum[] DEFAULT ARRAY['event'::dni_entity_type_enum, 'post'::dni_entity_type_enum]
        , p_filter_subscription_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum, 'event'::dni_entity_type_enum]
        , p_filter_root_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum]
        , p_return_only_non_acknowledged boolean DEFAULT true
        , p_return_only_one_ancestor_per_entity boolean DEFAULT true
        , p_affected_interval interval DEFAULT '3 mons'::interval
        , p_object_case_enum jsonb_object_case_enum DEFAULT 'default'::jsonb_object_case_enum
      )
      RETURNS TABLE(
          entity_type dni_entity_type_enum
        , entity_id integer
        , entity_instance jsonb
        , ancestor_type dni_entity_type_enum
        , ancestor_id integer
        , ancestor_instance jsonb
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
            , p_filter_root_entity_types AS filter_root_entity_types
            , p_return_only_non_acknowledged AS return_only_non_acknowledged
            , p_return_only_one_ancestor_per_entity AS return_only_one_ancestor_per_entity
            , p_affected_interval AS affected_interval
            , p_object_case_enum AS object_case_enum
        ),
        unnested_entities AS (
          SELECT 
              fn.colleague_uuid
            , fn.entity_type
            , fn.entity_id
            , UNNEST(
                CASE fn.ancestors_count 
                WHEN 0 THEN ARRAY[NULL::ccms_entity_descriptor] 
                ELSE fn.ancestors 
                END
              ) AS ancestor
            , fn.ancestors_count
            , fn.notified_at
            , fn.acknowledged_at
          FROM params, fn_get_dni_user_notification_raw_list_3(
              p_colleague_uuid := params.colleague_uuid
            , p_filter_entity_types := params.filter_entity_types
            , p_filter_subscription_entity_types := params.filter_subscription_entity_types
            , p_return_only_non_acknowledged := params.return_only_non_acknowledged
            , p_affected_interval := params.affected_interval
            ) fn
        ),
        ranked_entities AS (
          SELECT 
              ue.colleague_uuid
            , ue.entity_type
            , ue.entity_id
            , CASE 
              WHEN (ue.ancestor)."type" = ANY(params.filter_root_entity_types) THEN (ue.ancestor)."type" 
              ELSE NULL 
              END AS ancestor_type
            , CASE 
              WHEN (ue.ancestor)."type" = ANY(params.filter_root_entity_types) THEN (ue.ancestor)."id" 
              ELSE NULL 
              END AS ancestor_id
            , ue.notified_at
            , ue.acknowledged_at
            , ROW_NUMBER() OVER (
              PARTITION BY ue.entity_type, ue.entity_id 
              ORDER BY fn_dni_get_entity_type_sort_rank((ue.ancestor)."type"), (ue.ancestor)."id") AS row_rank
          FROM params, unnested_entities ue
        )
        SELECT 
            re.entity_type
          , re.entity_id
          , CASE 
            WHEN re.entity_id IS NULL THEN NULL 
            ELSE jsonb_object_convert_case(jsonb_build_ccms_entity(entity.entity_instance, re.entity_type), object_case_enum)
            END AS entity_instance
          , re.ancestor_type
          , re.ancestor_id
          , CASE 
            WHEN re.ancestor_id IS NULL THEN NULL 
            ELSE jsonb_object_convert_case(jsonb_build_ccms_entity(ancestor.entity_instance, re.ancestor_type), object_case_enum)
            END AS ancestor_instance
          , re.notified_at
          , re.acknowledged_at
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
    // -- fn_get_dni_user_notification_groupped_list
    // -- ==========================================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_get_dni_user_notification_groupped_list(
          p_colleague_uuid uuid
        , p_filter_entity_types dni_entity_type_enum[] DEFAULT ARRAY['event'::dni_entity_type_enum, 'post'::dni_entity_type_enum]
        , p_filter_subscription_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum, 'event'::dni_entity_type_enum]
        , p_filter_root_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum]
        , p_return_only_non_acknowledged boolean DEFAULT true
        , p_return_only_one_ancestor_per_entity boolean DEFAULT true
        , p_affected_interval interval DEFAULT '3 mons'::interval
        , p_object_case_enum jsonb_object_case_enum DEFAULT 'default'::jsonb_object_case_enum
        )
      RETURNS TABLE(
          ancestor_type dni_entity_type_enum
        , ancestor_id integer
        , ancestor_instance jsonb
        , recent_notified_at timestamp with time zone
        , nested_entities_total integer
        , nested_entities jsonb
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
            , p_filter_root_entity_types AS filter_root_entity_types
            , p_return_only_non_acknowledged AS return_only_non_acknowledged
            , p_return_only_one_ancestor_per_entity AS return_only_one_ancestor_per_entity
            , p_affected_interval AS affected_interval
            , p_object_case_enum AS object_case_enum
        ),
        unnested_entities AS (
          SELECT 
              fn.colleague_uuid
            , fn.entity_type
            , fn.entity_id
            , UNNEST(
                CASE fn.ancestors_count 
                WHEN 0 THEN ARRAY[NULL::ccms_entity_descriptor] 
                ELSE fn.ancestors 
                END
              ) AS ancestor
            , fn.ancestors_count
            , fn.notified_at
            , fn.acknowledged_at
          FROM params, fn_get_dni_user_notification_raw_list_3(
              p_colleague_uuid := params.colleague_uuid
            , p_filter_entity_types := params.filter_entity_types
            , p_filter_subscription_entity_types := params.filter_subscription_entity_types
            , p_return_only_non_acknowledged := params.return_only_non_acknowledged
            , p_affected_interval := params.affected_interval
            ) fn
        ),
        ranked_entities AS (
          SELECT 
              ue.colleague_uuid
            , ue.entity_type
            , ue.entity_id
            , CASE 
              WHEN (ue.ancestor)."type" = ANY(params.filter_root_entity_types) THEN ue.ancestor 
              ELSE NULL 
              END AS ancestor
            , ue.notified_at
            , ue.acknowledged_at
            , row_number() OVER (
              PARTITION BY ue.entity_type, ue.entity_id 
              ORDER BY fn_dni_get_entity_type_sort_rank((ue.ancestor)."type"), (ue.ancestor)."id") AS row_rank
          FROM params, unnested_entities ue
        ),
        prepared_entities AS (
          SELECT 
            re.ancestor
            , MAX(re.notified_at) AS recent_notified_at
            , jsonb_agg(jsonb_build_object('entity_type', re.entity_type, 'entity_id', re.entity_id)) AS nested_entities
            , COUNT(*)::integer AS nested_entities_total
          FROM params, ranked_entities re
          WHERE params.return_only_one_ancestor_per_entity = FALSE OR re.row_rank = 1
          GROUP BY
            re.ancestor
        )
        SELECT 
            (pe.ancestor)."type" AS ancestor_type
          , (pe.ancestor)."id" AS ancestor_id
          , CASE 
            WHEN (pe.ancestor)."id" IS NULL THEN NULL 
            ELSE jsonb_object_convert_case(jsonb_build_ccms_entity(ce.entity_instance, (pe.ancestor)."type"), object_case_enum)
            END AS ancestor_instance
          , pe.recent_notified_at
          , pe.nested_entities_total
          , jsonb_object_convert_case(pe.nested_entities, object_case_enum) AS nested_entities
        FROM params, prepared_entities pe
        LEFT JOIN ccms_entity ce 
        ON pe.ancestor = ROW(ce.entity_id, ce.entity_type)::ccms_entity_descriptor 
        ;
      END
      $function$
    `);

  }
}
