import { Router, RequestHandler } from "express";
import { getAllCookies, isCookiePresent } from "@energon/cookie-utils";
import { AUTH_DATA_COOKIE_NAME } from "../onelogin-middleware";

export type ViewPathPredicate = (path: string) => boolean;

export const saveReturnToUrl = (
  cookieName: string,
  isViewPath: ViewPathPredicate,
): RequestHandler => {
  return (req, res, next) => {
    const isUserLogged = isCookiePresent(req, AUTH_DATA_COOKIE_NAME);
    const isReturnToUrlSet = isCookiePresent(req, cookieName);
    const isView = isViewPath(req.path);

    if (isView && !isUserLogged && !isReturnToUrlSet) {
      const url = encodeURIComponent(req.originalUrl);
      const twoMinutes = 2 * 60 * 1000;
      res.cookie(cookieName, url, {
        maxAge: twoMinutes,
        httpOnly: true,
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
  cookieName?: string;
  mainPage?: string;
  appPath?: string;
};

export const getReturnToMiddlewares = ({
  isViewPath,
  cookieName = "returnTo",
  mainPage = "/",
  appPath = "",
}: ReturnToConfig) => {
  return {
    saveReturnToUrl: saveReturnToUrl(cookieName, isViewPath),
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
  const { saveReturnToUrl, redirectAfterLogin } = getReturnToMiddlewares(
    config,
  );
  const router = Router();

  router.use(saveReturnToUrl);
  router.use(oneLoginMiddleware);
  router.use(redirectAfterLogin);

  return router;
};
