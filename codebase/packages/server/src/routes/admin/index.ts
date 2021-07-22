import express from 'express';

import { env } from './env';
import { typeOrm } from './type-orm';

const adminApi = express.Router();

adminApi.use(env);
adminApi.use(typeOrm);

export { adminApi };
