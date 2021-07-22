import { Response } from 'express';
import { ClientScopeToken } from '../api';

export const getIdentityClientScopeToken = (res: Response): ClientScopeToken | undefined => res.identityCST;

export const setIdentityClientScopeToken = (res: Response, identityClientScopeToken: ClientScopeToken) => {
  res.identityCST = identityClientScopeToken;
};

declare global {
  namespace Express {
    export interface Response {
      identityCST?: ClientScopeToken;
    }
  }
}
