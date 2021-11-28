import { Response, Request, NextFunction } from 'express';
import { getUserData, setUserData } from './user-data';
import { setDataToCookie, getDataFromCookie, PluginCookieConfig, clearPluginCookiesIfSessionExpired } from '../utils';
import { Optional, Plugin } from '../plugin';
import { OneloginError } from '../..';
import { extractOpenIdUserInfo, OpenIdUserInfo } from '../../oidc-data-extractor';

type Config<O> = {
  /**
   * optional, if it returns false, code in the plugin won't be executed
   * E.g. check if another cookie exists
   * defaults to ()=>true
   */
  shouldRun?: (request: Request, response: Response) => boolean;

  /**
   * optional, cookie configuration object
   * if not present, data won't be saved in the cookie
   * if maxAge is not present, expiration claims will be used instead
   */
  cookieConfig?: PluginCookieConfig & {
    /**
     * optional, method that will determine the shape of the data saved in the cookie
     */
    cookieShapeResolver?: (data: OpenIdUserInfo, response: Response) => O;
  };
};

const handleNoData = (optional?: boolean) => {
  if (!optional) {
    throw new OneloginError('plugin', 'No user info found in response object', 401);
  }
};

/**
 * A plugin middleware to be used in onelogin.
 * It swaps the oidc or saml token for the identity access token.
 */
export const userDataPlugin = <O>(config: Config<O> & Optional): Plugin => {
  const plugin: Plugin = async (req: Request, res: Response) => {
    const { 
      shouldRun = () => true, 
      cookieConfig, 
      optional,
    } = config;
  
    if (getUserData(res) || !shouldRun(req, res)) {
      return;
    }

    if (cookieConfig) {
      clearPluginCookiesIfSessionExpired(req, res, cookieConfig!);
  
      const { secret, cookieName, compressed } = cookieConfig;
      const dataFromCookie = getDataFromCookie<O>(req, { cookieName, secret, compressed });
  
      if (dataFromCookie) {
        setUserData(res, dataFromCookie);
        return;
      }
    }
  
    const userInfo = await extractOpenIdUserInfo(res.openIdClient, res);
    if (userInfo) {
      if (cookieConfig) {
        let payload: O | OpenIdUserInfo;

        const { cookieShapeResolver } = cookieConfig;
        if (cookieShapeResolver && typeof cookieShapeResolver === 'function') {
          const sid = userInfo?.sid;
          payload =  { ...cookieShapeResolver(userInfo, res), sid };
        } else {
          payload =  { ...userInfo };
        }

        setDataToCookie(res, payload, { ...cookieConfig });
        setUserData(res, payload);
      } else {
        setUserData(res, userInfo);
      }
    } else {
      handleNoData(optional);
    }
  };

  plugin.info = 'Application User Data plugin';
  plugin.optional = config.optional || false;

  return plugin;
};
