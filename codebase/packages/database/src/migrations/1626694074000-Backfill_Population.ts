import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import _ from 'lodash';

import { createReadStream } from 'fs';
import path from 'path';
import csv from 'csv-parser';
import stripBom from 'strip-bom-stream';
import yn from 'yn';

export class Migration_Backfill_population_1 implements MigrationInterface {
  name = 'Backfill_population_1-1626694074000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION  IF NOT EXISTS "fuzzystrmatch" WITH SCHEMA "public";`);

    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    type EmployeeData = {
      employeeNumber: string;
      colleagueUuid: string;
      email: string;
      addressPostCode?: string;
      businessType?: string;
      hireDate?: string;
      leavingDate?: string;
      subscribedNetworks?: string[];
      receiveEventsEmailNotifications?: boolean;
      receivePostsEmailNotifications?: boolean;
    };

    const stream = createReadStream(path.join(__dirname, 'data', 'DNI_backfill_population_20210719.csv'));

    const population = await new Promise<EmployeeData[]>((fulfill) => {
      const population: EmployeeData[] = [];

      const csvReaderOptions = {
        mapHeaders: (h: { header: string; index: number }) => _.camelCase(h.header),
        mapValues: (v: { header: string; index: number; value?: string }) => {
          switch (v.header) {
            case 'subscribedNetworks':
              return v.value && v.value.length > 0 ? v.value.split(':') : [];
            case 'receiveEventsEmailNotifications':
              return yn(v.value, { default: false });
            case 'receivePostsEmailNotifications':
              return yn(v.value, { default: false });
            default:
              return v.value && v.value.length > 0 ? v.value : undefined;
          }
        },
      };

      stream
        .pipe(stripBom())
        .pipe(csv(csvReaderOptions))
        .on('data', (data: any) => population.push(data))
        .on('end', () => fulfill(population));
    });

    for (const employee of population) {
      console.log(`Backfilling data for user ${employee.employeeNumber} ...`);

      // create user
      await queryRunner.query(
        `INSERT INTO dni_user (colleague_uuid, employee_number) VALUES($1, $2) 
        ON CONFLICT DO NOTHING;`,
        [employee.colleagueUuid, employee.employeeNumber],
      );

      // create or update user extras
      await queryRunner.query(
        `INSERT INTO dni_user_extras(colleague_uuid, colleague_properties, settings) 
        VALUES($1, 
          jsonb_build_object('hireDate', $2::date, 'leavingDate', $3::date, 'businessType', $4::varchar, 'addressPostcode', $5::varchar), 
          jsonb_build_object('receivePostsEmailNotifications', $6::boolean, 'receiveEventsEmailNotifications', $7::boolean)
        )
        ON CONFLICT (colleague_uuid) DO UPDATE SET
          colleague_properties = jsonb_build_object('hireDate', $2::date, 'leavingDate', $3::date, 'businessType', $4::varchar, 'addressPostcode', $5::varchar), 
          settings = jsonb_build_object('receivePostsEmailNotifications', $6::boolean, 'receiveEventsEmailNotifications', $7::boolean)
        WHERE dni_user_extras.colleague_uuid = $1;`,
        [
          employee.colleagueUuid,
          employee.hireDate,
          employee.leavingDate,
          employee.businessType,
          employee.addressPostCode,
          employee.receivePostsEmailNotifications,
          employee.receiveEventsEmailNotifications,
        ],
      );

      if (employee.subscribedNetworks && employee.subscribedNetworks.length > 0) {
        for (const networkName of employee.subscribedNetworks!) {
          const networkId = await this.acquireNetworkEntityId(queryRunner, networkName);

          if (networkId && !isNaN(networkId)) {
            // create user subscription ...
            const insertedUserSubscription = await queryRunner.query(
              `INSERT INTO dni_user_subscription(colleague_uuid, subscription_entity_id, subscription_entity_type)
              VALUES($1, $2, 'network')
              ON CONFLICT DO NOTHING
              RETURNING *;`,
              [employee.colleagueUuid, networkId],
            );

            // check if subscription was created
            if (Array.isArray(insertedUserSubscription) && insertedUserSubscription.length === 1) {
              // ... and create user subscription log record
              await queryRunner.query(
                `INSERT INTO dni_user_subscription_log(colleague_uuid, subscription_entity_id, subscription_entity_type, user_action)
                VALUES($1, $2, 'network', 'join')
                ON CONFLICT DO NOTHING;`,
                [employee.colleagueUuid, networkId],
              );
            }
          }
        }
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log(`Nothing to do as part of [${this.name}] migration down operation.`);
  }

  private networks = new Map<string, number>();

  private async acquireNetworkEntityId(queryRunner: QueryRunner, networkName: string): Promise<number | undefined> {
    const networkKey = networkName.toLowerCase();
    if (this.networks.has(networkKey)) {
      return this.networks.get(networkKey);
    }

    const networkEntityIdResponse = await queryRunner.query(
      `SELECT ce.entity_id AS "networkEntityId"
      FROM ccms_entity ce 
      WHERE ce.entity_type = 'network'
      ORDER BY public.difference(LOWER(ce.entity_instance->>'title'), LOWER($1)) DESC
      LIMIT 1;`,
      [networkKey],
    );

    const networkEntityId =
      Array.isArray(networkEntityIdResponse) && networkEntityIdResponse.length === 1
        ? networkEntityIdResponse.shift().networkEntityId
        : undefined;

    if (!isNaN(Number(networkEntityId))) {
      this.networks.set(networkKey, Number(networkEntityId));
      return Number(networkEntityId);
    }

    return undefined;
  }
}
