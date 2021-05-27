import path from 'path';
import { SnakeNamingStrategy, getPackageDistFolder } from './src/utils';
import dotenv from 'dotenv';

dotenv.config();

const {
  TYPEORM_TYPE,
  TYPEORM_HOST,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_PORT,
  TYPEORM_SYNCHRONIZE,
  TYPEORM_LOGGING,
  TYPEORM_SSL,
} = process.env;

const root = getPackageDistFolder('@dni/database', ['', '']);
const buildPath = (...paths: string[]) => path.join(...paths);
const buildPathWithExt = (dir: string, ext = '*.ts') => buildPath(dir, ext);
const ENTITIES_DIR = buildPath(root, 'entities');
const SUBSCRIBERS_DIR = buildPath(root, 'subscribers');
const MIGRATIONS_DIR = buildPath('src', 'migrations');
const SCHEMAS_DIR = buildPath(root, 'schemas');

const sslOpt = { ssl: TYPEORM_SSL === 'true' };

export default {
  ...sslOpt,
  type: TYPEORM_TYPE,
  host: TYPEORM_HOST,
  port: TYPEORM_PORT,
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE,
  logging: TYPEORM_LOGGING,
  synchronize: TYPEORM_SYNCHRONIZE,
  entities: [buildPathWithExt(ENTITIES_DIR)],
  subscribers: [buildPathWithExt(SUBSCRIBERS_DIR)],
  entitySchemas: [buildPathWithExt(SCHEMAS_DIR, '*.json')],
  migrations: [buildPathWithExt(MIGRATIONS_DIR)],
  cli: {
    entitiesDir: ENTITIES_DIR,
    migrationsDir: MIGRATIONS_DIR,
    subscribersDir: SUBSCRIBERS_DIR,
  },
  namingStrategy: new SnakeNamingStrategy(),
};
