import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class Migration_Improve_Notifications_Routines implements MigrationInterface {
  name = 'Improve_Notifications_Routines-1639731600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    //#region jsonb routines

    // -- ======================
    // -- jsonb_object_case_enum
    // -- ======================
    await queryRunner.query(`
      DO $type$ BEGIN
        CREATE TYPE jsonb_object_case_enum AS ENUM (
          'default',
          'snakecase',
          'camelcase'
        );
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END $type$;`,
    );

    // -- =========================
    // -- jsonb_object_to_camelcase
    // -- =========================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION jsonb_object_to_camelcase(p_data jsonb)
      RETURNS jsonb
      LANGUAGE plpgsql
      IMMUTABLE
      AS $function$
      DECLARE
        t_type text;
        t_key text;
        t_newkey text;
        t_val jsonb;
        t_newval jsonb;
      BEGIN
        t_type := jsonb_typeof(p_data);
      
        IF t_type NOT IN ('object', 'array') 
        THEN
          RETURN p_data;
        -- if it's an array, run this function on each element
        ELSIF t_type = 'array' 
        THEN
          SELECT json_agg(jsonb_object_to_camelcase(value)) 
          INTO t_newval 
          FROM jsonb_array_elements(p_data);
      
          RETURN t_newval;
        END IF;
      
        -- otherwise it's an object, so loop through every key in the json
        FOR t_key, t_val IN (SELECT "key", "value" FROM jsonb_each(p_data))
        LOOP
          t_newkey := replace(initcap(replace(t_key, '_', ' ')), ' ', '');
          t_newkey := lower(left(t_newkey, 1)) || right(t_newkey, -1);
          t_newval := jsonb_object_to_camelcase(t_val);
      
          p_data := p_data - t_key;
          p_data := p_data || jsonb_build_object(t_newkey, t_newval);
        END LOOP;
      
        RETURN p_data;
      END
      $function$
    `);

    // -- =========================
    // -- jsonb_object_to_snakecase
    // -- =========================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION jsonb_object_to_snakecase(p_data jsonb)
      RETURNS jsonb
      LANGUAGE plpgsql
      IMMUTABLE
      AS $function$
      DECLARE
        t_type text;
        t_key text;
        t_newkey text;
        t_val jsonb;
        t_newval jsonb;
      BEGIN
        t_type := jsonb_typeof(p_data);
      
        IF t_type NOT IN ('object', 'array') 
        THEN
          RETURN p_data;
        -- if it's an array, run this function on each element
        ELSIF t_type = 'array' 
        THEN
          SELECT json_agg(jsonb_object_to_snakecase(value)) 
          INTO t_newval 
          FROM jsonb_array_elements(p_data);
      
          RETURN t_newval;
        END IF;
      
        -- otherwise it's an object, so loop through every key in the json
        FOR t_key, t_val IN (SELECT "key", "value" FROM jsonb_each(p_data)) LOOP
          t_newkey := lower(regexp_replace(t_key, '([A-Z])', '_\\1')); -- convert the key from camelCase to snake_case
          t_newval := jsonb_object_to_snakecase(t_val); -- recursively run this function on the value
      
          p_data := p_data - t_key;
          p_data := p_data || jsonb_build_object(t_newkey, t_newval);
        END LOOP;
      
        RETURN p_data;
      END
      $function$
    `);

    // -- =========================
    // -- jsonb_object_convert_case
    // -- =========================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION jsonb_object_convert_case(
          p_object jsonb
        , p_object_case_enum jsonb_object_case_enum DEFAULT 'default'::jsonb_object_case_enum
      )
      RETURNS jsonb
      LANGUAGE plpgsql
      IMMUTABLE
      AS $function$
      DECLARE
        r_object JSONB;
      BEGIN
        r_object := CASE p_object_case_enum
          WHEN 'camelcase'::jsonb_object_case_enum THEN jsonb_object_to_camelcase(p_object)
          WHEN 'snakecase'::jsonb_object_case_enum THEN jsonb_object_to_snakecase(p_object)
          ELSE p_object
        END;
      
        RETURN r_object;  
      END
      $function$
    `);

    // -- =======================
    // -- jsonb_build_ccms_entity
    // -- =======================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION jsonb_build_ccms_entity(
          p_source_object jsonb
        , p_entity_type dni_entity_type_enum
      )
      RETURNS jsonb
      LANGUAGE plpgsql
      AS $function$
      DECLARE
        result_jsonb jsonb;
        image_jsonb jsonb;
        networks_jsonb jsonb;
      BEGIN
        IF p_entity_type IS NULL
        THEN
          RAISE EXCEPTION '"p_entity_type" parameter is required'
            USING HINT = 'These options are available: "network", "event", "post"';
        END IF;
      
        IF p_source_object IS NULL
        THEN 
          RETURN NULL;
        END IF;
      
        SET search_path TO "$user", dni, public;
              
        IF (p_source_object ->> 'image') IS NOT NULL
        THEN
          image_jsonb := jsonb_build_object(
            'url', p_source_object -> 'image' -> 'url',
            'size', p_source_object -> 'image' -> 'size',
            'width', p_source_object -> 'image' -> 'width',
            'height', p_source_object -> 'image' -> 'height',
            'mime', NULLIF(p_source_object -> 'mime' ->> 'mime', '')
          );
        ELSE
          image_jsonb := NULL;
        END IF;
      
        result_jsonb := jsonb_build_object(
          'id', p_source_object -> 'id',
          'type', p_entity_type,
          'slug', p_source_object -> 'slug',
          'title', p_source_object -> 'title',
          'image', image_jsonb,
          'reactions', p_source_object -> 'reactions',
          'author_name', p_source_object -> 'authorName',
          'author_location', p_source_object -> 'authorLocation',
          'is_archived', p_source_object -> 'archived',
          'start_at', p_source_object -> 'startDate',
          'end_at', p_source_object -> 'endDate',
          'created_at', p_source_object -> 'created_at',
          'updated_at', p_source_object -> 'updated_at',
          'published_at', p_source_object -> 'published_at',
          'deleted_at', p_source_object -> 'deleted_at'
        );
      
        IF (p_entity_type = 'post'::dni_entity_type_enum AND (p_source_object ->> 'event') IS NOT NULL)
        THEN
          result_jsonb := result_jsonb || 
            jsonb_build_object(
              'event', 
              jsonb_build_ccms_entity(p_source_object -> 'event', 'event'::dni_entity_type_enum)
            );
        ELSIF jsonb_typeof(p_source_object -> 'network') = 'array'
        THEN
          WITH networks AS (
            SELECT jsonb_array_elements(p_source_object -> 'network') AS entity
          )  
          SELECT jsonb_agg(jsonb_build_ccms_entity(entity, 'network'::dni_entity_type_enum))
          INTO networks_jsonb
          FROM networks;
      
          result_jsonb := result_jsonb || jsonb_build_object('networks', networks_jsonb);
        END IF;
        
        RETURN jsonb_strip_nulls(result_jsonb);
      END
      $function$
    `);

    //#endregion

    //#region ccms_entity routines

    // -- ================================================
    // -- ccms_entity table function: ccms_entity_start_at
    // -- ================================================
    // -- see: https://www.postgresql.org/docs/11/xfunc-sql.html#XFUNC-SQL-COMPOSITE-FUNCTIONS
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION ccms_entity_start_at(ccms_entity)
      RETURNS TIMESTAMP WITH TIME ZONE
      LANGUAGE SQL
      STABLE
      AS $function$
        SELECT COALESCE($1.entity_instance ->> 'startDate', $1.entity_instance -> 'event' ->> 'startDate')::TIMESTAMPTZ;
      $function$
    `);

    // -- ==============================================
    // -- ccms_entity table function: ccms_entity_end_at
    // -- ==============================================
    // -- see: https://www.postgresql.org/docs/11/xfunc-sql.html#XFUNC-SQL-COMPOSITE-FUNCTIONS
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION ccms_entity_end_at(ccms_entity)
      RETURNS TIMESTAMP WITH TIME ZONE
      LANGUAGE SQL
      STABLE
      AS $function$
        SELECT COALESCE($1.entity_instance ->> 'endDate', $1.entity_instance -> 'event' ->> 'endDate')::TIMESTAMPTZ;
      $function$
    `);

    // -- ==================================================
    // -- ccms_entity table function: ccms_entity_is_current
    // -- ==================================================
    // -- see: https://www.postgresql.org/docs/11/xfunc-sql.html#XFUNC-SQL-COMPOSITE-FUNCTIONS
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION ccms_entity_is_current(ccms_entity)
      RETURNS BOOLEAN
      LANGUAGE SQL
      STABLE
      AS $function$
        SELECT COALESCE(
          CURRENT_TIMESTAMP 
            BETWEEN COALESCE($1.entity_instance ->> 'startDate', $1.entity_instance -> 'event' ->> 'startDate')::TIMESTAMPTZ 
            AND COALESCE($1.entity_instance ->> 'endDate', $1.entity_instance -> 'event' ->> 'endDate')::TIMESTAMPTZ 
          , TRUE);
      $function$
    `);

    //#endregion

    //#region ccms_entity: add specific parent columns and constraints

    await queryRunner.query(`
      ALTER TABLE ccms_entity ADD COLUMN IF NOT EXISTS parent_event ccms_entity_descriptor NULL;
      COMMENT ON COLUMN ccms_entity.parent_event IS 'applicable only to "post" entity_type';
    `);

    await queryRunner.query(`
      ALTER TABLE ccms_entity ADD COLUMN IF NOT EXISTS parent_networks ccms_entity_descriptor[] NULL;
      COMMENT ON COLUMN ccms_entity.parent_networks IS 'applicable only to "post" and "event" entity_type';
    `);

    // -- c_entity__chk$post_parents
    await queryRunner.query(`
      ALTER TABLE ccms_entity DROP CONSTRAINT IF EXISTS "c_entity__chk$post_parents";
      ALTER TABLE ccms_entity ADD CONSTRAINT "c_entity__chk$post_parents" CHECK (
        entity_type != 'post' OR (
          entity_type = 'post' AND (
            COALESCE(ARRAY_LENGTH(parent_networks, 1), 0) = 0 OR 
            (COALESCE(ARRAY_LENGTH(parent_networks, 1), 0) > 0 AND parent_event IS NULL)
          )
        )
      );
    `);

    // -- c_entity__chk$event_parents
    await queryRunner.query(`
      ALTER TABLE ccms_entity DROP CONSTRAINT IF EXISTS "c_entity__chk$event_parents";
      ALTER TABLE ccms_entity ADD CONSTRAINT "c_entity__chk$event_parents" CHECK (
        entity_type != 'event' OR (
          entity_type = 'event' AND parent_event IS NULL
        )
      );
    `);

    // -- c_entity__chk$network_parents
    await queryRunner.query(`
      ALTER TABLE ccms_entity DROP CONSTRAINT IF EXISTS "c_entity__chk$network_parents";
      ALTER TABLE ccms_entity ADD CONSTRAINT "c_entity__chk$network_parents" CHECK (
        (entity_type != 'network'::dni_entity_type_enum) OR (
          (entity_type = 'network'::dni_entity_type_enum) AND 
          (COALESCE(array_length(parent_networks, 1), 0) = 0) AND 
          (parent_event IS NULL)
        )
      );
    `);

    // -- c_entity__chk$other_parents
    await queryRunner.query(`
      ALTER TABLE ccms_entity DROP CONSTRAINT IF EXISTS "c_entity__chk$other_parents";
      ALTER TABLE ccms_entity ADD CONSTRAINT "c_entity__chk$other_parents" CHECK (
        entity_type = ANY(ARRAY['network', 'event', 'post']::dni_entity_type_enum[]) OR (
          entity_type != ALL(ARRAY['network', 'event', 'post']::dni_entity_type_enum[]) AND 
            COALESCE(ARRAY_LENGTH(parent_networks, 1), 0) = 0 AND 
            parent_event IS NULL
        )
      );
    `);

    //#endregion

    //#region Update ccms_entity, and populate parents

    // -- set post's parent_event
    await queryRunner.query(`
      UPDATE ccms_entity
      SET parent_event = ssrc.parent
      FROM (
        SELECT 
            entity_id
          , entity_type
          , parent
        FROM (
          SELECT 
              ce.entity_id
            , ce.entity_type
            , unnest(ce.parents) AS parent
          FROM ccms_entity ce 
        ) cce
        WHERE cce.entity_type = 'post' AND (parent)."type" = 'event'
      ) ssrc
      WHERE
        ccms_entity.entity_id = ssrc.entity_id AND 
        ccms_entity.entity_type = ssrc.entity_type
      ;
    `);

    // -- set post's parent_networks
    await queryRunner.query(`
      UPDATE ccms_entity
      SET parent_networks = ssrc.parents
      FROM (
        select 
            entity_id
          , entity_type
          , array_agg(parent) AS parents
        FROM (
          SELECT 
              ce.entity_id
            , ce.entity_type
            , unnest(ce.parents) AS parent
          FROM ccms_entity ce 
        ) cce
        WHERE cce.entity_type = 'post' AND (parent)."type" = 'network'
        GROUP BY 
            entity_id
          , entity_type
      ) ssrc
      WHERE
        ccms_entity.entity_id = ssrc.entity_id AND 
        ccms_entity.entity_type = ssrc.entity_type AND 
        ccms_entity.parent_event IS NULL
      ;
    `);

    // -- set event's parent_networks
    await queryRunner.query(`
      UPDATE ccms_entity
      SET parent_networks = ssrc.parents
      FROM (
        SELECT 
            entity_id
          , entity_type
          , array_agg(parent) AS parents
        FROM (
          SELECT 
              ce.entity_id
            , ce.entity_type
            , unnest(ce.parents) AS parent
          FROM ccms_entity ce 
        ) cce
        WHERE cce.entity_type = 'event' AND (parent)."type" = 'network'
        GROUP BY 
            entity_id
          , entity_type
      ) ssrc
      WHERE
        ccms_entity.entity_id = ssrc.entity_id AND 
        ccms_entity.entity_type = ssrc.entity_type
      ;
    `);

    //#endregion

    //#region Introduce V3 notification routines

    // -- ==================================
    // -- fn_get_ccms_entity_all_ancestors_3
    // -- ==================================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_get_ccms_entity_all_ancestors_3(
          p_entity ccms_entity_descriptor
        , p_only_published boolean DEFAULT TRUE
        , p_empty_if_none boolean DEFAULT TRUE
      )
      RETURNS SETOF ccms_entity_descriptor
      LANGUAGE plpgsql
      ROWS 16
      AS $function$
      BEGIN
        SET search_path TO "$user", dni, public;
          
        RETURN QUERY WITH params AS (
          SELECT 
              p_entity AS entity
            , p_only_published AS only_published
            , p_empty_if_none AS empty_if_none
        ),
        ancestor AS (
          SELECT ARRAY_AGG(ancestor) AS ancestors
          FROM (
            SELECT 
                params.only_published
              , UNNEST(ARRAY_REMOVE(pce.parent_networks || ce.parent_networks || ce.parent_event, NULL)) AS ancestor
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
                CASE params.empty_if_none 
                  WHEN FALSE THEN 
                    ARRAY[NULL::ccms_entity_descriptor] 
                  ELSE 
                    ARRAY[]::ccms_entity_descriptor[] 
                END
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
    `);

    // -- ===================================
    // -- fn_get_ccms_entity_root_ancestors_3
    // -- ===================================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_get_ccms_entity_root_ancestors_3(
          p_entity ccms_entity_descriptor
        , p_only_published boolean DEFAULT TRUE
        , p_empty_if_none boolean DEFAULT TRUE
      )
      RETURNS SETOF ccms_entity_descriptor
      LANGUAGE plpgsql
      ROWS 16
      AS $function$
      BEGIN
        SET search_path TO "$user", dni, public;
          
        RETURN QUERY WITH params AS (
          SELECT 
              p_entity AS entity
            , p_only_published AS only_published
            , p_empty_if_none AS empty_if_none
        ),
        ancestor AS (
          SELECT ARRAY_AGG(ancestor) AS ancestors
          FROM (
            SELECT 
                params.only_published
              , UNNEST(ARRAY_REMOVE(pce.parent_networks || ce.parent_networks, NULL)) AS ancestor
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
                CASE params.empty_if_none 
                  WHEN FALSE THEN 
                    ARRAY[NULL::ccms_entity_descriptor] 
                  ELSE 
                    ARRAY[]::ccms_entity_descriptor[] 
                END
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
    `);

    // -- ==============================
    // -- fn_get_dni_bulk_mailing_data_3
    // -- ==============================
    await queryRunner.query(`
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

    // -- =======================================
    // -- fn_get_dni_user_notification_raw_list_3
    // -- =======================================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_get_dni_user_notification_raw_list_3(
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

    // -- ============================================
    // -- fn_get_dni_user_notification_enriched_list_3
    // -- ============================================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_get_dni_user_notification_enriched_list_3(
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

    // -- ============================================
    // -- fn_get_dni_user_notification_groupped_list_3
    // -- ============================================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_get_dni_user_notification_groupped_list_3(
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

    //#endregion
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    await queryRunner.query(`
      DROP FUNCTION IF EXISTS fn_get_dni_user_notification_groupped_list_3;
      DROP FUNCTION IF EXISTS fn_get_dni_user_notification_enriched_list_3;
      DROP FUNCTION IF EXISTS fn_get_dni_user_notification_raw_list_3;
      DROP FUNCTION IF EXISTS fn_get_dni_bulk_mailing_data_3;
      DROP FUNCTION IF EXISTS fn_get_ccms_entity_root_ancestors_3;
      DROP FUNCTION IF EXISTS fn_get_ccms_entity_all_ancestors_3;
    `);


    // -- c_entity__chk$...
    await queryRunner.query(`
      ALTER TABLE ccms_entity DROP CONSTRAINT IF EXISTS "c_entity__chk$other_parents";
      ALTER TABLE ccms_entity DROP CONSTRAINT IF EXISTS "c_entity__chk$network_parents";
      ALTER TABLE ccms_entity DROP CONSTRAINT IF EXISTS "c_entity__chk$event_parents";
      ALTER TABLE ccms_entity DROP CONSTRAINT IF EXISTS "c_entity__chk$post_parents";
    `);

    // -- ccms_entity, drop parent_event and parent_networks
    await queryRunner.query(`
      ALTER TABLE ccms_entity DROP COLUMN IF EXISTS parent_event;
      ALTER TABLE ccms_entity DROP COLUMN IF EXISTS parent_networks;
    `);

    // -- drop ccms_entity_is_current, ccms_entity_end_at, ccms_entity_start_at
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS ccms_entity_is_current;
      DROP FUNCTION IF EXISTS ccms_entity_end_at;
      DROP FUNCTION IF EXISTS ccms_entity_start_at;
    `);

    // -- jsonb_build_ccms_entity
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS jsonb_build_ccms_entity;
    `);

    // -- jsonb_object_to_snakecase, jsonb_object_to_camelcase
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS jsonb_object_convert_case;
      DROP FUNCTION IF EXISTS jsonb_object_to_snakecase;
      DROP FUNCTION IF EXISTS jsonb_object_to_camelcase;
    `);

    await queryRunner.query(`
      DROP TYPE IF EXISTS jsonb_object_case_enum;
    `);
  }
}
