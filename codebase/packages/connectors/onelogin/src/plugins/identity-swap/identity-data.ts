import { Response } from 'express';
import { UserScopeToken } from '../api';

export const getIdentityData = <T = UserScopeToken>(res: Response): T | undefined => res.identityData as T | undefined;

export const setIdentityData = <T>(res: Response, identityData: T) => {
  res.identityData = identityData;
};

export const getColleagueUuid = (res: Response): string | undefined => res.colleagueUUID;

export const setColleagueUuid = (res: Response, colleagueUUID: string) => {
  res.colleagueUUID = colleagueUUID;
};

declare global {
  namespace Express {
    export interface Response {
      identityData?: unknown;
      colleagueUUID?: string;
    }
  }
}
