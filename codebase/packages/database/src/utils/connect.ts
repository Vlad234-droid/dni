import {
  createConnection,
  Connection,
  ConnectionOptionsReader,
  ConnectionOptions,
} from 'typeorm';
import { getPackageDistFolder } from './package';

const packageDistFolder = getPackageDistFolder('@dni/database', ['src', '']);

console.log(`TypeORM connection options folder: ${packageDistFolder}`);

const connectionOptionsReader = new ConnectionOptionsReader({ root: packageDistFolder });

let connectionOptions: ConnectionOptions;
let connection: Promise<Connection>;

export function getTypeOrmConnectionOptions(): ConnectionOptions {
  return connectionOptions;
}

export async function createTypeOrmConnection(): Promise<Connection> {
  if (!connectionOptions) {
    connectionOptions = {
      ...(await connectionOptionsReader.get(
        process.env.TYPEORM_CONNECTION || 'default',
      )),
    };

    console.log('--- 2 ---');
    console.log(connectionOptions);
  }

  if (!connection) {
    connection = createConnection(connectionOptions);
  }

  return connection;
}
