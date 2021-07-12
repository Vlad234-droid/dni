import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresDriver } from 'typeorm/driver/postgres/PostgresDriver';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { Pool, PoolClient } from 'pg';
import pgCopy from 'pg-copy-streams';

import fs from 'fs';
import path from 'path';

export class Migration_BAckfill_1624690800001 implements MigrationInterface {
  name = 'BackfillData-1624690800002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.copyFromCsv(queryRunner, `capi_region`, path.join(__dirname, 'data', 'CAPI_regions.csv'));
    await this.copyFromCsv(queryRunner, `capi_department`, path.join(__dirname, 'data', 'CAPI_departments.csv'));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.clearTable(`capi_department`);
    queryRunner.clearTable(`capi_region`);
  }

  async copyFromCsv(queryRunner: QueryRunner, tableName: string, filePath: string): Promise<void> {
    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema || 'public';

    const fileStream = fs.createReadStream(filePath);

    const pool: Pool = (queryRunner.connection.driver as PostgresDriver).master;
    const client: PoolClient = await pool.connect();

    try {
      const sql = `COPY "${schema}"."${tableName}" FROM STDIN WITH CSV HEADER`;

      queryRunner.connection.logger && queryRunner.connection.logger.logQuery(sql, undefined, queryRunner);

      const stream = client.query(pgCopy.from(sql));
      await new Promise((fulfill, reject) => {
        stream.on('finish', fulfill);
        stream.on('error', (err) => reject(err));
        fileStream.on('error', (err) => reject(err));
        fileStream.pipe(stream);
      });
    } finally {
      client.release();
    }
  }
}
