import { Response } from 'express';
import { UserTokenResponse } from '@dni-connectors/identity-api';

export const getIdentityData = <T = UserTokenResponse>(res: Response): T | undefined => res.identityData as T | undefined;

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
