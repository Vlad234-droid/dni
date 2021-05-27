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

export function getConnectionOptions(): ConnectionOptions {
  return connectionOptions;
}

export async function connect(): Promise<Connection> {
  if (!connection) {
    connectionOptions = {
      ...(await connectionOptionsReader.get(
        process.env.TYPEORM_CONNECTION || 'default',
      )),
    };
    connection = createConnection(connectionOptions);
  }

  return connection;
}
