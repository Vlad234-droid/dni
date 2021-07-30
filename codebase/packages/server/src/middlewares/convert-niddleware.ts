import express from 'express';
import { Plugin } from '@dni-connectors/onelogin';
import { asyncHandler } from '@energon/express-middlewares';

export const toMiddleware = (plugin: Plugin): express.Handler => {
  return asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      // logger(LoggerEvent.debug('login', `Running OpenId plugin: ${plugin.info}`, { req, res }));
      await plugin(req, res);
      next();
    } catch (error) {
      if (plugin.optional) {
        // logger(LoggerEvent.warn('plugin', 'error while executing plugin', { req, res }, error));
        next();
      } else {
        next(error);
      }
    }
  });
};
