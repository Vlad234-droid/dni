import { Response, Request, NextFunction, Handler } from 'express';
import { markApiCall } from '@energon/splunk-logger';
import { ClientScopeToken, ClientTokenIssueBody, getIdentityApi } from '../api';
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
  identityyClientSecret: string;
 
  /**
   * optional, if it returns false, code in the plugin won't be executed
   * E.g. check if another cookie exists
   * defaults to ()=>true
   */
  shouldRun?: (request: Request, response: Response) => boolean;

  /**
   * API base url
   * E.g.https://api-ppe.tesco.com
   */
  baseUrl?: string;

  /**
   * Endpoint path
   * E.v. /identity/v4/issue-token/token
   */
  path?: string;

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
  const plugin: Plugin = async (req: Request, res: Response, next: NextFunction) => {
    // init plugin config
    const {
      identityClientId,
      identityyClientSecret,
      shouldRun = () => true,
      baseUrl = process.env.NODE_CONFIG_ENV === 'prod' ? 'https://api.tesco.com' : 'https://api-ppe.tesco.com',
      path = '/identity/v4/issue-token/token',
      cache = true,
    } = config;

    if (!!getIdentityClientScopeToken(res) || !shouldRun(req, res)) return next();

    if (cache) {
      const cachedToken = getCachedClientScopeToken();
      if (cachedToken !== null) {
        setIdentityClientScopeToken(res, cachedToken);
        return next();
      }
    }

    const credentials = Buffer.from(`${identityClientId}:${identityyClientSecret}`).toString('base64');
    const body: ClientTokenIssueBody = { grant_type: 'client_credentials' };
    const headerProvider = {
      Authorization: () => `Basic ${credentials}`,
      Accept: () => 'application/vnd.tesco.identity.tokenresponse.v4claims+json',
    };

    const api = getIdentityApi(headerProvider, baseUrl, path, markApiCall(res));
    const { data } = await api.issueToken({ body });

    setIdentityClientScopeToken(res, data);

    if (cache) {
      setCachedClientScopeToken(data, getMaxAge(data.claims));
    }

    return next();
  };

  plugin.info = 'Identity Client Scoped Token plugin';
  plugin.optional = config.optional || false;

  return plugin;
};

const [getCachedClientScopeToken, setCachedClientScopeToken] = ((): [
  () => ClientScopeToken | null,
  (newToken: ClientScopeToken, age: number) => void,
] => {
  let cashedClientScopeToken: ClientScopeToken | null = null;

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
