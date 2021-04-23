import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1619173568806 implements MigrationInterface {
  name = 'Initial1619173568806';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "employee_event" ("employee_number" character varying NOT NULL, "event_id" integer NOT NULL, CONSTRAINT "PK_210d36b2ed80644c4e85b922dff" PRIMARY KEY ("employee_number", "event_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "employee_network" ("employee_number" character varying NOT NULL, "network_id" integer NOT NULL, CONSTRAINT "PK_19ac8f03684e0412c385ecd0c71" PRIMARY KEY ("employee_number", "network_id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "employee_history_action_enum" AS ENUM('JOIN', 'LEAVE')`,
    );
    await queryRunner.query(
      `CREATE TYPE "employee_history_entity_type_enum" AS ENUM('NETWORK', 'EVENT')`,
    );
    await queryRunner.query(
      `CREATE TABLE "employee_history" ("updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "action" "employee_history_action_enum" NOT NULL, "entity_type" "employee_history_entity_type_enum" NOT NULL, "entity_id" integer NOT NULL, "entity" jsonb NOT NULL, CONSTRAINT "PK_69f9bbe2842de908de4e5e097dc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c2f69a9249958aa971e3321f03" ON "employee_history" ("entity_type", "entity_id") `,
    );
    await queryRunner.query(
      `CREATE TYPE "notification_action_enum" AS ENUM('POST_UPDATED', 'POST_CREATED', 'POST_ARCHIVED', 'POST_REMOVED', 'EVENT_UPDATED', 'EVENT_CREATED', 'EVENT_ARCHIVED', 'EVENT_REMOVED', 'NETWORK_UPDATED', 'NETWORK_CREATED', 'NETWORK_ARCHIVED', 'NETWORK_REMOVED')`,
    );
    await queryRunner.query(
      `CREATE TYPE "notification_entity_type_enum" AS ENUM('POST', 'NETWORK', 'EVENT')`,
    );
    await queryRunner.query(
      `CREATE TABLE "notification" ("updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "action" "notification_action_enum" NOT NULL, "entity_type" "notification_entity_type_enum" NOT NULL, "entity" jsonb NOT NULL, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "notification"`);
    await queryRunner.query(`DROP TYPE "notification_entity_type_enum"`);
    await queryRunner.query(`DROP TYPE "notification_action_enum"`);
    await queryRunner.query(`DROP INDEX "IDX_c2f69a9249958aa971e3321f03"`);
    await queryRunner.query(`DROP TABLE "employee_history"`);
    await queryRunner.query(`DROP TYPE "employee_history_entity_type_enum"`);
    await queryRunner.query(`DROP TYPE "employee_history_action_enum"`);
    await queryRunner.query(`DROP TABLE "employee_network"`);
    await queryRunner.query(`DROP TABLE "employee_event"`);
  }
}
