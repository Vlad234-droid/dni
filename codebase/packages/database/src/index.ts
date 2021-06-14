import 'reflect-metadata';
import { createTypeOrmConnection, getTypeOrmConnectionOptions } from './utils';
import { getManager, getRepository, Connection } from 'typeorm';

createTypeOrmConnection()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .then(async (_: Connection) => {
    // TODO: load seeds
    // you can experiment with entities here
  })
  .catch((error) => console.log(error));

export * from './entities';
export { createTypeOrmConnection, getTypeOrmConnectionOptions, getManager, getRepository };
