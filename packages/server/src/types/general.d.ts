import { Request, Response, NextFunction } from 'express';
import { AuthData, OpenIdUserInfo } from '@energon/onelogin';

declare global {
  type Middleware = {
    <T>(req: Request & T, res: Response, next: NextFunction): void;
  };

  type ErrorMiddleware = {
    <T>(err: Error, req: Request & T, res: Response, next: NextFunction): void;
  };
}

declare namespace Express {
  export interface Request {
    oneLoginAuthData?: AuthData;
    oneLoginUserInfo?: OpenIdUserInfo;
  }
}
