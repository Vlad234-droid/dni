import { Response } from 'express';
import { ClientTokenResponse } from '@dni-connectors/identity-api';

export const getIdentityClientScopeToken = (res: Response): ClientTokenResponse | undefined => res.identityCST;

export const setIdentityClientScopeToken = (res: Response, identityClientScopeToken: ClientTokenResponse) => {
  res.identityCST = identityClientScopeToken;
};

declare global {
  namespace Express {
    export interface Response {
      identityCST?: ClientTokenResponse;
    }
  }
}
