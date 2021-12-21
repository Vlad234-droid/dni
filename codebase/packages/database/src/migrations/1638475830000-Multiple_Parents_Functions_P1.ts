import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class Migration_Multiple_Parents_Functions_P1 implements MigrationInterface {
  name = 'Multiple_Parents_Functions_P1-1638475830000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

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

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_dni_get_entity_type_sort_rank(
          entity_type dni_entity_type_enum
        )
      RETURNS integer
      LANGUAGE plpgsql
      IMMUTABLE STRICT
      AS $function$
      BEGIN
        IF entity_type = 'network'::dni_entity_type_enum THEN 
          RETURN 1;
        ELSIF entity_type = 'event'::dni_entity_type_enum THEN 
          RETURN 2;
        ELSIF entity_type = 'post'::dni_entity_type_enum THEN 
          RETURN 3;
        ELSE  
          RETURN 99;
        END IF;
      END
      $function$
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    await queryRunner.query(`DROP FUNCTION IF EXISTS fn_dni_get_entity_type_sort_rank;`);

    await queryRunner.query(`DROP FUNCTION IF EXISTS fn_get_ccms_entity_all_ancestors;`);
    await queryRunner.query(`DROP FUNCTION IF EXISTS fn_get_ccms_entity_root_ancestors;`);
  }
}
