import { getManager, CcmsNotification, DniEntityTypeEnum, CcmsTriggerEventEnum } from '@dni/database';

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

import { expressContext } from '../context';
import { Request, Response } from 'express';
import { CepPayload } from '../controllers';
import { massMailing, prepareMailingData } from '../services/mailer';
import { getConfig } from '../config/config-accessor';

export const handleCepRequest = async (req: Request<{}, CepPayload>, res: Response) => {
  const payload = req.body;

  // 1. create notification entity instance
  const notification = new CcmsNotification();

  notification.notificationTriggerEvent = payload.trigger;
  notification.entityId = payload.id;
  notification.entityType = payload.model;
  notification.entityCreatedAt = payload.created_at; // use payload vlaue, since entity doesn't have field created_at
  notification.entityUpdatedAt = payload.updated_at; // use payload vlaue, since entity doesn't have field updated_at

  // 2. try to get cms entity from Colleague CMS
  let cmsEntity: Post | Event | Network | undefined;
  if (CcmsTriggerEventEnum.DELETED != payload.trigger) {
    const ctx = expressContext(getConfig())(req, res);
    cmsEntity = (await analyzeEntity(payload, ctx))?.data;
  }

  // 3. store notification into the db
  await getManager()
    .getRepository(CcmsNotification)
    .save(notification, { data: { entityInstance: cmsEntity } });

  // 4. send letters to recipients
  if ([DniEntityTypeEnum.POST, DniEntityTypeEnum.EVENT].includes(payload.model)) {
    const [colleagueUUIDs, placeholders] = await prepareMailingData(payload.model, payload.id);

    massMailing(colleagueUUIDs, placeholders);
  }
};

const analyzeEntity = async (payload: CepPayload, ctx: DniCmsApiContext) => {
  const { id, model } = payload;

  // prepare payload
  const reqPayload: ApiInput<PostApiParams | EventApiParams | NetworkApiParams> = {
    params: {
      id,
      _publicationState: 'preview',
    },
  };

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
    default:
      return undefined;
  }
};
