import { Response } from "express";

export const getUserData = <T>(res: Response): T | undefined =>
  res.userData as T | undefined;

export const setUserData = <T>(res: Response, userData: T) => {
  res.userData = userData;
};

declare global {
  namespace Express {
    export interface Response {
      userData?: unknown;
    }
  }
}
