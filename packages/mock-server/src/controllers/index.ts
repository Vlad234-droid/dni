import express, { Request, Response } from 'express';
import { TESCO_API_URLS } from '@energon-connectors/core';

import { colleagueApiRouter } from './colleague';
import { colleagueCmsApiRouter } from './colleague-cms';

const API_PATH = TESCO_API_URLS.LOCAL;

const healthCheck = express.Router();
const api = express.Router();

api.use(API_PATH, colleagueApiRouter);
api.use(colleagueCmsApiRouter);

healthCheck.get('/_status', (_: Request, res: Response) => res.sendStatus(200));

export { healthCheck, api };
