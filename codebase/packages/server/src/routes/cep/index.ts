import express from 'express';

import { cep } from './cep';

const adminApi = express.Router();

adminApi.use(cep);

export { cep };
