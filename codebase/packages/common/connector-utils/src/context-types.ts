import { ConnectorContext } from '@energon-connectors/core';
import { JSONValue } from '@energon/type-utils';

type ConfigContext<T> = {
  config: () => T;
};

type SessionDataContext<T> = {
  sessionData: () => T;
};

type BasicUserData = {
  sessionId: string;
  userName: string;
  userFirstName: string;
  userEmail: string;
  colleagueUUID: string;
  employeeNumber: string;
};

type LoggerContext = {
  sendLog: (message: JSONValue) => void;

  hideRequestBodyLog: () => void;
};

type RequestCtx<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TConfig = {},
  TSessionData = BasicUserData,
> = ConnectorContext & ConfigContext<TConfig> & SessionDataContext<TSessionData> & LoggerContext;

export type { ConfigContext, SessionDataContext, LoggerContext, RequestCtx };
