import 'reflect-metadata';
import { createTypeOrmConnection, getTypeOrmConnectionOptions, getSchema, getSchemaPrefix, slugify } from './utils';
import { getManager, getRepository } from 'typeorm';

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
