import { Request, Response } from 'express';
import { identityApiConnector, buildBody } from '@dni-connectors/identity-api';
import { setIdentityClientData, ClientScopeToken } from '@energon/onelogin';
import { getConfig, ProcessConfig } from './config-accessor';
import { buildContext, RequestCtx } from '../context';
import { getInstance as getCacheInstance } from '../services/cache';

const config = getConfig();
const context = buildContext(config);
const DEFAULT_CACHE_CLIENT_SCOPE_TOKEN_KEY = 'identityClientToken';

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
  const cacheKey = process.env.CACHE_CLIENT_SCOPE_TOKEN_KEY || DEFAULT_CACHE_CLIENT_SCOPE_TOKEN_KEY;
  let tokenData: ClientScopeToken;

  const cache = getCacheInstance();
  if (cache.has(cacheKey)) {
    tokenData = cache.get(cacheKey)!;
  } else {
    const body = buildBody(identityClientId, identityClientSecret);
    const connector = identityApiConnector(requestCtx);
    const response = await connector.getToken({ body });
    tokenData = response.data;
    cache.set(cacheKey, tokenData, process.env.CACHE_CLIENT_SCOPE_TOKEN_TTL || 120);
  }

  setIdentityClientData(res, tokenData);
};

export { prepareContext, enrichResWithToken };
