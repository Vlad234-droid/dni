import {
  fetchClient,
  resolveBaseUrl,
  TESCO_API_URLS,
} from '@energon-connectors/core';
import { createApiConsumer } from '@energon/rest-api-consumer';
import { defineAPI } from '@energon/rest-api-definition';

import { ApiOutput, ApiBody, ApiInput, IdentityApiContext } from './types';

export const buildBody = (clientId: string, clientSecret: string) => ({
  grant_type: 'client_credentials',
  scope: 'internal public',
  confidence_level: 12,
  client_id: clientId,
  client_secret: clientSecret,
});

export type ElementType<
  T extends ReadonlyArray<unknown>
> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;

export const identityApiDef = defineAPI((endpoint) => ({
  getToken: endpoint
    .post('/identity/v4/issue-token/token')
    .response<ApiOutput>()
    .body<ApiBody>()
    .build(),
}));

export const identityApiConnector = (ctx: IdentityApiContext) => {
  const baseUrl = resolveBaseUrl(TESCO_API_URLS, ctx);

  const apiConsumer = createApiConsumer(
    identityApiDef,
    fetchClient(baseUrl, {}, ctx),
  );

  return {
    getToken: (input: ApiInput<ApiBody>) =>
      apiConsumer.getToken(input).then((resp) => ({
        ...resp,
        accessToken: resp.data.access_token,
      })),
  };
};

export type IdentityApi = ReturnType<typeof identityApiConnector>;
