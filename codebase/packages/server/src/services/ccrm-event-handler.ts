import { getManager, CcmsNotification, DniEntityTypeEnum, CcmsTriggerEventEnum } from '@dni/database';

import {
  Network,
  Event,
  Post,
  cmsPostsApiConnector,
  cmsEventsApiConnector,
  cmsNetworksApiConnector,
} from '@dni-connectors/colleague-cms-api';

import { prepareContext, RequestCtx } from './context';
import { Request, Response } from 'express';
import { CepPayload } from '../controllers';
import { massMailing } from '../services/mailer';

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
    const ctx = await prepareContext(req, res);
    cmsEntity = (await analyzeEntity(payload, ctx))?.data;
  }

  // 3. store notification into the db
  await getManager()
    .getRepository(CcmsNotification)
    .save(notification, { data: { entityInstance: cmsEntity } });

  // 4. send letters to recipients
  // TODO: fetch data from db
  massMailing(
    [
      /* colleagueUUIDs */
    ],
    {
      /* template data */
    },
  );
};

const analyzeEntity = async (payload: CepPayload, ctx: RequestCtx) => {
  const { id, model } = payload;

  // prepare payload
  const reqPayload = {
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
  }
};
