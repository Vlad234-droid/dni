import { Request, Response } from 'express';
import { identityApiConnector, buildBody } from '@dni-connectors/identity-api';
import { setIdentityClientData, ClientScopeToken } from '@dni-connectors/onelogin';

import { buildContext, RequestCtx } from '../context';
import { getInstance as getCacheInstance } from '../services/cache';
import { getConfig, ProcessConfig } from '../config/config-accessor';

const config = getConfig();
const context = buildContext(config);

const prepareContext = async (req = {} as Request, res = {} as Response) => {
  const requestCtx = context(req, res);
  await enrichResWithToken(res, requestCtx, config);

  return requestCtx;
};

const enrichResWithToken = async (
  res = {} as Response,
  requestCtx: RequestCtx,
  { identityClientId, identityClientSecret }: ProcessConfig,
) => {
  const cacheKey = config.cacheIdentityTokenKey();
  let tokenData: ClientScopeToken;

  const cache = getCacheInstance();
  if (cache.has(cacheKey)) {
    tokenData = cache.get(cacheKey)!;
  } else {
    const body = buildBody(identityClientId(), identityClientSecret());
    const connector = identityApiConnector(requestCtx);
    const response = await connector.getToken({ body });
    tokenData = response.data;
    cache.set(cacheKey, tokenData, tokenData.expires_in || 1800);
  }

  setIdentityClientData(res, tokenData);
};

export type { RequestCtx };

export { prepareContext, enrichResWithToken };
