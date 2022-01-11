import { NextFunction, Request, Response } from 'express';

import { ConnectorContext } from '@energon-connectors/core';
import { ColleagueCmsApiConfig } from '@dni-connectors/colleague-cms-api';

type DefaultConfig = 
  & ColleagueCmsApiConfig;

type DefaultSessionData = {};

// prettier-ignore
// eslint-disable-next-line @typescript-eslint/ban-types
export type ExpressRequestCtx<TConfig = DefaultConfig, TSessionData = DefaultSessionData> = 
  & ExpressContext
  & ConnectorContext
  & ConfigContext<TConfig>
  & SessionDataContext<TSessionData>

// prettier-ignore
// eslint-disable-next-line @typescript-eslint/ban-types
export type ClientRequestCtx<TConfig = DefaultConfig, TSessionData = DefaultSessionData> = 
  & ConnectorContext
  & ConfigContext<TConfig>
  & SessionDataContext<TSessionData>

export type ExpressContext = {
  req: Request;
  res: Response;
  next?: NextFunction;
};

export type ConfigContext<T = DefaultConfig> = {
  config: () => T;
};

export type SessionDataContext<T = DefaultSessionData> = {
  sessionData: () => T;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ExpressContextProvider<TConfig = DefaultConfig, TSessionData = DefaultSessionData> = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => ExpressRequestCtx<TConfig, TSessionData>;

export type ClientContextProvider<TConfig = DefaultConfig, TSessionData = DefaultSessionData> = (
) => ClientRequestCtx<TConfig, TSessionData>;
