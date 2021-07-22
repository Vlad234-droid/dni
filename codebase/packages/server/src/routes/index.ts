import express from 'express';

import { healthCheck } from './healthcheck';
import { cep } from './cep';
import { dni } from './dni';
import { adminApi } from './admin';

const api = express.Router();

api.use(cep);

api.use('/admin', adminApi);
api.use('/dni', dni);

export { api, healthCheck };
