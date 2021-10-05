import { RequestHandler, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

const REQUEST_TRACE_KEY = "onelogin.request.trace";

export const requestTracingMiddleware: RequestHandler = (_req, res, next) => {
  if (getRequestTraceId(res) == null) {
    res.locals[REQUEST_TRACE_KEY] = uuidv4();
  }
  next();
};

export const getRequestTraceId = (res: Response): string | undefined =>
  res.locals[REQUEST_TRACE_KEY];
