import { NextFunction, Request, Response } from 'express';

import { ConnectorContext } from '@energon-connectors/core';

// prettier-ignore
// eslint-disable-next-line @typescript-eslint/ban-types
export type ExpressRequestCtx<TConfig = {}, TSessionData = {}> = 
  & ExpressContext
  & ConnectorContext
  & ConfigContext<TConfig>
  & SessionDataContext<TSessionData>

// prettier-ignore
// eslint-disable-next-line @typescript-eslint/ban-types
export type ClientRequestCtx<TConfig = {}, TSessionData = {}> = 
  & ConnectorContext
  & ConfigContext<TConfig>
  & SessionDataContext<TSessionData>

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

// eslint-disable-next-line @typescript-eslint/ban-types
export type ExpressContextProvider<TConfig = {}, TSessionData = {}> = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => ExpressRequestCtx<TConfig, TSessionData>;

export type ClientContextProvider<TConfig = {}, TSessionData = {}> = (
) => ClientRequestCtx<TConfig, TSessionData>;
