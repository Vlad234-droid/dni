import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class Migration_Add_UQ_Constraint_To_Notification_Ack implements MigrationInterface {
  name = 'Add_UQ_Constraint_To_Notification_Ack-1639580400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    // -- ==========================================================
    // -- Remove dublicates from : dni_user_notification_acknowledge
    // -- ==========================================================
    await queryRunner.query(`
      DELETE FROM dni.dni_user_notification_acknowledge
      WHERE acknowledge_uuid IN (
        SELECT acknowledge_uuid FROM (
        SELECT 
          acknowledge_uuid, 
          colleague_uuid, 
          acknowledge_entity_id, 
          acknowledge_entity_type, 
          acknowledge_created_at,
          ROW_NUMBER() OVER(
            PARTITION BY colleague_uuid, acknowledge_entity_id, acknowledge_entity_type  
            ORDER BY acknowledge_created_at DESC) AS row_rank
        FROM dni_user_notification_acknowledge
        ) ranked
        WHERE row_rank > 1
      );
    `);

    // -- =====================================================================
    // -- Remove and add UNIQUE constraint to dni_user_notification_acknowledge
    // -- =====================================================================
    await queryRunner.query(`
      ALTER TABLE dni.dni_user_notification_acknowledge 
        DROP CONSTRAINT IF EXISTS "d_u_n_acknowledge$colleague_uuid$a_entity_type$a_entity_id__uq"; 
    `);

    await queryRunner.query(`
      ALTER TABLE dni.dni_user_notification_acknowledge 
        ADD CONSTRAINT IF NOT EXISTS "d_u_n_acknowledge$colleague_uuid$a_entity_type$a_entity_id__uq" 
          UNIQUE (acknowledge_entity_type,acknowledge_entity_id,colleague_uuid);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    // -- ===============================================================
    // -- Remove UNIQUE constraint from dni_user_notification_acknowledge
    // -- ===============================================================
    await queryRunner.query(`
      ALTER TABLE dni.dni_user_notification_acknowledge 
        DROP CONSTRAINT IF EXISTS "d_u_n_acknowledge$colleague_uuid$a_entity_type$a_entity_id__uq"; 
    `);
  }
}
