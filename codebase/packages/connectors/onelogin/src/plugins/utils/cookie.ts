import { Response, Request , CookieOptions } from 'express';
import { pipe } from '@energon/function-utils';
import { compress } from './compression';
import { encrypt } from './encryption';


export type PluginCookieConfig = {
  /**
   * Name of the cookie from which data will be retrived
   */
  cookieName: string;
  /**
   * optional, It will be used to encrypt data before storing in the cookie content
   */
  secret?: string;
  /*
   * optional, defaults to true, if true cookie contents will be compressed
   */
  compressed?: boolean;
  /**
   * optional, relates to the maxAge cookie setting
   */
  maxAge?: number;
  /**
   * optional, relates to the httpOnly cookie setting
   */
  httpOnly?: boolean;
  /**
   * optional, relates to the secure cookie setting
   */
  secure?: boolean;
  /**
   * optional, if set to true cookie will be saved as signed
   */
  signed?: boolean;
  /* *
   * optional, if set, cookie path will be set to specified value
   */
  path?: string;
};

/**
 * Saves given data in the configured cookie and returns saved data.
 *
 * @param res Express response object
 * @param cookieConfig Configuration object that will be used to create cookie
 * @param data Data to be saved in the cookie
 */

export const setDataToCookie = (res: Response, data: Record<any, any>, cookieConfig: PluginCookieConfig) => {
  const {
    cookieName,
    secret,
    httpOnly = true,
    signed = true,
    path = '/',
    secure = process.env.NODE_ENV === 'production',
    maxAge,
    compressed,
  } = cookieConfig;

  const preparedData = pipe(data, compress(!!compressed), encrypt(secret || ''));

  const cookieOptions: CookieOptions = { httpOnly, signed, path, secure };
  if (!!maxAge && !isNaN(Number(maxAge))) {
    cookieOptions.maxAge = maxAge;
  }

  res.cookie(cookieName, preparedData, cookieOptions);

  return preparedData;
};

/**
 * Saves given data in the configured cookie.
 *
 * @param res Express response object
 * @param cookieConfig Configuration object that will be used to create cookie
 * @param data Data to be saved in the cookie
 */
export const clearCookie = (res: Response, cookieConfig: Omit<PluginCookieConfig, 'secret' | 'maxAge'>) => {
  const {
    cookieName,
    httpOnly = true,
    signed = true,
    secure = process.env.NODE_ENV === 'production',
    path = '/',
  } = cookieConfig;

  res.clearCookie(cookieName, {
    httpOnly,
    signed,
    secure,
    path,
  });
};

/**
 * Removes cookie from request
 *
 * @param rew Express request object
 * @param cookieConfig Configuration object that will be used to remove cookie
 */
export const clearRequestCookie = (req: Request, { cookieName }: Pick<PluginCookieConfig, 'cookieName'>) => {
  delete req.signedCookies[cookieName];
  delete req.cookies[cookieName];
};
