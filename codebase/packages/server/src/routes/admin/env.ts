import express from 'express';

import { getEnvironmentVariablesMiddleware } from '../../controllers';

const env = express.Router();

env.get('/env', getEnvironmentVariablesMiddleware);

export { env };
