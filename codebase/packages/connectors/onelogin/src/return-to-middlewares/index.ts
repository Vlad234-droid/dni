import { Router, RequestHandler } from "express";
import { getAllCookies, isCookiePresent } from "@energon/cookie-utils";
import { AUTH_DATA_COOKIE_NAME } from "../onelogin-middleware";

export type ViewPathPredicate = (path: string) => boolean;

export const saveReturnToUrl = (
  authDataCookieName: string,
  cookieName: string,
  isViewPath: ViewPathPredicate,
): RequestHandler => {
  return (req, res, next) => {
    const isUserLogged = isCookiePresent(req, authDataCookieName);
    const isReturnToUrlSet = isCookiePresent(req, cookieName);
    const isView = isViewPath(req.path);

    if (isView && !isUserLogged && !isReturnToUrlSet) {
      const url = encodeURIComponent(req.originalUrl);
      const twoMinutes = 2 * 60 * 1000;
      res.cookie(cookieName, url, {
        maxAge: twoMinutes,
        httpOnly: false,
      });
    }

    next();
  };
};

export const redirectAfterLogin = (
  cookieName: string,
  mainPage: string,
  isViewPath: ViewPathPredicate,
  appPath: string,
): RequestHandler => {
  return (req, res, next) => {
    const cookies = getAllCookies(req);

    if (cookies[cookieName] != null) {
      const returnTo = decodeURIComponent(cookies[cookieName]);
      res.clearCookie(cookieName);

      const isCircularRedirect = req.originalUrl === returnTo;
      const isMainPageUrl = req.path === mainPage;
      const isView = isViewPath(req.path);

      if (isView && isMainPageUrl && !isCircularRedirect) {
        return res.redirect(appPath + returnTo);
      }
    }

    next();
  };
};

type ReturnToConfig = {
  isViewPath: ViewPathPredicate;
  authDataCookieName?: string;
  cookieName?: string;
  mainPage?: string;
  appPath?: string;
};

export const getReturnToMiddlewares = ({
  isViewPath,
  authDataCookieName = AUTH_DATA_COOKIE_NAME,
  cookieName = "returnTo",
  mainPage = "/",
  appPath = "",
}: ReturnToConfig) => {
  return {
    saveReturnToUrl: saveReturnToUrl(authDataCookieName, cookieName, isViewPath),
    redirectAfterLogin: redirectAfterLogin(
      cookieName,
      mainPage,
      isViewPath,
      appPath,
    ),
  };
};

export const withReturnTo = (
  oneLoginMiddleware: RequestHandler,
  config: ReturnToConfig,
) => {
  const { saveReturnToUrl, redirectAfterLogin } = getReturnToMiddlewares(config);
  const router = Router();

  router.use(saveReturnToUrl);
  router.use(oneLoginMiddleware);
  router.use(redirectAfterLogin);

  return router;
};
