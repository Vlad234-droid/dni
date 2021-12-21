import { getManager } from '@dni/database';
import { CcmsEntity, CcmsNotification, DniEntityTypeEnum, CcmsTriggerEventEnum } from '@dni/database';

import {
  Network,
  Event,
  Post,
  cmsPostsApiConnector,
  cmsEventsApiConnector,
  cmsNetworksApiConnector,
  DniCmsApiContext,
  ApiInput,
  PostApiParams,
  EventApiParams,
  NetworkApiParams,
} from '@dni-connectors/colleague-cms-api';

import { FetchError } from '@energon/fetch-client';

import { expressContext } from '../context';
import { Request, Response } from 'express';
import { CepPayload } from '../controllers';
import { massMailing, prepareMailingData } from '../services/mailer';
import { getConfig } from '../config/config-accessor';


export const handleCepRequest = async (req: Request<{}, CepPayload>, res: Response) => {
  const payload = req.body;
  const entityManager = getManager();

  // 1. create notification entity instance
  const notification = new CcmsNotification();

  notification.notificationTriggerEvent = payload.trigger;
  notification.entityId = payload.id;
  notification.entityType = payload.model;
  notification.entityCreatedAt = payload.created_at; // use payload vlaue, since entity doesn't have field created_at
  notification.entityUpdatedAt = payload.updated_at; // use payload vlaue, since entity doesn't have field updated_at

  // 2. try to get CMS entity from Colleague CMS
  let entityInstance: Post | Event | Network | undefined = undefined;
  if (CcmsTriggerEventEnum.DELETED != notification.notificationTriggerEvent) {
    const ctx = expressContext(getConfig())(req, res);
    entityInstance = (await acquireEntityFromCms(payload, ctx));

    if (entityInstance === undefined) {
      notification.notificationTriggerEvent = CcmsTriggerEventEnum.DELETED;
    }
  }

  // 3. store notification into the db
  await entityManager.getRepository(CcmsNotification)
    .save(notification, { data: { entityInstance: entityInstance } });

  // 4. get CMS entity from DB repo
  const cmsEntity = await entityManager.getRepository(CcmsEntity)
    .preload({ entityId: notification.entityId, entityType: notification.entityType });
    
  const isMailingAlreadyDone = cmsEntity
    && cmsEntity.entityMetadata!! 
    && Object.prototype.hasOwnProperty.call(cmsEntity.entityMetadata, 'mailing_at');

  // 5. send letters to recipients, if required
  if (!isMailingAlreadyDone && entityInstance && entityInstance.published_at?.length > 0) {
    if ([DniEntityTypeEnum.POST, DniEntityTypeEnum.EVENT].includes(payload.model)) {
      const [colleagueUUIDs, placeholders] = await prepareMailingData(payload.model, payload.id);

      massMailing(colleagueUUIDs, placeholders);

      if (cmsEntity) {
        cmsEntity.entityMetadata = { ...cmsEntity.entityMetadata, mailing_at: new Date() };
        await entityManager.getRepository(CcmsEntity)
          .save(cmsEntity);
      }
    }
  }
};

/**
 * 
 * @param cepPayload 
 * @param ctx 
 * @returns 
 */
const acquireEntityFromCms = async (cepPayload: CepPayload, ctx: DniCmsApiContext) => {

  const { id, model } = cepPayload;

  // prepare payload
  const cmsPayload: ApiInput<PostApiParams | EventApiParams | NetworkApiParams> = {
    params: {
      id,
      _publicationState: 'preview',
    },
  };

  let cmsResponse = undefined;

  try {
    switch (model) {
      case DniEntityTypeEnum.POST: {
        const connector = cmsPostsApiConnector(ctx);
        cmsResponse = await connector.getPost(cmsPayload);
        return cmsResponse?.data;
      }
      case DniEntityTypeEnum.EVENT: {
        const connector = cmsEventsApiConnector(ctx);
        cmsResponse = await connector.getEvent(cmsPayload);
        return cmsResponse?.data;
      }
      case DniEntityTypeEnum.NETWORK: {
        const connector = cmsNetworksApiConnector(ctx);
        cmsResponse = await connector.getNetwork(cmsPayload);
        return cmsResponse?.data;
      }
      default:
        return undefined;
    }
  } catch (e) {
    if (FetchError.is(e) && e.status === 404) {
      return undefined;
    } else {
      throw e;
    }
  }
}