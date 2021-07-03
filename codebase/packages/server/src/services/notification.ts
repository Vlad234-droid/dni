import {
  getManager,
  getRepository,
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

  // 3. store notification into the db
  getManager().getRepository(CcmsNotification).save(notification, { data: { entityInstance : cmsEntity } });
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

const findNotifications = (colleagueUUID: string) => {
  const schemaPrefix = getSchemaPrefix();
  return getManager().connection.query(
    `SELECT
      colleague_uuid, 
      entity_id,
      entity_type,
      root_ancestor_id,
      root_ancestor_type
    FROM ${schemaPrefix}fn_get_dni_user_notification_list(
      $1::uuid,
      ARRAY['event'::${schemaPrefix}dni_entity_type_enum, 'post'::${schemaPrefix}dni_entity_type_enum]::${schemaPrefix}dni_entity_type_enum[],
      ARRAY['network'::${schemaPrefix}dni_entity_type_enum, 'event'::${schemaPrefix}dni_entity_type_enum]::${schemaPrefix}dni_entity_type_enum[],
      TRUE::boolean
    )`,
    [colleagueUUID],
  );
};

const findNetworkNotifications = (colleagueUUID: string) => {
  const schemaPrefix = getSchemaPrefix();
  return getManager().connection.query(
    `SELECT
      colleague_uuid uuid, 
      entity_type,
      root_ancestor_id, 
      root_ancestor_type, 
      count(*) as entity_count
    FROM ${schemaPrefix}fn_get_dni_user_notification_list(
      $1::uuid,
      ARRAY['post'::${schemaPrefix}dni_entity_type_enum]::${schemaPrefix}dni_entity_type_enum[],
      ARRAY['network'::${schemaPrefix}dni_entity_type_enum]::${schemaPrefix}dni_entity_type_enum[],
      TRUE::boolean
    )
    GROUP BY
      colleague_uuid, 
      root_ancestor_id, 
      root_ancestor_type, 
      entity_type`,
    [colleagueUUID],
  );
};

const createColleagueNotificationRelation = async (
  entityId: number,
  entityType: DniEntityTypeEnum,
  colleagueUUID: string,
) => {
  return await getRepository(DniUserNotificationAcknowledge).save({
    colleagueUUID,
    acknowledgeEntityType: entityType,
    acknowledgeEntityId: entityId,
  });
};

export type { CepPayload };

export { handleCepRequest, findNotifications, findNetworkNotifications, createColleagueNotificationRelation };
