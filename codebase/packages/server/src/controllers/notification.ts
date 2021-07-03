import { Request, Response } from 'express';
import {
  handleCepRequest,
  findNotifications,
  findNetworkNotifications,
  createColleagueNotificationRelation,
  CepPayload,
  colleagueUUIDExtractor,
} from '../services';
import { executeSafe } from '../utils';

export const handleCepHook = async (req: Request<{}, CepPayload>, res: Response) => {
  try {
    const payload: string = JSON.stringify(req.body, null, 2);
    console.log('handleCepHook:\n%s', payload);
    await handleCepRequest(req, res);
    return res.status(200).json('ok');
  } catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server error');
  }
};

export const getNotifications: Middleware = async (req, res) => {
  return executeSafe(res, async () => {
    return res.status(200).json(await findNotifications());
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
    const { notifUUID: notificationUUID } = req.params;
    const colleagueUUID = await colleagueUUIDExtractor(req, res);
    return res.status(200).json(await createColleagueNotificationRelation(notificationUUID, colleagueUUID!));
  });
};
