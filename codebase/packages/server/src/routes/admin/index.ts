import express from 'express';

import { roleAuth } from '../../middlewares/role-auth-handler';

import { env } from './env';
import { typeOrm } from './type-orm';

const adminApi = express.Router();

const ROLE_ADMIN = 'Admin';

adminApi.use(roleAuth(ROLE_ADMIN), env);
adminApi.use(roleAuth(ROLE_ADMIN), typeOrm);

export { adminApi };
