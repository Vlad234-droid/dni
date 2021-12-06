import { Response, Request } from 'express';
import { markApiCall } from '@energon/splunk-logger';
import { ApiEnv, resolveBaseUrl, TESCO_API_URLS } from '@energon-connectors/core';

import {
  setDataToCookie,
  getDataFromCookie,
  PluginCookieConfig,
  getIdentitySwapToken,
  clearCookie,
  getMaxAge,
  clearPluginCookiesIfSessionExpired,
} from '../utils';

import { getIdentityApi, UserScopeToken } from '../api';
import { setIdentityData, getIdentityData, setColleagueUuid } from './identity-data';
import { getOpenIdSessionId } from '../../oidc-data-extractor';
import { Optional, Plugin } from '../plugin';

export type Strategy = 'oidc' | 'saml';

export type Config<O> = {
  /**
   * identity client id
   */
  identityClientId: string;
  
  /**
   * identity secret in
   */
  identityClientSecret: string;
 
  /**
   * onelogin strategy: oidc or saml
   */
  strategy: Strategy;

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
   * Endpoint path
   * E.v. /identity/v4/token-swap
   */
  path?: string;

  /**
   * optional, cookie configuration object
   * if not present, data won't be saved in the cookie
   * if maxAge is not present, expiration claims will be used instead
   */
  cookieConfig?: PluginCookieConfig & {
    /**
     * optional, method that will determine the shape of the data saved in the cookie
     */
    cookieShapeResolver?: (data: UserScopeToken) => O;
  };
};

const refreshCookieName = (cookieName: string) => `${cookieName}-refresh`;

/**
 * A plugin middleware to be used in onelogin.
 * It swaps the oidc or saml token for the identity access token.
 */
export const identityTokenSwapPlugin = <O>(config: Config<O> & Optional): Plugin => {
  const plugin: Plugin = async (req: Request, res: Response) => {
    // init plugin config
    const {
      identityClientId,
      identityClientSecret,
      strategy,
      shouldRun = () => true,
      apiEnv,
      path = '/identity/v4/issue-token/token',
      cookieConfig,
    } = config;

    const baseUrl = resolveBaseUrl(TESCO_API_URLS, { apiEnv });
    
    try {
      if (!!getIdentityData(res) || !shouldRun(req, res)) {
         return;
      }

      if (cookieConfig) {
        clearPluginCookiesIfSessionExpired(
          req, res, cookieConfig,
          [{ ...cookieConfig, cookieName: refreshCookieName(cookieConfig.cookieName) }],
        );

        const { secret, cookieName, compressed } = cookieConfig;
        const data = getDataFromCookie<UserScopeToken>(req, {
          cookieName,
          secret,
          compressed,
        });

        if (data && data.claims.sub) {
          setIdentityData(res, data);
          setColleagueUuid(res, data.claims.sub);
          return;
        }
      }

      const refreshToken = cookieConfig
        ? getDataFromCookie<{ refreshToken: string }>(req, {
            cookieName: refreshCookieName(cookieConfig.cookieName),
            secret: cookieConfig.secret,
            compressed: cookieConfig.compressed,
          })?.refreshToken
        : undefined;

      const credentials = Buffer.from(`${identityClientId}:${identityClientSecret}`).toString('base64');

      const headerProvider = {
        Authorization: () => `Basic ${credentials}`,
        Accept: () => 'application/vnd.tesco.identity.tokenresponse.v4claims+json',
      };

      const api = getIdentityApi(headerProvider, baseUrl, path, markApiCall(res));

      const { data } = await (refreshToken
        ? api.refreshUserToken({
            body: { grant_type: 'refresh_token', refresh_token: refreshToken },
          })
        : api.exchangeUserToken({
            body: {
              grant_type: 'token_exchange',
              trusted_token: getIdentitySwapToken(res, strategy),
              identity_provider: 'onelogin',
              token_type: strategy,
              scope: 'internal public',
            },
          }));

      // Identity API subject, aka colleagueUUID;
      const sub = data.claims.sub;

      if (cookieConfig) {
        const { cookieShapeResolver = (data: any) => data } = cookieConfig;

        // OneLogin unique identifier of session of end user
        const sid = getOpenIdSessionId(res);
        const payload = { ...cookieShapeResolver(data), sid };

        const identityTokenMaxAge = getMaxAge(data.claims);
        const identityAccessTokenCookie = {
          ...cookieConfig,
          maxAge: identityTokenMaxAge,
        };

        const refreshTokenMaxAge = identityTokenMaxAge + data.expires_in * 1000; // 59 mins
        const identityRefreshTokenCookie = {
          ...cookieConfig,
          cookieName: refreshCookieName(cookieConfig.cookieName),
          maxAge: refreshTokenMaxAge,
        };

        // set access token cookie
        setDataToCookie(res, payload, identityAccessTokenCookie);
        // set refresh token cookie
        setDataToCookie(res, { refreshToken: data.refresh_token }, identityRefreshTokenCookie);

        setIdentityData(res, payload);
        setColleagueUuid(res, sub);
      } else {
        setIdentityData(res, data);
        setColleagueUuid(res, sub);
      }
    } catch (e) {
      if (cookieConfig) {
        clearCookie(res, cookieConfig);
        clearCookie(res, {
          ...cookieConfig,
          cookieName: refreshCookieName(cookieConfig.cookieName),
        });
      }
      throw e;
    }
  };

  plugin.info = 'Identity Swap User Token plugin';
  plugin.optional = config.optional || false;

  return plugin;
};
