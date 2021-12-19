import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class Migration_Add_Multiple_Patents implements MigrationInterface {
  name = 'Improve_Data_Wipe_Routine-1639220400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    // -- ==================================
    // -- fn_perform_dni_colleague_data_wipe
    // -- ==================================
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS fn_perform_dni_colleague_data_wipe;
    `);

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_perform_dni_colleague_data_wipe(
          p_retention_period interval DEFAULT '6 mons'::interval
        , p_dry_run boolean DEFAULT false
        )
      RETURNS jsonb
      LANGUAGE plpgsql
      AS $function$
      DECLARE
        report_jsonb jsonb;
      BEGIN
        SET search_path TO "$user", dni, public;

        IF p_dry_run = TRUE 
        THEN
          WITH params AS (
            SELECT
              p_retention_period AS retention_period
          ),
          affected_colleague_ids AS (
            SELECT 
              colleague_uuid 
            FROM params, dni_user_extras due
            WHERE ((due.colleague_properties->>'leavingDate')::date + params.retention_period) < now()
               OR (due.last_login_at + params.retention_period) < now()
          ),
          dusl_to_delete AS (
            SELECT 
              dusl.log_uuid 
            FROM dni_user_subscription_log dusl 
            WHERE dusl.colleague_uuid IN (SELECT colleague_uuid FROM affected_colleague_ids)
          ),
          dus_to_delete AS (
            SELECT 
              colleague_uuid, 
              subscription_entity_type, 
              subscription_entity_id 
            FROM dni_user_subscription dus
            WHERE dus.colleague_uuid IN (SELECT colleague_uuid FROM affected_colleague_ids)
          ),
          duna_to_delete AS (
            SELECT 
              duna.acknowledge_uuid 
            FROM dni_user_notification_acknowledge duna 
            WHERE duna.colleague_uuid IN (SELECT colleague_uuid FROM affected_colleague_ids)
          ),
          due_to_delete AS (
            SELECT 
              colleague_uuid 
            FROM dni_user_extras due
            WHERE due.colleague_uuid IN (SELECT colleague_uuid FROM affected_colleague_ids)
          ),
          du_to_delete AS (
            SELECT 
              colleague_uuid 
            FROM dni_user du
            WHERE du.colleague_uuid IN (SELECT colleague_uuid FROM affected_colleague_ids)
          ),
          colleagues_to_delete_json AS (
            SELECT jsonb_agg(colleague_uuid) AS colleagues FROM du_to_delete
          )
          SELECT jsonb_build_object(
            'rows_to_delete', jsonb_build_object(
              'dni_user_subscription_log', (SELECT count(*) FROM dusl_to_delete),
              'dni_user_subscription', (SELECT count(*) FROM dus_to_delete),
              'dni_user_notification_acknowledge', (SELECT count(*) FROM duna_to_delete),
              'dni_user', (SELECT count(*) FROM du_to_delete)
            ),
            'colleagues_to_delete', coalesce(colleagues, '[]'::jsonb)
          )
          FROM colleagues_to_delete_json
          INTO report_jsonb;
        ELSE
          WITH params AS (
            SELECT
              p_retention_period AS retention_period
          ),
          affected_colleague_ids AS (
            SELECT 
              colleague_uuid 
            FROM params, dni_user_extras due
            WHERE ((due.colleague_properties->>'leavingDate')::date + params.retention_period) < now()
            OR (due.last_login_at + params.retention_period) < now()
          ),
          dusl_deleted AS (
            DELETE 
            FROM dni_user_subscription_log dusl 
            WHERE dusl.colleague_uuid IN (SELECT colleague_uuid FROM affected_colleague_ids)
            RETURNING dusl.log_uuid
          ),
          dus_deleted AS (
            DELETE 
            FROM dni_user_subscription dus
            WHERE dus.colleague_uuid IN (SELECT colleague_uuid FROM affected_colleague_ids)
            RETURNING colleague_uuid, subscription_entity_type, subscription_entity_id
          ),
          duna_deleted AS (
            DELETE 
            FROM dni_user_notification_acknowledge duna 
            WHERE duna.colleague_uuid IN (SELECT colleague_uuid FROM affected_colleague_ids)
            RETURNING duna.acknowledge_uuid
          ),
          due_deleted AS (
            DELETE 
            FROM dni_user_extras due
            WHERE due.colleague_uuid IN (SELECT colleague_uuid FROM affected_colleague_ids)
            RETURNING colleague_uuid
          ),
          du_deleted AS (
            DELETE 
            FROM dni_user du
            WHERE du.colleague_uuid IN (SELECT colleague_uuid FROM affected_colleague_ids)
            RETURNING colleague_uuid
          ),
          colleagues_deleted_json AS (
            SELECT jsonb_agg(colleague_uuid) AS colleagues FROM du_deleted
          )
          SELECT jsonb_build_object(
            'rows_deleted', jsonb_build_object(
              'dni_user_subscription_log', (SELECT count(*) FROM dusl_deleted),
              'dni_user_subscription', (SELECT count(*) FROM dus_deleted),
              'dni_user_notification_acknowledge', (SELECT count(*) FROM duna_deleted),
              'dni_user', (SELECT count(*) FROM du_deleted)
            ),
            'colleagues_deleted', coalesce(colleagues, '[]'::jsonb)
          )
          FROM colleagues_deleted_json
          INTO report_jsonb;
        END IF;
        
        RETURN report_jsonb;
      END
      $function$
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    // -- ==================================
    // -- fn_perform_dni_colleague_data_wipe
    // -- ==================================
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS fn_perform_dni_colleague_data_wipe;
    `);

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION fn_perform_dni_colleague_data_wipe(
          p_retention_period varchar(32) DEFAULT '6 month'
        )
      RETURNS jsonb 
      LANGUAGE plpgsql
      AS $function$
      DECLARE
        report_jsonb jsonb;
      BEGIN
        SET search_path TO "$user", dni, public;
    
        WITH params AS (
          SELECT
            p_retention_period::varchar AS retention_period
        ),
        affected_colleague_ids AS (
          SELECT 
            colleague_uuid 
          FROM params, dni_user_extras due
          WHERE ((due.colleague_properties->>'leavingDate')::date + params.retention_period::INTERVAL) < now()
              OR (due.last_login_at + params.retention_period::INTERVAL) < now()
        ),
        dusl_deleted AS (
          DELETE 
          FROM dni_user_subscription_log dusl 
          WHERE dusl.colleague_uuid IN (SELECT colleague_uuid FROM affected_colleague_ids)
          RETURNING dusl.log_uuid
        ),
        dus_deleted AS (
          DELETE 
          FROM dni_user_subscription dus
          WHERE dus.colleague_uuid IN (SELECT colleague_uuid FROM affected_colleague_ids)
          RETURNING colleague_uuid, subscription_entity_type, subscription_entity_id
        ),
        duna_deleted AS (
          DELETE 
          FROM dni_user_notification_acknowledge duna 
          WHERE duna.colleague_uuid IN (SELECT colleague_uuid FROM affected_colleague_ids)
          RETURNING duna.acknowledge_uuid
        ),
        due_deleted AS (
          DELETE 
          FROM dni_user_extras due
          WHERE due.colleague_uuid IN (SELECT colleague_uuid FROM affected_colleague_ids)
          RETURNING colleague_uuid
        ),
        du_deleted AS (
          DELETE 
          FROM dni_user du
          WHERE du.colleague_uuid IN (SELECT colleague_uuid FROM affected_colleague_ids)
          RETURNING colleague_uuid
        )
        SELECT jsonb_build_object(
          'dni_user_subscription_log_deleted', (SELECT count(*) FROM dusl_deleted),
          'dni_user_subscription_deleted', (SELECT count(*) FROM dus_deleted),
          'dni_user_notification_acknowledge_deleted', (SELECT count(*) FROM duna_deleted),
          'dni_user_deleted', (SELECT count(*) FROM du_deleted)
        )
        INTO report_jsonb;
    
        RETURN report_jsonb;
      END
      $function$
    `);
  }
}
