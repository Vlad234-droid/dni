import { createConnection, Connection, ConnectionOptionsReader, ConnectionOptions } from 'typeorm';
import { getPackageDistFolder } from './package';

const packageDistFolder = getPackageDistFolder('@dni/database', ['src', '']);

const connectionOptionsReader = new ConnectionOptionsReader({ root: packageDistFolder });

let connectionOptions: ConnectionOptions & { schema?: string };
let connection: Connection | undefined;

const assertConnectionValid = () => {
  if (!connection || !connection.isConnected) {
    throw Error('Connection is not yet inialized!');
  }
}

/**
 * 
 * @param overrideOptions 
 * @returns 
 */
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
    connection = await createConnection(connectionOptions);
  }

  return connection;
}

/**
 * 
 * @returns 
 */
export function getTypeOrmConnectionOptions(): ConnectionOptions {
  assertConnectionValid();
  return connectionOptions;
}

/**
 * 
 * @returns 
 */
export function getSchema(): string | undefined {
  assertConnectionValid();
  const { schema } = connectionOptions;
  return schema;
};

/**
 * 
 * @returns 
 */
export function getSchemaPrefix(): string {
  const schema = getSchema();
  return schema ? `"${schema}".` : '';
};


