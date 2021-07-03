import {
  getManager,
  getRepository,
  Notification,
  CcmsNotification,
  DniUserNotificationAcknowledge,
  CcmsTriggerEventEnum,
  DniEntityTypeEnum,
  getSchemaPrefix,
} from '@dni/database';
import {
  Network,
  Event,
  Post,
  cmsPostsApiConnector,
  cmsEventsApiConnector,
  cmsNetworksApiConnector,
  TENANT_KEY as tenantkey,
} from '@dni-connectors/colleague-cms-api';
import { prepareContext, RequestCtx } from './context';
import { Request, Response } from 'express';

type CepPayload = {
  id: string;
  model: DniEntityTypeEnum;
  trigger: CcmsTriggerEventEnum;
  created_at: string;
  updated_at: string;
};

const handleCepRequest = async (req: Request<{}, CepPayload>, res: Response) => {
  const payload = req.body;
  const ctx = await prepareContext(req, res);

  // 1. try to get cms entity from Colleague CMS
  const cmsEntity: Post | Event | Network = (await analyzeEntity(payload, ctx)).data;

  // 2. create notification
  const notification = new CcmsNotification();
  notification.notificationTriggerEvent = payload.trigger;
  notification.entityId = payload.id;
  notification.entityType = payload.model;
  notification.entityCreatedAt = new Date(cmsEntity.published_at); // entity don't have the field created_at
  notification.entityUpdatedAt = new Date(cmsEntity.published_at);
  notification.entityInstance = cmsEntity;

  // 3. try to store notification into the db
  getRepository(CcmsNotification).save(notification);
};

const analyzeEntity = async (payload: CepPayload, ctx: RequestCtx) => {
  const { id, model } = payload;

  const reqPayload = { params: { id }, tenantkey };

  switch (model) {
    case DniEntityTypeEnum.POST: {
      const connector = cmsPostsApiConnector(ctx);
      return await connector.getPost(reqPayload);
    }
    case DniEntityTypeEnum.EVENT: {
      const connector = cmsEventsApiConnector(ctx);
      return await connector.getEvent(reqPayload);
    }
    case DniEntityTypeEnum.NETWORK: {
      const connector = cmsNetworksApiConnector(ctx);
      return await connector.getNetwork(reqPayload);
    }
  }
};

const findNotifications = async () => {
  const schemaPrefix = getSchemaPrefix();
  return await getManager().connection.query(
    `SELECT
        *
      FROM ${schemaPrefix}fn_get_ccms_entity_root_ancestor()`,
  );
};

const findNetworkNotifications = (colleagueUUID: string) => {
  return getRepository(Notification).find({
    order: {
      createdAt: 'DESC',
    },
  });
};

const createColleagueNotificationRelation = async (notificationUUID: string, colleagueUUID: string) => {
  const notification = await getRepository(CcmsNotification).findOne({ notificationUUID });
  await getRepository(DniUserNotificationAcknowledge).save({
    colleagueUUID,
    acknowledgeEntityType: notification?.entityType,
    acknowledgeEntityId: notification?.entityId,
  });
  return notification;
};

export type { CepPayload };

export { handleCepRequest, findNotifications, findNetworkNotifications, createColleagueNotificationRelation };
