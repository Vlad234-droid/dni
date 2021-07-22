import { Handler, Request, Response } from 'express';
import { getColleagueUuid } from '@dni-connectors/onelogin';

import { findNotifications, findNetworkNotifications, createColleagueNotificationRelation } from '../services';

import { executeSafe } from '../utils';

export const getNotifications: Handler = async (_: Request, res: Response) => {
  executeSafe(res, async () => {
    const colleagueUUID = getColleagueUuid(res);
    const notifications = await findNotifications(colleagueUUID!);
    res.status(200).json(notifications);
  });
};

export const getNetworkNotifications: Handler = async (_: Request, res: Response) => {
  executeSafe(res, async () => {
    const colleagueUUID = getColleagueUuid(res);
    const networkNotifications = await findNetworkNotifications(colleagueUUID!);
    res.status(200).json(networkNotifications);
  });
};

export const acknowledgeNotification: Handler = async (req: Request, res: Response) => {
  const { entityId, entityType } = req.body;
  executeSafe(res, async () => {
    const colleagueUUID = getColleagueUuid(res);
    const colleagueNotificationRelation = await createColleagueNotificationRelation(
      entityId,
      entityType,
      colleagueUUID!,
    );
    res.status(200).json(colleagueNotificationRelation);
  });
};
