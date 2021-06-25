import {
  handleData,
  findNotifications,
  findNetworkNotifications,
  createColleagueRelation,
} from '../services/notification';
import { executeSafe } from '../utils';

export const handleHook: Middleware = async (req, res) => {
  try {
    console.log('handleHook:\n%s', JSON.stringify(req.body, null, 2));
    await handleData(req.body);
    return res.status(200).json('ok');
  } catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server error');
  }
};

export const handleCepHook: Middleware = async (req, res) => {
  try {
    const payload: string = JSON.stringify(req.body, null, 2);
    console.log('handleCepHook:\n%s', payload);
    return res.status(200).json('ok');
  } catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server error');
  }
};

export const getNotifications: Middleware = async (req, res) => {
  return executeSafe(res, async () => {
    // TODO: fetch user from req
    const colleagueUUID = '01bc05c5-b825-4fac-813b-b362714ad6da';
    return res.status(200).json(await findNotifications(colleagueUUID));
  });
};

export const getNetworkNotifications: Middleware = async (req, res) => {
  return executeSafe(res, async () => {
    // TODO: fetch user from req
    const colleagueUUID = '01bc05c5-b825-4fac-813b-b362714ad6da';
    return res.status(200).json(await findNetworkNotifications(colleagueUUID));
  });
};

export const viewNotification: Middleware = async (req, res) => {
  return executeSafe(res, async () => {
    const { notificationId } = req.body;
    // TODO: fetch user from req
    const colleagueUUID = '01bc05c5-b825-4fac-813b-b362714ad6da';
    return res.status(200).json(await createColleagueRelation(notificationId, colleagueUUID));
  });
};
