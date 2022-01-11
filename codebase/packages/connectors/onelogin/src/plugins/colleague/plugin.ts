import { Response, Request, NextFunction } from 'express';
import NodeCache from 'node-cache';

import { ApiEnv, Headers, resolveBaseUrl, TESCO_API_URLS } from '@energon-connectors/core';
import { FetchError } from '@energon/fetch-client';
import { colleagueApiConsumer, Colleague, ColleagueAPIHeaders } from '@dni-connectors/colleague-api';

import { setColleagueData, getColleagueData } from './colleague-data';
import { getIdentityData } from '../identity-swap';

import { getDataFromCookie, setDataToCookie, PluginCookieConfig, clearPluginCookiesIfSessionExpired } from '../utils';

import { Optional, Plugin } from '../plugin';
import { getIdentityClientScopeToken } from '../identity-cst';
import { getOpenIdSessionId } from '../../oidc-data-extractor';

export type Strategy = 'oidc' | 'saml';

type Config<O> = {
  /**
   * optional, if it returns false, code in the plugin won't be executed
   * E.g. check if another cookie existss
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

  /**
   * optional, cache Time-To-Live, in seconds
   * defaults to 6hrs (6 * 60 * 60)
   */
  cacheTtl?: number;

  /**
   * optional, cookie configuration object
   * if not present, data won't be saved in the cookie
   */
  cookieConfig?: PluginCookieConfig & {
    /**
     * optional, method that will determine the shape of the data saved in the cookie
     */
    cookieShapeResolver?: (data: Colleague) => O;
  };
};

/**
 * Plugin cache instance
 */
const colleagueCache = new NodeCache();

/**
 * A plugin middleware to be used in onelogin.
 * It gets the data from the colleauge API relies on identity data in response the object.
 */
export const colleagueApiPlugin = <O>(config: Config<O> & Optional): Plugin => {
  const plugin: Plugin = async (req: Request, res: Response) => {
    const {
      shouldRun = () => true,
      apiEnv,
      cookieConfig,
      cache = true,
      cacheTtl = 6 * 60 * 60, // 6 hrs
      optional,
    } = config;

    if (getColleagueData(res) || !shouldRun(req, res)) {
      return;
    }

    const baseUrl = resolveBaseUrl(TESCO_API_URLS, { apiEnv });

    if (cookieConfig) {
      clearPluginCookiesIfSessionExpired(req, res, cookieConfig);

      const { secret, cookieName, compressed } = cookieConfig;
      const data = getDataFromCookie(req, { cookieName, secret, compressed });

      if (data) {
        setColleagueData(res, data);
        return;
      }
    }

    const identityUserScopeTokenData = getIdentityData(res);
    if (!identityUserScopeTokenData) {
      throw Error('No identity user scope token data found in response object');
    }

    // extract accessToken and colleagueUUID from identityUserScopeTokenData
    const {
      claims: { sub: colleagueUUID },
    } = identityUserScopeTokenData;

    if (!colleagueUUID) {
      throw Error('No colleagueUUID found');
    }

    if (cache) {
      const cachedColleague = colleagueCache.get(colleagueUUID);
      if (!!cachedColleague) {
        if (typeof cachedColleague === 'object') {
          if (cookieConfig) {
            setDataToCookie(res, cachedColleague!, { ...cookieConfig });
          }
  
          setColleagueData(res, cachedColleague);
        } else if (typeof cachedColleague === 'string' && cachedColleague === 'NOT_FOUND') {
          setColleagueData(res, undefined);
        }

        return;
      }
    }

    const identityClientScopeTokenData = getIdentityClientScopeToken(res);
    if (!identityClientScopeTokenData) {
      throw Error('No identity client scope token data found in response object');
    }

    // extract accessToken and colleagueUUID from identityUserScopeTokenData
    const { access_token: accessToken } = identityClientScopeTokenData;

    if (!accessToken) {
      throw Error('No identity client scope access token found');
    }

    const baseHeaders: ColleagueAPIHeaders = {
      ...Headers.identityClientScopedAuthorization({ identityClientToken: () => accessToken }),
    };

    const colleagueApi = colleagueApiConsumer({
      baseUrl: baseUrl,
      baseHeaders: baseHeaders,
    });

    try {
      // extract colleague from response
      const { data: colleague } = await colleagueApi.getColleague({ params: { colleagueUUID } });

      if (cookieConfig) {
        const { cookieShapeResolver = (data: any) => data } = cookieConfig;

        // OneLogin unique identifier of session of end user
        const sid = getOpenIdSessionId(res);
        const payload = { ...cookieShapeResolver(colleague), sid };

        if (cache) {
          colleagueCache.set(colleagueUUID, payload, cacheTtl);
        }

        setDataToCookie(res, payload, { ...cookieConfig });
        setColleagueData(res, payload);
      } else {
        if (cache) {
          colleagueCache.set(colleagueUUID, colleague, cacheTtl);
        }

        setColleagueData(res, colleague);
      }
    } catch (apiError) {
      if (optional && FetchError.is(apiError) && apiError.status === 404) {
        // colleague not found, store result to cache
        colleagueCache.set(colleagueUUID, 'NOT_FOUND', cacheTtl);
      } else {
        typeof apiError;
      }
    }
  };

  plugin.info = 'Colleague API plugin';
  plugin.optional = config.optional || false;

  return plugin;
};
