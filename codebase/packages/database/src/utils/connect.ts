import { createConnection, Connection, ConnectionOptionsReader, ConnectionOptions } from 'typeorm';
import { getPackageDistFolder } from './package';

const packageDistFolder = getPackageDistFolder('@dni/database', ['src', '']);

const connectionOptionsReader = new ConnectionOptionsReader({ root: packageDistFolder });

let connectionOptions: ConnectionOptions;
let connection: Promise<Connection>;

export function getTypeOrmConnectionOptions(): ConnectionOptions {
  return connectionOptions;
}

export async function createTypeOrmConnection(overrideOptions?: Partial<ConnectionOptions>): Promise<Connection> {
  if (!connectionOptions) {
    connectionOptions = {
      ...(await connectionOptionsReader.get(process.env.TYPEORM_CONNECTION || 'default')),
    };
  }

  if (overrideOptions) {
    connectionOptions = Object.assign({}, connectionOptions, overrideOptions);
  }

  if (!connection) {
    connection = createConnection(connectionOptions);
  }

  return connection;
}
