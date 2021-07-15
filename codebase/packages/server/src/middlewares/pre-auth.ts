import {
  AuthData,
  AUTHENTICATION_PATH,
  AUTH_DATA_COOKIE_NAME,
  getDataFromCookie,
  SESSION_COOKIE_NAME,
} from '@energon/onelogin';
//import { getAllCookies, isCookiePresent } from "@energon/cookie-utils";

import { ContextProvider } from '@energon/rest-api-provider';

import { ProcessConfig } from '../config/config-accessor';
import path from 'path';

// export const saveReturnToUrl = (
//   cookieName: string,
//   isViewPath: ViewPathPredicate,
// ): RequestHandler => {
//   return (req, res, next) => {
//     const isUserLogged = isCookiePresent(req, AUTH_DATA_COOKIE_NAME);
//     const isReturnToUrlSet = isCookiePresent(req, cookieName);
//     const isView = isViewPath(req.path);

//     if (isView && !isUserLogged && !isReturnToUrlSet) {
//       const url = encodeURIComponent(req.originalUrl);
//       const twoMinutes = 2 * 60 * 1000;
//       res.cookie(cookieName, url, {
//         maxAge: twoMinutes,
//         httpOnly: true,
//       });
//     }

//     next();
//   };
// };

export const preAuth = (config: ProcessConfig): Middleware => {
  return async (req, res, next) => {
    // console.log(` *** IN PRE-AUTH ***`);
    // console.log(`path: ${req.path}`);

    const returnCookieName = 'preAuthReturnTo';
    const isViewPath = (p: String) => !p.match('^(/api|/auth|/sso)');
    const isCookiePresent = (c: String) =>
      req.headers && req.headers.cookie && req.headers.cookie.indexOf(`${c}=`) >= 0;

    const isUserLogged = isCookiePresent(AUTH_DATA_COOKIE_NAME);
    const isReturnToUrlSet = isCookiePresent(returnCookieName);
    const isView = isViewPath(req.path);

    // console.log(`isUserLogged: ${isUserLogged}`);
    // console.log(`isReturnToUrlSet: ${isReturnToUrlSet}`);
    // console.log(`isView: ${isView}`);

    if (isView && !isUserLogged && !isReturnToUrlSet) {
      // console.log(`authData not found !!!`);
      // console.log(`originalUrl: ${req.originalUrl}`);

      const url = encodeURIComponent(req.originalUrl);
      const fiveMinutes = 5 * 60 * 1000;

      res.clearCookie(AUTH_DATA_COOKIE_NAME);
      res.clearCookie(SESSION_COOKIE_NAME);
      res.clearCookie(`${SESSION_COOKIE_NAME}.sig`);

      res.cookie(returnCookieName, url, { maxAge: fiveMinutes, httpOnly: true });

      //res.redirect('/');
      res.status(200).sendFile(path.resolve(path.join('public', 'reload.html')));
    }
    if (isUserLogged && isReturnToUrlSet) {
      res.clearCookie(returnCookieName);
    }

    next();
  };
};
