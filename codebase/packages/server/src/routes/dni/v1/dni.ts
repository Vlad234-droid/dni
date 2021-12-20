import express from 'express';

import { roleAuth } from '../../../middlewares/role-auth-handler';

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
  shareStory,
  sendPersonalEmailConfirmation,
  refreshPersonalEmailByToken,
  // notification
  getNotificationsList,
  getNetworkNotificationsGroupBy,
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

const ROLE_ADMIN = 'Admin';
const ROLE_MANAGER = 'Manager';

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
dniApi.post('/employees/personal-email/:token', refreshPersonalEmailByToken);
dniApi.post('/employees/confirm-personal-email', sendPersonalEmailConfirmation);
dniApi.post('/employees/share-story', shareStory);

dniApi.get('/events/participants', getEventsParticipants);
dniApi.get('/networks/participants', getNetworksParticipants);

dniApi.get('/notifications/list', getNotificationsList);
dniApi.get('/notifications/groupby', getNetworkNotificationsGroupBy);
dniApi.post('/notifications/acknowledge', acknowledgeNotification);

// pls. note: roleAuth middleware is applied
dniApi.get('/reports/members', roleAuth([ROLE_ADMIN, ROLE_MANAGER]), getMembersReportByFilters);
dniApi.get('/reports/regions', roleAuth([ROLE_ADMIN, ROLE_MANAGER]), getRegionsReportByFilters);
dniApi.get('/reports/departments', roleAuth([ROLE_ADMIN, ROLE_MANAGER]), getDepartmentsReportByFilters);
dniApi.post('/reports/print-pdf', roleAuth([ROLE_ADMIN, ROLE_MANAGER]), printPDF);

export { dniApi };
