import {
  createConnection,
  Connection,
  ConnectionOptionsReader,
  ConnectionOptions,
} from 'typeorm';
import { getPackageDistFolder } from './package';

const connectionOptionsReader = new ConnectionOptionsReader({
  root: getPackageDistFolder('@dni/database', ['/src', '']),
});

let connectionOptions: ConnectionOptions;
let connection: Promise<Connection>;

export default async function connect(): Promise<Connection> {
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
