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
} = process.env;

const root = getPackageDistFolder('@dni/database', ['', '']);

const ENTITIES_DIR = `${root}/entities`;
const SUBSCRIBERS_DIR = `${root}/subscribers`;
const MIGRATIONS_DIR = `${root}/migrations`;
const SCHEMAS_DIR = `${root}/schemas`;

const buildPathWithExt = (dir: string, ext = '*.ts') => path.join(dir, ext);

export default {
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
