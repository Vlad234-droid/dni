import { Request, Response, NextFunction } from 'express';

declare global {
  type Middleware = {
    <T>(req: Request & T, res: Response, next: NextFunction): void;
  };

  type ErrorMiddleware = {
    <T>(err: Error, req: Request & T, res: Response, next: NextFunction): void;
  };

}

export * from './static-content';
export * from './error-handler';
export * from './open-id';
export * from './unless-paths';
export * from './api';
export * from './pre-auth';
export * from './form-data';
export * from './fake-login';
export * from './fake-user-extractor';
export * from './colleague-extractor';
