import express from "express";

export { asyncHandler } from "./async-handler";

export type { AsyncHandler } from "./async-handler";

declare global {
  namespace Express {
    export type Middleware = {
      <T, U>(req: express.Request & T, res: express.Response & U, next: express.NextFunction): Promise<void> | void;
    };
    
    export type ErrorMiddleware = {
      <T, U>(err: Error, req: express.Request & T, res: express.Response & U, next: express.NextFunction): Promise<void> | void;
    };
  }
}
    