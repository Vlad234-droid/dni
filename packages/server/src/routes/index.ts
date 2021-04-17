import express, { Request, Response } from 'express';

import {
  // colleague
  getNetworksByColleagueId,
  addNetworkToColleague,
  deleteNetworkFromColleague,
  // partner
  getNetworksByPartnerId,
  addNetworkToPartner,
  deleteNetworkFromPartner,
  // notification
  handleHook,
  // user
  getProfile,
} from '../controllers';

import { cmsAuth } from '../middlewares/cms-auth';

// controllers
const healthCheck = express.Router();
const api = express.Router();

healthCheck.get('/_status', (_: Request, res: Response) => res.sendStatus(200));

api.get('/colleague-networks/:colleagueId', getNetworksByColleagueId);
api.post('/colleague-networks', addNetworkToColleague);
api.delete('/colleague-networks', deleteNetworkFromColleague);

api.get('/partner-networks/:partnerId', getNetworksByPartnerId);
api.post('/partner-networks', addNetworkToPartner);
api.delete('/partner-networks', deleteNetworkFromPartner);

api.post('/notifications', cmsAuth, handleHook);

api.get('/users/profile', getProfile);

export { healthCheck, api };
