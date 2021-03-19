import { Request, Response } from 'express';

import { ConnectorContext } from '@energon-connectors/core';
import { JSONValue } from '@energon/type-utils';

export type ExtractedOpenIdData = {
  sub: string;
  sid: string;
  fullName: string;
  firstName: string;
  email: string;
  params: {
    employeeNumber: string;
  };
  groups: string[];
};

export type ExtractedUSTData = {
  uuid: string;
  access_token: string;
};

export type BasicUserData = {
  sessionId: string;
  userName: string;
  userFirstName: string;
  userEmail: string;
  colleagueUuid: string;
  employeeNumber: string;
};

// prettier-ignore
// eslint-disable-next-line @typescript-eslint/ban-types
export type RequestCtx<TConfig = {}, TSessionData = BasicUserData> = 
  & ConnectorContext
  & ConfigContext<TConfig>
  & SessionDataContext<TSessionData>
  & LoggerContext

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
export type ContextProvider<TConfig = {}, TSessionData = BasicUserData> = (
  req: Request,
  res: Response,
) => RequestCtx<TConfig, TSessionData>;
