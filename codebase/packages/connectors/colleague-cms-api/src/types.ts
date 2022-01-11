import { ConnectorContext } from '@energon-connectors/core';
import { DateString } from './built-in';

export type ColleagueCmsApiConfig = Partial<{
  colleagueCmsBaseUrl: () => string | undefined,
  colleagueCmsTenantKey: () => string | undefined,
}>;

export type ColleagueCmsApiContext<T = ColleagueCmsApiConfig> = Pick<ConnectorContext, 'identityClientToken' | 'apiEnv'> & {
  config: () => T;
};

export type ColleagueCmsApiHeaders = {
  Auth: () => string,
  TenantKey: () => string,
};

export type ApiInput<T, U = unknown> = {
  params: T;
  body?: U;
};

export type BaseApiParams = {
  // filter _where
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _where?: any;

  // pagination
  _start?: string;
  _limit?: string;

  // sorting
  _sort?: string; // 'created_at:desc' | 'created_at:asc'

  published_at_null?: string;

  _publicationState?: 'live' | 'preview';
};

export type BaseType = {
  id: number;
  created_at: DateString;
  updated_at: DateString;
  published_at: DateString;
};
