import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class Migration_Add_Multiple_Patents implements MigrationInterface {
  name = 'Add_Multiple_Parents-1637917050000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

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

    // -- ===========
    // -- ccms_entity
    // -- ===========
    await queryRunner.query(`
      ALTER TABLE ccms_entity ADD COLUMN IF NOT EXISTS parents ccms_entity_descriptor[] NOT NULL DEFAULT '{}';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    await queryRunner.query(`ALTER TABLE ccms_entity DROP COLUMN IF EXISTS parents;`);

    await queryRunner.query(`DROP CAST IF EXISTS (text as dni_entity_type_enum);`);
    await queryRunner.query(`DROP FUNCTION IF EXISTS fn_dni_convert_text_to_entity_type;`);
    await queryRunner.query(`DROP FUNCTION IF EXISTS fn_dni_is_entity_type;`);
  }
}
