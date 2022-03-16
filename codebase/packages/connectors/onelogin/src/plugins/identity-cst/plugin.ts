import { Response, Request, NextFunction, Handler } from 'express';

import { ApiEnv, resolveBaseUrl, TESCO_API_URLS } from '@energon-connectors/core';

import { identityApiConsumer, ClientTokenResponse, ClientTokenIssueBody } from '@dni-connectors/identity-api';
import { getIdentityClientScopeToken, setIdentityClientScopeToken } from './identity-cst-data';
import { getMaxAge } from '../utils';
import { Optional, Plugin } from '../plugin';

type Config = {
  /**
   * identity client id
   */
  identityClientId: string;
  
  /**
   * identity secret in
   */
  identityClientSecret: string;
 
  /**
   * optional, if it returns false, code in the plugin won't be executed
   * E.g. check if another cookie exists
   * defaults to ()=>true
   */
  shouldRun?: (request: Request, response: Response) => boolean;

  /**
   * Tesco API environment descriptor
   */
  apiEnv: () => ApiEnv;

  /**
   * optional, if true, token will be cashed on server and shared between sessions
   * defaults to true
   */
  cache?: boolean;
};

/**
 * A plugin middleware to be used in onelogin.
 * It issues identity Client Scoped Token.
 */
export const identityClientScopedTokenPlugin = (config: Config & Optional): Plugin => {
  const plugin: Plugin = async (req: Request, res: Response) => {
    // init plugin config
    const {
      identityClientId,
      identityClientSecret,
      shouldRun = () => true,
      apiEnv,
      cache = true,
    } = config;

    if (!!getIdentityClientScopeToken(res) || !shouldRun(req, res)) {
      return;
    }

    if (cache) {
      const cachedToken = getCachedClientScopeToken();
      if (cachedToken !== null) {
        setIdentityClientScopeToken(res, cachedToken);
        return;
      }
    }

    const baseUrl = resolveBaseUrl(TESCO_API_URLS, { apiEnv });

    const credentials = Buffer.from(`${identityClientId}:${identityClientSecret}`).toString('base64');
    const baseHeaders = {
      Authorization: () => `Basic ${credentials}`,
      Accept: () => 'application/vnd.tesco.identity.tokenresponse.v4claims+json',
    };

    const api = identityApiConsumer({
      baseUrl, 
      baseHeaders, 
    });

    const body: ClientTokenIssueBody = { grant_type: 'client_credentials' };
    const data = await api.issueToken({ body });

    setIdentityClientScopeToken(res, data);

    if (cache) {
      setCachedClientScopeToken(data, getMaxAge(data.claims));
    }
  };

  plugin.info = 'Identity Client Scoped Token plugin';
  plugin.optional = config.optional || false;

  return plugin;
};

const [getCachedClientScopeToken, setCachedClientScopeToken] = ((): [
  () => ClientTokenResponse | null,
  (newToken: ClientTokenResponse, age: number) => void,
] => {
  let cashedClientScopeToken: ClientTokenResponse | null = null;

  return [
    () => cashedClientScopeToken,
    (newCST, maxAge) => {
      cashedClientScopeToken = newCST;
      setTimeout(() => {
        cashedClientScopeToken = null;
      }, maxAge);
    },
  ];
})();
