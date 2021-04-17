import { ConnectorContext } from '@energon-connectors/core';

export type ApiBody = {
  grant_type: string;
  scope: string;
  confidence_level: number;
  client_id: string;
  client_secret: string;
};

export type ApiInput<T> = {
  body: T;
};

export type ApiOutput = {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  scope: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  claims: any;
};

export type IdentityApiContext = Pick<
  ConnectorContext,
  'identityUserToken' | 'apiEnv' | 'markApiCall'
>;
