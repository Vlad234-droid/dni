import { ConnectorContext } from '@energon-connectors/core';
import { JSONValue } from '@energon/type-utils';
import type { OpenIdUserInfo } from '@energon/onelogin';

type BusinessCategory = NonNullable<
  OpenIdUserInfo['custom_fields']
>['businessCategory'];

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
  colleagueUuid: string;
  employeeNumber: string;
  businessCategory?: BusinessCategory;
};

type RequestCtx<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TConfig = {},
  TSessionData = BasicUserData
> = ConnectorContext &
  ConfigContext<TConfig> &
  SessionDataContext<TSessionData> &
  LoggerContext;

type LoggerContext = {
  sendLog: (message: JSONValue) => void;

  hideRequestBodyLog: () => void;
};

export type {
  ConfigContext,
  SessionDataContext,
  LoggerContext,
  RequestCtx,
  BusinessCategory,
};
