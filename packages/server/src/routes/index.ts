import express, { Request, Response } from 'express';

import {
  // employee
  getProfile,
  // employee-networks
  getNetworksByEmployeeNumber,
  addNetworkToEmployee,
  deleteNetworkFromEmployee,
  // employee-events
  getEventsByEmployeeNumber,
  addEventToEmployee,
  deleteEventFromEmployee,
  // notification
  handleHook,
  // networks
  getNetworksParticipants,
  // events
  getEventsParticipants,
  //report
  getReportByFilters,
  printPDF,
} from '../controllers';

import { cmsAuth } from '../middlewares/cms-auth';

// controllers
const healthCheck = express.Router();
const api = express.Router();

healthCheck.get('/_status', (_: Request, res: Response) => res.sendStatus(200));

api.get('/employees/profile', getProfile);

api.get('/employees/:employeeNumber/networks', getNetworksByEmployeeNumber);
api.post('/employees/networks', addNetworkToEmployee);
api.delete('/employees/networks', deleteNetworkFromEmployee);

api.get('/employees/:employeeNumber/events', getEventsByEmployeeNumber);
api.post('/employees/events', addEventToEmployee);
api.delete('/employees/events', deleteEventFromEmployee);

api.get('/events/participants', getEventsParticipants);
api.get('/networks/participants', getNetworksParticipants);

api.post('/notifications', cmsAuth, handleHook);

api.get('/reports/time-periods', getReportByFilters);
api.post('/reports/print-pdf', printPDF);

export { healthCheck, api };
