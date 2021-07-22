import express from "express";
import { Plugin } from "@energon/onelogin";

export const toMiddleware = (plugin: Plugin): Middleware => {
  const handler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      plugin(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  return handler;
}