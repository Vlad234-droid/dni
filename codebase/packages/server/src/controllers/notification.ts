import { Request, Response } from 'express';
import {
  findNotifications,
  findNetworkNotifications,
  createColleagueNotificationRelation,
  colleagueUUIDExtractor,
} from '../services';
import { executeSafe } from '../utils';

export const getNotifications: Middleware = async (req, res) => {
  return executeSafe(res, async () => {
    const colleagueUUID = await colleagueUUIDExtractor(req, res);
    return res.status(200).json(await findNotifications(colleagueUUID!));
  });
};

export const getNetworkNotifications: Middleware = async (req, res) => {
  return executeSafe(res, async () => {
    const colleagueUUID = await colleagueUUIDExtractor(req, res);
    return res.status(200).json(await findNetworkNotifications(colleagueUUID!));
  });
};

export const acknowledgeNotification: Middleware = async (req, res) => {
  return executeSafe(res, async () => {
    const { entityId, entityType } = req.body;
    const colleagueUUID = await colleagueUUIDExtractor(req, res);
    return res.status(200).json(await createColleagueNotificationRelation(entityId, entityType, colleagueUUID!));
  });
};
