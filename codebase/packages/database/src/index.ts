import 'reflect-metadata';
import { createTypeOrmConnection, getTypeOrmConnectionOptions, getSchema, getSchemaPrefix, slugify } from './utils';
import { getManager, getRepository, Connection } from 'typeorm';

createTypeOrmConnection()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .then(async (_: Connection) => {
    // TODO: load seeds
    // you can experiment with entities here
  })
  .catch((error) => { throw new Error(error); }); 

export * from './entities';
export * from './subscribers';

export {
  createTypeOrmConnection,
  getTypeOrmConnectionOptions,
  getManager,
  getRepository,
  getSchema,
  getSchemaPrefix,
  slugify,
};
