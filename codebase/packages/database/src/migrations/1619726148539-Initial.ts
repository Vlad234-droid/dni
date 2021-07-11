import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1619726148539 implements MigrationInterface {
  name = 'Initial1619726148539';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`CREATE TABLE "employee_event"
    //                              (
    //                                  "tpx_id"   character varying NOT NULL,
    //                                  "event_id" integer           NOT NULL,
    //                                  CONSTRAINT "employee_event_pk" PRIMARY KEY ("tpx_id", "event_id")
    //                              )`);
    // await queryRunner.query(`CREATE TABLE "employee_network"
    //                              (
    //                                  "tpx_id"     character varying NOT NULL,
    //                                  "network_id" integer           NOT NULL,
    //                                  CONSTRAINT "employee_network_pk" PRIMARY KEY ("tpx_id", "network_id")
    //                              )`);
    // await queryRunner.query(
    //   `CREATE TYPE "employee_history_action_enum" AS ENUM('JOIN', 'LEAVE')`,
    // );
    // await queryRunner.query(
    //   `CREATE TYPE "employee_history_entity_type_enum" AS ENUM('NETWORK', 'EVENT')`,
    // );
    // await queryRunner.query(`CREATE TABLE "employee_history"
    //                              (
    //                                  "updated_at"  TIMESTAMP                           NOT NULL DEFAULT now(),
    //                                  "created_at"  TIMESTAMP                           NOT NULL DEFAULT now(),
    //                                  "uuid"        uuid                                NOT NULL DEFAULT uuid_generate_v4(),
    //                                  "action"      "employee_history_action_enum"      NOT NULL,
    //                                  "entity_type" "employee_history_entity_type_enum" NOT NULL,
    //                                  "entity_id"   integer                             NOT NULL,
    //                                  "entity"      jsonb                               NOT NULL,
    //                                  CONSTRAINT "employee_history_pk" PRIMARY KEY ("uuid")
    //                              )`);
    // await queryRunner.query(`CREATE
    //     INDEX "employee_history_ent_typ_ent_id_idx" ON "employee_history" ("entity_type", "entity_id") `);
    // await queryRunner.query(
    //   `CREATE TYPE "notification_action_enum" AS ENUM('POST_UPDATED', 'POST_CREATED', 'POST_ARCHIVED', 'POST_REMOVED', 'EVENT_UPDATED', 'EVENT_CREATED', 'EVENT_ARCHIVED', 'EVENT_REMOVED', 'NETWORK_UPDATED', 'NETWORK_CREATED', 'NETWORK_ARCHIVED', 'NETWORK_REMOVED')`,
    // );
    // await queryRunner.query(
    //   `CREATE TYPE "notification_entity_type_enum" AS ENUM('POST', 'NETWORK', 'EVENT')`,
    // );
    // await queryRunner.query(`CREATE TABLE "notification"
    //                              (
    //                                  "updated_at"  TIMESTAMP                       NOT NULL DEFAULT now(),
    //                                  "created_at"  TIMESTAMP                       NOT NULL DEFAULT now(),
    //                                  "id"          SERIAL                          NOT NULL,
    //                                  "action"      "notification_action_enum"      NOT NULL,
    //                                  "entity_type" "notification_entity_type_enum" NOT NULL,
    //                                  "entity"      jsonb                           NOT NULL,
    //                                  CONSTRAINT "notification_pk" PRIMARY KEY ("id")
    //                              )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`DROP TABLE "notification"`);
    // await queryRunner.query(`DROP TYPE "notification_entity_type_enum"`);
    // await queryRunner.query(`DROP TYPE "notification_action_enum"`);
    // await queryRunner.query(`DROP
    //     INDEX "employee_history_ent_typ_ent_id_idx"`);
    // await queryRunner.query(`DROP TABLE "employee_history"`);
    // await queryRunner.query(`DROP TYPE "employee_history_entity_type_enum"`);
    // await queryRunner.query(`DROP TYPE "employee_history_action_enum"`);
    // await queryRunner.query(`DROP TABLE "employee_network"`);
    // await queryRunner.query(`DROP TABLE "employee_event"`);
  }
}
