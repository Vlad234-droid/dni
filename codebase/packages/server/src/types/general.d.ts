import { Request, Response, NextFunction } from 'express';
import { AuthData, OpenIdUserInfo } from '@energon/onelogin';
import { ColleagueV2 } from '@dni-connectors/colleague-api';

declare global {
  type Middleware = {
    <T>(req: Request & T, res: Response, next: NextFunction): void;
  };

  type ErrorMiddleware = {
    <T>(err: Error, req: Request & T, res: Response, next: NextFunction): void;
  };

  namespace Express {
    export interface Request {
      oneLoginAuthData?: AuthData;
      oneLoginUserInfo?: OpenIdUserInfo;
      colleagueUUID?: string | null;
    }

    export interface Response {
      colleagueUUID?: string | null;
    }
  }
}
