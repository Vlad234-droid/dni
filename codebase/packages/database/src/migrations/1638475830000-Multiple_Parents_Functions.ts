import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class Migration_Add_Multiple_Patents implements MigrationInterface {
  name = 'Multiple_Parents_Functions-1638475830000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    // -- =================================
    // -- fn_get_ccms_entity_root_ancestors
    // -- =================================
    await queryRunner.query(
      `CREATE OR REPLACE FUNCTION fn_get_ccms_entity_root_ancestors(
            p_entity ccms_entity_descriptor, 
            p_only_published boolean DEFAULT true)
        RETURNS SETOF ccms_entity_descriptor
        LANGUAGE plpgsql
        ROWS 32
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
        SELECT entity_id, entity_type
        FROM entities
        WHERE parent_entity_type IS NULL 
          AND parent_entity_id IS NULL
        ;
      END
      $function$
     ;
     `,
    );

    // -- ================================
    // -- fn_get_ccms_entity_all_ancestors
    // -- ================================
    await queryRunner.query(
      `CREATE OR REPLACE FUNCTION fn_get_ccms_entity_all_ancestors(
            p_entity ccms_entity_descriptor, 
            p_only_published boolean DEFAULT true)
        RETURNS SETOF ccms_entity_descriptor
        LANGUAGE plpgsql
        ROWS 32
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
        SELECT entity_id, entity_type
        FROM entities
        WHERE entity_id IS NOT NULL 
          AND entity_type IS NOT NULL
        ;
      END
      $function$
     ;
     `,
    );

    // -- ================================
    // -- fn_get_ccms_entity_root_ancestor
    // -- ================================
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS fn_get_ccms_entity_root_ancestor;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    // -- ================================
    // -- fn_get_ccms_entity_root_ancestor
    // -- ================================
    await queryRunner.query(
      `CREATE OR REPLACE FUNCTION fn_get_ccms_entity_root_ancestor(
            p_entity ccms_entity_descriptor, 
            p_only_published boolean DEFAULT TRUE
            )
        RETURNS ccms_entity_descriptor
        LANGUAGE plpgsql
      AS $function$
      DECLARE
          root_entity_id int4;
          root_entity_type dni_entity_type_enum;
      BEGIN
          SET search_path TO "$user", dni, public;
      
          WITH RECURSIVE entities(entity_id, entity_type, parent_entity_id, parent_entity_type) AS (
            SELECT NULL::int4 AS entity_id, NULL::dni_entity_type_enum AS entity_type, parent_entity_id, parent_entity_type
            FROM ccms_entity
            WHERE entity_id = p_entity.id AND entity_type = p_entity."type"
              AND ((entity_published_at IS NOT NULL) OR (p_only_published = FALSE))
              AND entity_deleted_at IS NULL
            UNION ALL
                SELECT e.entity_id, e.entity_type, e.parent_entity_id, e.parent_entity_type
                FROM ccms_entity e 
                JOIN entities
                ON  entities.parent_entity_id = e.entity_id AND entities.parent_entity_type = e.entity_type 
                WHERE ((e.entity_published_at IS NOT NULL) OR (p_only_published = FALSE))
                  AND entity_deleted_at IS NULL
                  -- additional dummy check for circular recursion
                  AND e.entity_id <> p_entity.id AND e.entity_type <> p_entity."type"
          )
          SELECT entity_id, entity_type 
          INTO root_entity_id, root_entity_type
          FROM entities
          WHERE parent_entity_type IS NULL AND parent_entity_id IS NULL
          ;
          
          RETURN ROW(root_entity_id, root_entity_type)::ccms_entity_descriptor;
      END
      $function$
      ;`,
    );


    await queryRunner.query(`DROP FUNCTION IF EXISTS fn_get_ccms_entity_all_ancestors;`);
    await queryRunner.query(`DROP FUNCTION IF EXISTS fn_get_ccms_entity_root_ancestors;`);
  }
}
