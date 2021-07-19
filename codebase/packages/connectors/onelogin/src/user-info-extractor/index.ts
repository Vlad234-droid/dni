import { Response } from "express";
import jwt from "jsonwebtoken";
import { OpenIdUserInfo } from "./openid-user-info";

export * from "./openid-user-info";

/** 
 * This getter will only work right after logging in, and not in the following requests 
 */
export const getOpenIdUserInfo = <T = OpenIdUserInfo>(
  res: Response,
): T | undefined => {
  if (res.oneLoginAuthData?.idToken == null) {
    return undefined;
  }
  const openIdUserInfo = jwt.decode(res.oneLoginAuthData.idToken) as T;
  return openIdUserInfo;
};

export const setOpenIdUserInfo = <T>(res: Response, userInfo: T) => {
  res.oneLoginUserInfo = userInfo;
};

declare global {
  namespace Express {
    export interface Response {
      oneLoginUserInfo?: unknown;
    }
  }
}
