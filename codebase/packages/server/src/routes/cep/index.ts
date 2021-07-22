import express from 'express';

import { cmsEvents } from './cms-events';

const cep = express.Router();

cep.use(cmsEvents);

export { cep };
