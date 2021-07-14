import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class Migration_Update_fn_get_dni_user_mailing_data implements MigrationInterface {
  name = 'Update_fn_get_dni_user_mailing_data-1626219140000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    // -- ============================
    // -- fn_get_dni_user_mailing_data
    // -- ============================
    await queryRunner.query(
      `CREATE OR REPLACE FUNCTION fn_get_dni_user_mailing_data(
            p_entity_type dni_entity_type_enum,
            p_entity_id int4 DEFAULT NULL
            )
        RETURNS jsonb 
        LANGUAGE plpgsql
      AS $function$
      DECLARE
          mailing_data_jsonb jsonb;
      BEGIN
          IF p_entity_type IS NULL
          THEN
            RAISE EXCEPTION '"p_entity_type" parameter is required'
              USING HINT = 'These options are available: "event", "post"';
          END IF;
      
          SET search_path TO "$user", dni, public;
      
          WITH 
            params AS (SELECT 
              p_entity_type as entity_type,
              p_entity_id as entity_id
            ),
            root_ancestor AS (SELECT
              entity_type,
              entity_id,
              "type" as root_ancestor_type,
              "id" as root_ancestor_id
            FROM params, fn_get_ccms_entity_root_ancestor(p_entity := ROW(entity_id , entity_type), p_only_published := TRUE)
            ),
            entity_hierarchy AS (SELECT
              ce.entity_instance,
              ce.entity_type,
              ce.entity_id,
              ce.parent_entity_type,
              ce.parent_entity_id,
              ra.root_ancestor_type,
              ra.root_ancestor_id
            FROM root_ancestor ra
            JOIN ccms_entity ce ON ra.entity_id = ce.entity_id AND ra.entity_type = ce.entity_type
            WHERE ce.entity_published_at IS NOT NULL 
              AND ce.entity_deleted_at IS NULL
            ),
            affected_users_1 AS (SELECT
              dus.colleague_uuid AS colleague_uuid
            FROM params, dni_user_subscription dus 
            JOIN dni_user_extras due ON dus.colleague_uuid = due.colleague_uuid 
            WHERE 
              (
                ((dus.subscription_entity_id IN (select parent_entity_id FROM entity_hierarchy)) AND (dus.subscription_entity_type IN (select parent_entity_type FROM entity_hierarchy))) OR 
                ((dus.subscription_entity_id IN (select root_ancestor_id FROM entity_hierarchy)) AND (dus.subscription_entity_type IN (select root_ancestor_type FROM entity_hierarchy)))
              )
              AND 
              (
                (entity_type = 'post'::dni_entity_type_enum AND (due.settings->>'receivePostsEmailNotifications')::boolean = TRUE) OR 
                (entity_type = 'event'::dni_entity_type_enum AND (due.settings->>'receiveEventsEmailNotifications')::boolean = TRUE) 
              )
            ),
            affected_users_2 AS (SELECT
              due.colleague_uuid AS colleague_uuid
            FROM dni_user_extras due 
            CROSS JOIN params
            JOIN entity_hierarchy eh
              ON params.entity_type = eh.entity_type AND params.entity_id = eh.entity_id
            WHERE
              ((params.entity_type = 'post'::dni_entity_type_enum AND (due.settings->>'receivePostsEmailNotifications')::boolean = TRUE) OR 
              (params.entity_type = 'event'::dni_entity_type_enum AND (due.settings->>'receiveEventsEmailNotifications')::boolean = TRUE)) 
              AND eh.parent_entity_type IS NULL AND eh.root_ancestor_type IS NULL
            ),
            affected_users AS (SELECT
              coalesce(jsonb_agg(affected_users.colleague_uuid), '[]'::jsonb) AS colleague_uuids
            FROM (
              SELECT colleague_uuid FROM affected_users_1
              UNION
              SELECT colleague_uuid FROM affected_users_2
            ) affected_users)
          SELECT 
            jsonb_build_object(
              'entity', entity_hierarchy.entity_instance,
              'affectedColleagueUuids', affected_users.colleague_uuids
            ) as contact_data
          INTO mailing_data_jsonb
          FROM entity_hierarchy, affected_users
          ;
      
          RETURN mailing_data_jsonb;
      END
      $function$
      ;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    // -- ============================
    // -- fn_get_dni_user_mailing_data
    // -- ============================
    await queryRunner.query(
      `CREATE OR REPLACE FUNCTION fn_get_dni_user_mailing_data(
            p_entity_type dni_entity_type_enum,
            p_entity_id int4 DEFAULT NULL
            )
        RETURNS jsonb 
        LANGUAGE plpgsql
      AS $function$
      DECLARE
          mailing_data_jsonb jsonb;
      BEGIN
          IF p_entity_type IS NULL
          THEN
            RAISE EXCEPTION '"p_entity_type" parameter is required'
              USING HINT = 'These options are available: "event", "post"';
          END IF;
      
          SET search_path TO "$user", dni, public;
      
          WITH 
            params AS (SELECT 
              p_entity_type as entity_type,
              p_entity_id as entity_id
            ),
            root_ancestor AS (SELECT
              entity_type,
              entity_id,
              "type" as root_ancestor_type,
              "id" as root_ancestor_id
            FROM params, fn_get_ccms_entity_root_ancestor(p_entity := ROW(entity_id , entity_type), p_only_published := TRUE)
            ),
            entity_hierarchy AS (SELECT
              ce.entity_instance,
              ce.parent_entity_type,
              ce.parent_entity_id,
              ra.root_ancestor_type,
              ra.root_ancestor_id
            FROM root_ancestor ra
            JOIN ccms_entity ce ON ra.entity_id = ce.entity_id AND ra.entity_type = ce.entity_type
            WHERE ce.entity_published_at IS NOT NULL 
              AND ce.entity_deleted_at IS NULL
            ),
            affected_users AS (SELECT
              coalesce(jsonb_agg(dus.colleague_uuid), '[]'::jsonb) AS colleague_uuids
            FROM params, dni_user_subscription dus 
            JOIN dni_user_extras due ON dus.colleague_uuid = due.colleague_uuid 
            WHERE 
              (
                ((dus.subscription_entity_id IN (select parent_entity_id FROM entity_hierarchy)) AND (dus.subscription_entity_type IN (select parent_entity_type FROM entity_hierarchy))) OR 
                ((dus.subscription_entity_id IN (select root_ancestor_id FROM entity_hierarchy)) AND (dus.subscription_entity_type IN (select root_ancestor_type FROM entity_hierarchy)))
              )
              AND 
              (
                (entity_type = 'post'::dni_entity_type_enum AND (due.settings->>'receivePostsEmailNotifications')::boolean = TRUE) OR 
                (entity_type = 'event'::dni_entity_type_enum AND (due.settings->>'receiveEventsEmailNotifications')::boolean = TRUE) 
              )
            )
          SELECT 
            jsonb_build_object(
              'entity', entity_hierarchy.entity_instance,
              'affectedColleagueUuids', affected_users.colleague_uuids
            ) as contact_data
          INTO mailing_data_jsonb
          FROM entity_hierarchy, affected_users
          ;
      
          RETURN mailing_data_jsonb;
      END
      $function$
      ;`,
    );
  }
}
