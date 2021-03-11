import express, {Request, Response} from 'express';
import {
    getNetworksByColleagueId,
    addNetworkToColleague,
    deleteNetworkFromColleague
} from '../controllers/colleague.controller';
import {
    getNetworksByPartnerId,
    addNetworkToPartner,
    deleteNetworkFromPartner
} from '../controllers/partner.controller';


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

export {healthCheck, api};
