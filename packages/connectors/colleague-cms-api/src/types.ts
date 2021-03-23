import { ConnectorContext } from '@energon-connectors/core';
import { DateString } from './built-in';

type DniCmsApiContext = Pick<
  ConnectorContext,
  'identityClientToken' | 'apiEnv' | 'markApiCall'
>;

type DniCmsApiHeaders = {
  Authorization: () => string;
};

type ApiInput<T, U = unknown> = {
  params: T;
  tenantkey: string;
  body?: U;
};

type BaseApiParams = {
  // filter by title
  title_contains?: string;

  // pagination
  _start?: string;
  _limit?: string;

  // sorting
  _sort?: 'created_at:desc' | 'created_at:asc';
};

type BaseType = {
  id: number;
  created_at: DateString;
  updated_at: DateString;
};

export type {
  BaseType,
  DniCmsApiContext,
  DniCmsApiHeaders,
  ApiInput,
  BaseApiParams,
};
