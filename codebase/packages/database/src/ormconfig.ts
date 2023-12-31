import path from 'path';
import { SnakeNamingStrategy, getPackageDistFolder } from './utils';
import dotenv from 'dotenv';

dotenv.config();

const {
  TYPEORM_TYPE,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_DATABASE,
  TYPEORM_SCHEMA,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_SYNCHRONIZE,
  TYPEORM_LOGGING,
  TYPEORM_SSL,
} = process.env;

const root = getPackageDistFolder('@dni/database', ['', '']);
//console.log(`PackageDistFolder of '@dni/database': ${root}`);

const buildPath = (...paths: string[]) => path.join(...paths);
const buildPathWithExt = (dir: string, ext = '*{.ts,.js}') => buildPath(dir, '**', ext);
const ENTITIES_DIR = buildPath(root, 'entities');
const SUBSCRIBERS_DIR = buildPath(root, 'subscribers');
//const MIGRATIONS_DIR = buildPath('src', 'migrations');
const MIGRATIONS_DIR = buildPath(root, 'migrations');
const SCHEMAS_DIR = buildPath(root, 'schemas');

const sslOpt = { ssl: TYPEORM_SSL === 'true' };

const typeOrmConfig = {
  ...sslOpt,
  type: TYPEORM_TYPE,
  host: TYPEORM_HOST,
  port: TYPEORM_PORT,
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE,
  schema: TYPEORM_SCHEMA || 'public',
  logging: TYPEORM_LOGGING ? TYPEORM_LOGGING === 'true' : false,
  synchronize: TYPEORM_SYNCHRONIZE ? TYPEORM_SYNCHRONIZE === 'true' : false,
  entities: [buildPathWithExt(ENTITIES_DIR)],
  subscribers: [buildPathWithExt(SUBSCRIBERS_DIR)],
  entitySchemas: [buildPathWithExt(SCHEMAS_DIR, '*.json')],
  migrations: [buildPathWithExt(MIGRATIONS_DIR)],
  migrationsTableName: 'dni_migrations',
  migrationsTransactionMode: 'each',
  cli: {
    entitiesDir: ENTITIES_DIR,
    migrationsDir: MIGRATIONS_DIR,
    subscribersDir: SUBSCRIBERS_DIR,
  },
  namingStrategy: new SnakeNamingStrategy(),
};

export default typeOrmConfig;
