import express, { Request, Response } from 'express';

import {
  // employee
  getProfile,
  // employee-networks
  addNetworkToEmployee,
  deleteNetworkFromEmployee,
  // employee-events
  addEventToEmployee,
  deleteEventFromEmployee,
  // notification
  handleCepHook,
  getNotifications,
  getNetworkNotifications,
  acknowledgeNotification,
  // networks
  getNetworksParticipants,
  // events
  getEventsParticipants,
  // report
  getMembersReportByFilters,
  getRegionsReportByFilters,
  getDepartmentsReportByFilters,
  printPDF,
  // utils
  getEnvironmentVariablesMiddleware,
  getTypeOrmConnectionOptionsMiddleware,
} from '../controllers';

// controllers
const healthCheck = express.Router();
const api = express.Router();

healthCheck.get('/_status', (_: Request, res: Response) => res.sendStatus(200));

api.get('/employees/profile', getProfile);

api.post('/employees/networks', addNetworkToEmployee);
api.delete('/employees/networks/:networkId', deleteNetworkFromEmployee);

api.post('/employees/events', addEventToEmployee);
api.delete('/employees/events/:eventId', deleteEventFromEmployee);

api.get('/events/participants', getEventsParticipants);
api.get('/networks/participants', getNetworksParticipants);

api.get('/reports/members', getMembersReportByFilters);
api.get('/reports/regions', getRegionsReportByFilters);
api.get('/reports/departments', getDepartmentsReportByFilters);
api.post('/reports/print-pdf', printPDF);

api.get('/utils/env', getEnvironmentVariablesMiddleware);
api.get('/utils/type-orm-options', getTypeOrmConnectionOptionsMiddleware);

api.post('/cms-events', handleCepHook);
api.get('/notifications', getNotifications);
api.get('/notifications/networks', getNetworkNotifications);
api.post('/notifications/acknowledge', acknowledgeNotification);

export { healthCheck, api };
