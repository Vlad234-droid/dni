import { NextFunction, Request, Response } from 'express';

import { ConnectorContext } from '@energon-connectors/core';
import { JSONValue } from '@energon/type-utils';

// prettier-ignore
// eslint-disable-next-line @typescript-eslint/ban-types
export type RequestCtx<TConfig = {}, TSessionData = {}> = 
  & ExpressContext
  & ConnectorContext
  & ConfigContext<TConfig>
  & SessionDataContext<TSessionData>
// & LoggerContext

export type ExpressContext = {
  req: Request;
  res: Response;
  next?: NextFunction;
};
export type ConfigContext<T> = {
  config: () => T;
};

export type SessionDataContext<T> = {
  sessionData: () => T;
};

export type LoggerContext = {
  /** add `message` to `customLogs` section of splunk log for current request */
  sendLog: (message: JSONValue) => void;

  /** prevent splunk logger from logging `req.body` */
  hideRequestBodyLog: () => void;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ContextProvider<TConfig = {}, TSessionData = {}> = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => RequestCtx<TConfig, TSessionData>;
