import 'reflect-metadata';
import { createConnection, getConnectionOptions } from './utils';
import { getManager, getRepository, Connection } from 'typeorm';

createConnection()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .then(async (_: Connection) => {
    // TODO: load seeds
    // you can experiment with entities here
  })
  .catch((error) => console.log(error));

export * from './entities';
export { createConnection, getConnectionOptions, getManager, getRepository };
