import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class Migration_Initial_1624690800000 implements MigrationInterface {
  name = 'InitialTables-1624690800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "public";`);

    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "public";`);

    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    // -- ====================
    // -- dni_entity_type_enum
    // -- ====================
    await queryRunner.query(
      `CREATE TYPE dni_entity_type_enum AS ENUM (
        'network',
        'event',
        'post',
        'partner',
        'meta-category'
      );
      `,
    );

    // -- ====================
    // -- dni_user_action_enum
    // -- ====================
    await queryRunner.query(
      `CREATE TYPE dni_user_action_enum AS ENUM (
        'join',
        'leave'
      );
      `,
    );

    //-- ========
    //-- dni_user
    //-- ========
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS dni_user (
        colleague_uuid uuid NOT NULL,
        employee_number varchar(12) NOT NULL,
        created_at timestamptz(0) NOT NULL DEFAULT now(),
        updated_at timestamptz(0) NULL,
        CONSTRAINT "dni_user__pk" PRIMARY KEY (colleague_uuid)
      );

      COMMENT ON COLUMN dni_user.colleague_uuid IS 'ColleagueUUID';
      COMMENT ON COLUMN dni_user.employee_number IS 'a.k.a. TPX';

      CREATE INDEX "dni_user$created_at__idx" ON dni_user (created_at);
      `,
    );

    //-- ===============
    //-- dni_user_extras
    //-- ===============
    await queryRunner.query(
      `CREATE TABLE dni_user_extras (
        colleague_uuid uuid NOT NULL,
        last_login_at timestamptz(0) NULL,
        colleague_properties jsonb NULL,
        settings jsonb NULL,
        metadata jsonb NULL,
        CONSTRAINT "dni_user_extras__pk" PRIMARY KEY (colleague_uuid),
        CONSTRAINT "dni_user_extras$colleague_uuid__fk" FOREIGN KEY (colleague_uuid) REFERENCES dni_user(colleague_uuid) ON UPDATE CASCADE ON DELETE CASCADE
      );
      
      COMMENT ON COLUMN dni_user_extras.colleague_properties IS 'Colleague API properties';
      
      CREATE INDEX "dni_user_extras$last_login_at__idx" ON dni_user_extras (last_login_at);
      CREATE INDEX "dni_user_extras$colleague_properties__idx" ON dni_user_extras USING gin(colleague_properties);
      CREATE INDEX "dni_user_extras$settings__idx" ON dni_user_extras USING gin(settings);
      CREATE INDEX "dni_user_extras$metadata__idx" ON dni_user_extras USING gin(metadata);
      `,
    );

    // -- =====================
    // -- dni_user_subscription
    // -- =====================
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS dni_user_subscription (
        colleague_uuid uuid NOT NULL,
        subscription_entity_id int4 NOT NULL,
        subscription_entity_type dni_entity_type_enum NOT NULL,
        created_at timestamptz(0) NOT NULL DEFAULT now(),
        CONSTRAINT "d_u_subscription$colleague_uuid__fk" FOREIGN KEY (colleague_uuid) REFERENCES dni_user(colleague_uuid),
        CONSTRAINT "d_u_subscription__pk" PRIMARY KEY (colleague_uuid, subscription_entity_type, subscription_entity_id)
      );
      
      CREATE INDEX "d_u_subscription$created_at__idx" ON dni_user_subscription (created_at);
      `,
    );

    // -- =========================
    // -- dni_user_subscription_log
    // -- =========================
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS dni_user_subscription_log (
        log_uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
        colleague_uuid uuid NOT NULL,
        subscription_entity_id int4 NOT NULL,
        subscription_entity_type dni_entity_type_enum NOT NULL,
        user_action dni_user_action_enum NOT NULL,
        created_at timestamptz(0) NOT NULL DEFAULT now(),
        CONSTRAINT "d_u_subscription_log$colleague_uuid__fk" FOREIGN KEY (colleague_uuid) REFERENCES dni_user(colleague_uuid),
        CONSTRAINT "d_u_subscription_log__pk" PRIMARY KEY (log_uuid)
      );
      
      CREATE INDEX "d_u_subscription_log$created_at__idx" ON dni_user_subscription_log (created_at);
      `,
    );

    // -- =================================
    // -- dni_user_notification_acknowledge
    // -- =================================
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS dni_user_notification_acknowledge (
        acknowledge_uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
        colleague_uuid uuid NOT NULL,
        acknowledge_entity_id int4 NOT NULL,
        acknowledge_entity_type dni_entity_type_enum NOT NULL,
        acknowledge_created_at timestamptz(0) NOT NULL DEFAULT now(),
        CONSTRAINT "d_u_n_acknowledge$colleague_uuid__fk" FOREIGN KEY (colleague_uuid) REFERENCES dni_user(colleague_uuid),
        CONSTRAINT "d_u_n_acknowledge__pk" PRIMARY KEY (acknowledge_uuid)
      );
      
      CREATE INDEX "d_u_n_acknowledge$acknowledge_created_at__idx" ON dni_user_notification_acknowledge USING btree (acknowledge_created_at DESC);
      CREATE INDEX "d_u_n_acknowledge$colleague_uuid$a_entity_type$a_entity_id__idx" ON dni_user_notification_acknowledge USING btree (colleague_uuid, acknowledge_entity_type, acknowledge_entity_id);
      `,
    );

    // -- ===========
    // -- capi_region
    // -- ===========
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS capi_region (
        post_index_prefix varchar(8) NOT NULL,
        region_name varchar(64) NOT NULL,
        CONSTRAINT "c_region__pk" PRIMARY KEY (post_index_prefix)
      );
      
      COMMENT ON TABLE capi_region IS 'Colleague API regions dictionary';
      `,
    );

    // -- ===============
    // -- capi_department
    // -- ===============
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS capi_department (
        capi_business_type varchar(32) NOT NULL,
        department_name varchar(64) NOT NULL,
        CONSTRAINT "c_department__pk" PRIMARY KEY (capi_business_type)
      );
      
      COMMENT ON TABLE capi_department IS 'Colleague API departments dictionary';
      `,
    );

    // -- =================
    // -- ccms_trigger_enum
    // -- =================
    await queryRunner.query(
      `CREATE TYPE ccms_trigger_event_enum AS ENUM (
        'created',
        'updated',
        'deleted',
        'published'
      );
      `,
    );

    // -- =================
    // -- ccms_notification
    // -- =================
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS ccms_notification (
        notification_uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
        notification_trigger_event ccms_trigger_event_enum NOT NULL,
        entity_id int4 NOT NULL,
        entity_type dni_entity_type_enum NOT NULL,
        entity_created_at timestamptz(0) NOT NULL,
        entity_updated_at timestamptz(0) NULL,
        received_at timestamptz(0) NOT NULL DEFAULT now(),
        CONSTRAINT "c_notification__pk" PRIMARY KEY (notification_uuid)
      );
      
      COMMENT ON TABLE ccms_notification IS 'Collleague CMS notifications';
      
      CREATE INDEX "c_notification$entity_received_at__idx" ON ccms_notification (received_at);
      
      CREATE INDEX "c_notification$entity_created_at__idx" ON ccms_notification (entity_created_at);
      `,
    );

    // -- ===========
    // -- ccms_entity
    // -- ===========
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS ccms_entity (
        entity_id int4 NOT NULL,
        entity_type dni_entity_type_enum NOT NULL,
        slug varchar(128) NOT NULL,
        entity_instance jsonb NULL,
        entity_metadata jsonb NULL,
        entity_created_at timestamptz(0) NOT NULL,
        entity_updated_at timestamptz(0) NULL,
        entity_published_at timestamptz(0) NULL,
        entity_deleted_at timestamptz(0) NULL,
        parent_entity_id int4 NULL,
        parent_entity_type dni_entity_type_enum NULL,
        notification_uuid uuid NULL,
        notification_trigger_event ccms_trigger_event_enum NULL,
        created_at timestamptz(0) NOT NULL DEFAULT now(),
        updated_at timestamptz(0) NULL,
        CONSTRAINT "c_entity$parent_entity__fk" FOREIGN KEY (parent_entity_id, parent_entity_type) REFERENCES ccms_entity(entity_id, entity_type),
        CONSTRAINT "c_entity$notification_uuid__fk" FOREIGN KEY (notification_uuid) REFERENCES ccms_notification(notification_uuid),
        CONSTRAINT "c_entity__pk" PRIMARY KEY (entity_id, entity_type)
      );
      
      COMMENT ON TABLE ccms_entity IS 'Collleague CMS Entities cache';
      
      CREATE INDEX "c_entity$created_at__idx" ON ccms_entity (created_at);
      
      CREATE INDEX "c_entity$entity_created_at__idx" ON ccms_entity (entity_created_at);
      
      CREATE INDEX "c_entity$entity_instance__idx" ON ccms_entity USING gin(entity_instance);

      CREATE INDEX "c_entity$entity_metadata__idx" ON ccms_entity USING gin(entity_metadata);
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    await queryRunner.query(`DROP TABLE IF EXISTS ccms_entity;`);
    await queryRunner.query(`DROP TABLE IF EXISTS ccms_notification;`);
    await queryRunner.query(`DROP TYPE IF EXISTS ccms_trigger_event_enum;`);
    await queryRunner.query(`DROP TABLE IF EXISTS capi_department;`);
    await queryRunner.query(`DROP TABLE IF EXISTS capi_region;`);
    await queryRunner.query(`DROP TABLE IF EXISTS dni_user_notification_acknowledge;`);
    await queryRunner.query(`DROP TABLE IF EXISTS dni_user_subscription_log;`);
    await queryRunner.query(`DROP TABLE IF EXISTS dni_user_subscription;`);
    await queryRunner.query(`DROP TYPE IF EXISTS dni_user_action_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS dni_entity_type_enum;`);
    await queryRunner.query(`DROP TABLE IF EXISTS dni_user_extras;`);
    await queryRunner.query(`DROP TABLE IF EXISTS dni_user;`);
  }
}
