import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class Migration_Update_NotificationAck_Indexes implements MigrationInterface {
  name = 'Update_NotificationAck_Indexes-1639733409000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    // -- ===============================================
    // -- Drop INDEX on dni_user_notification_acknowledge
    // -- ===============================================
    await queryRunner.query(`
      DROP INDEX IF EXISTS "d_u_n_acknowledge$colleague_uuid$a_entity_type$a_entity_id__idx";
    `);

    // -- ===========================================================
    // -- Drop UNIQUE constraint on dni_user_notification_acknowledge
    // -- ===========================================================
    await queryRunner.query(`
      ALTER TABLE dni_user_notification_acknowledge 
        DROP CONSTRAINT IF EXISTS "d_u_n_acknowledge$colleague_uuid$a_entity_type$a_entity_id__uq"; 
    `);

    // -- ================================================================
    // -- Re-create UNIQUE constraint on dni_user_notification_acknowledge
    // -- ================================================================
    await queryRunner.query(`
      ALTER TABLE dni_user_notification_acknowledge 
        DROP CONSTRAINT IF EXISTS "d_u_n_acknowledge$colleague_uuid$a_entity_id$a_entity_type__uq"; 

      ALTER TABLE dni_user_notification_acknowledge 
        ADD CONSTRAINT "d_u_n_acknowledge$colleague_uuid$a_entity_id$a_entity_type__uq" 
          UNIQUE (colleague_uuid, acknowledge_entity_id, acknowledge_entity_type);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    // -- ===========================================================
    // -- Drop UNIQUE constraint on dni_user_notification_acknowledge
    // -- ===========================================================
    await queryRunner.query(`
      ALTER TABLE dni_user_notification_acknowledge 
        DROP CONSTRAINT IF EXISTS "d_u_n_acknowledge$colleague_uuid$a_entity_id$a_entity_type__uq"; 
    `);

    // -- ================================================================
    // -- Re-create UNIQUE constraint on dni_user_notification_acknowledge
    // -- ================================================================
    await queryRunner.query(`
      ALTER TABLE dni_user_notification_acknowledge 
        DROP CONSTRAINT IF EXISTS "d_u_n_acknowledge$colleague_uuid$a_entity_type$a_entity_id__uq"; 

      ALTER TABLE dni_user_notification_acknowledge 
        ADD CONSTRAINT "d_u_n_acknowledge$colleague_uuid$a_entity_type$a_entity_id__uq" 
          UNIQUE (colleague_uuid, acknowledge_entity_type, acknowledge_entity_id);
    `);

    // -- ====================================================
    // -- Re-create INDEX on dni_user_notification_acknowledge
    // -- ====================================================
    await queryRunner.query(`
      DROP INDEX IF EXISTS "d_u_n_acknowledge$colleague_uuid$a_entity_type$a_entity_id__idx";

      CREATE INDEX "d_u_n_acknowledge$colleague_uuid$a_entity_type$a_entity_id__idx" ON dni_user_notification_acknowledge 
        USING btree (colleague_uuid, acknowledge_entity_type, acknowledge_entity_id);
    `);
  }
}
