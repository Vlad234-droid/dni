import express from 'express';

import { dniApi as dniApiV1 } from './v1';

const dni = express.Router();

dni.use('/v1', dniApiV1);

export { dni };
