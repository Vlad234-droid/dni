import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class Migration_Populate_Multiple_Parents implements MigrationInterface {
  name = 'Populate_Multiple_Parents-1638358216000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    //#region Update ccms_entity, and populate parents

    // -- set parents
    await queryRunner.query(`
      UPDATE ccms_entity
      SET parents = src.parents
      FROM (
        SELECT
            ccce1.entity
          , COALESCE(
              cce2.parent_event
            , cce3.parent_network
            , ccce1.parent_networks
            , '{}'::ccms_entity_descriptor[]
            ) AS parents
        FROM (
          SELECT
              cce1.entity
            , ARRAY_AGG(cce1.parent_network) FILTER (WHERE cce1.parent_network IS NOT NULL) AS parent_networks
          FROM (
            SELECT
                ROW(ce1.entity_id, ce1.entity_type)::ccms_entity_descriptor AS entity
              , CASE WHEN n.id IS NOT NULL
                  THEN ROW(n.id, 'network')::ccms_entity_descriptor
                  ELSE NULL
                END AS parent_network
                FROM ccms_entity ce1
            LEFT JOIN LATERAL jsonb_to_recordset(ce1.entity_instance -> 'network') AS n(id int)
            ON jsonb_typeof(ce1.entity_instance -> 'network') = 'array'
          ) cce1
          GROUP BY cce1.entity
        ) ccce1
        LEFT JOIN (
          SELECT
              ROW(ce2.entity_id, ce2.entity_type)::ccms_entity_descriptor AS entity
            , CASE WHEN ce2.entity_instance ->> 'event' IS NOT NULL
                THEN '{}'::ccms_entity_descriptor[] || ROW(ce2.entity_instance -> 'event' -> 'id', 'event')::ccms_entity_descriptor
                ELSE NULL
              END AS parent_event
          FROM ccms_entity ce2
          WHERE jsonb_typeof(ce2.entity_instance -> 'event') = 'object'
        ) cce2
        ON ccce1.entity = cce2.entity
        LEFT JOIN (
          SELECT
              ROW(ce3.entity_id, ce3.entity_type)::ccms_entity_descriptor AS entity
            , CASE WHEN ce3.entity_instance ->> 'network' IS NOT NULL
                THEN '{}'::ccms_entity_descriptor[] || row(ce3.entity_instance -> 'network' -> 'id', 'network')::ccms_entity_descriptor
                ELSE NULL
              END AS parent_network
          FROM ccms_entity ce3
          WHERE jsonb_typeof(ce3.entity_instance -> 'network') = 'object'
        ) cce3
        ON ccce1.entity = cce3.entity
      ) src
      WHERE ROW(ccms_entity.entity_id, ccms_entity.entity_type)::ccms_entity_descriptor = src.entity
    `);

    //#endregion
  }

  public async down(): Promise<void> {
    console.log(`Nothing to do as part of [${this.name}] migration down operation.`);
  }
}
