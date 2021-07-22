import express from "express";
import { Plugin } from "@dni-connectors/onelogin";
import { asyncHandler } from '@energon/express-middlewares';

export const toMiddleware = (plugin: Plugin): Middleware => {
  return asyncHandler(async (req, res, next) => {
    try {
      // logger(LoggerEvent.debug('login', `Running OpenId plugin: ${plugin.info}`, { req, res }));
      return await plugin(req, res, next);
    } catch (error) {
      if (plugin.optional) {
        // logger(LoggerEvent.warn('plugin', 'error while executing plugin', { req, res }, error));
        return next();
      } else {
        return next(error);
      }
    }
  });
}