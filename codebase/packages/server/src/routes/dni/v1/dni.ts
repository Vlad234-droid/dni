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
  // employee contact
  refreshSetting,
  getSetting,
  getPersonalEmail,
  addPersonalEmail,
  refreshPersonalEmail,
  // ccrm-events
  consumeCepEvent,
  // notification
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
} from '../../../controllers';

const dniApi = express.Router();

dniApi.get('/employees/profile', getProfile);

dniApi.post('/employees/networks', addNetworkToEmployee);
dniApi.delete('/employees/networks/:networkId', deleteNetworkFromEmployee);

dniApi.post('/employees/events', addEventToEmployee);
dniApi.delete('/employees/events/:eventId', deleteEventFromEmployee);

dniApi.get('/employees/email-notifications-settings', getSetting);
dniApi.post('/employees/email-notifications-settings', refreshSetting);

dniApi.get('/employees/personal-email', getPersonalEmail);
dniApi.post('/employees/personal-email', addPersonalEmail);
dniApi.put('/employees/personal-email/:addressId', refreshPersonalEmail);

dniApi.get('/events/participants', getEventsParticipants);
dniApi.get('/networks/participants', getNetworksParticipants);

dniApi.get('/reports/members', getMembersReportByFilters);
dniApi.get('/reports/regions', getRegionsReportByFilters);
dniApi.get('/reports/departments', getDepartmentsReportByFilters);
dniApi.post('/reports/print-pdf', printPDF);

dniApi.get('/notifications', getNotifications);
dniApi.get('/notifications/networks', getNetworkNotifications);
dniApi.post('/notifications/acknowledge', acknowledgeNotification);

export { dniApi };
