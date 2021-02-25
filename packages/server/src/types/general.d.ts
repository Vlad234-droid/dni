import { Request, Response, NextFunction } from 'express';

declare global {
  type Middleware = {
    <T>(req: Request & T, res: Response, next: NextFunction): void;
  };

  type ErrorMiddleware = {
    <T>(err: Error, req: Request & T, res: Response, next: NextFunction): void;
  };
}
