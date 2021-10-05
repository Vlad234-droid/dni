import express from "express";
import {
  PluginCookieConfig,
  clearCookie as clearResponseCookie,
  clearRequestCookie,
} from "./cookie";
import { getOpenIdUserInfo } from "../../user-info-extractor";
import { getDataFromCookie } from "./get-data-from-cookie";

export const clearPluginCookiesIfSessionExpired = (
  req: express.Request,
  res: express.Response,
  cookieConfig: Omit<PluginCookieConfig, "maxAge">,
  additionalCookiesToClear: Omit<PluginCookieConfig, "maxAge">[] = [],
) => {
  const { cookieName, secret, compressed } = cookieConfig;
  const sessionId = getOpenIdUserInfo(res)?.sid;
  const pluginSessionId = getDataFromCookie<{ sid: string }>(req, {
    cookieName,
    secret,
    compressed,
  })?.sid;

  if (sessionId && pluginSessionId !== sessionId) {
    clearResponseCookie(res, cookieConfig);
    clearRequestCookie(req, cookieConfig);

    for (const cookie of additionalCookiesToClear) {
      clearResponseCookie(res, { ...cookieConfig, ...cookie });
      clearRequestCookie(req, cookie);
    }
  }
};
