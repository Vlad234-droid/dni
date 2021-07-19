import { Response } from "express";
import { UserScopeToken } from "../api";

export const getIdentityData = <T = UserScopeToken>(
  res: Response,
): T | undefined => res.identityData as T | undefined;

export const setIdentityData = <T>(res: Response, identityData: T) => {
  res.identityData = identityData;
};

declare global {
  namespace Express {
    export interface Response {
      identityData?: unknown;
    }
  }
}
