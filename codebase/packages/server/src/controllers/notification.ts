import { Handler, Request, Response } from 'express';
import { getColleagueUuid } from '@dni-connectors/onelogin';
import { DniEntityTypeEnum } from '@dni/database';

import { colleagueNotificationsList, colleagueNotificationsGroupBy, createColleagueNotificationAcknowledgement } from '../services';

import { executeSafe } from '../utils';

export const getNotificationsList: Handler = async (_: Request, res: Response) => {
  executeSafe(res, async () => {
    const colleagueUUID = getColleagueUuid(res);
    const notifications = await colleagueNotificationsList(colleagueUUID!);
    res.status(200).json(notifications);
  });
};

export const getNetworkNotificationsGroupBy: Handler = async (req: Request, res: Response) => {
  const { entity_type } = req.query;

  executeSafe(res, async () => {
    const colleagueUUID = getColleagueUuid(res);
    const networkNotifications = await colleagueNotificationsGroupBy(colleagueUUID!, entity_type as Array<DniEntityTypeEnum>);
    res.status(200).json(networkNotifications);
  });
};

export const acknowledgeNotification: Handler = async (req: Request, res: Response) => {
  const { entityId, entityType } = req.body;
  executeSafe(res, async () => {
    const colleagueUUID = getColleagueUuid(res);
    const colleagueNotificationRelation = await createColleagueNotificationAcknowledgement(
      entityId,
      entityType,
      colleagueUUID!,
    );
    res.status(200).json(colleagueNotificationRelation);
  });
};
