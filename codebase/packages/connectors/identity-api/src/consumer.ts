import { fetchClient } from '@energon-connectors/core';
import { createApiConsumer, ApiConsumer } from '@energon/rest-api-consumer';
import { defineAPI } from '@energon/rest-api-definition';

import { IdentityApiInput } from './types';
import { ClientTokenIssueBody, ClientTokenResponse } from './types';
import { UserTokenExchangeBody, UserTokenRefreshBody, UserTokenResponse } from './types';

import { ApiClientConfig } from '@dni-common/connector-utils';
import { FetchClientConfig } from '@energon/fetch-client';

export const identityApiDef = defineAPI((endpoint) => ({

  issueToken: endpoint
    .post('/identity/v4/issue-token/token')
    .body<ClientTokenIssueBody>()
    .response<ClientTokenResponse>()
    .build(),

  exchangeUserToken: endpoint
    .post('/identity/v4/issue-token/token')
    .body<UserTokenExchangeBody>()
    .response<UserTokenResponse>()
    .build(),

  refreshUserToken: endpoint
    .post('/identity/v4/issue-token/token')
    .body<UserTokenRefreshBody>()
    .response<UserTokenResponse>()
    .build(),

}));

const identityApiProxy = (apiConsumer: ApiConsumer<typeof identityApiDef>) => {

  return {
    issueToken: (input: IdentityApiInput<ClientTokenIssueBody>) =>
      apiConsumer.issueToken(input).then((response) => response?.data),

    exchangeUserToken: (input: IdentityApiInput<UserTokenExchangeBody>) =>
      apiConsumer.exchangeUserToken(input).then((response) => response?.data),

    refreshUserToken: (input: IdentityApiInput<UserTokenRefreshBody>) =>
      apiConsumer.refreshUserToken(input).then((response) => response?.data),
  };
}

export type IdentityApi = ReturnType<typeof identityApiProxy>;

export const identityApiConsumer = (apiConfig: ApiClientConfig, overrides?: FetchClientConfig): IdentityApi => {
  const { baseUrl, baseHeaders } = apiConfig;

  const apiConsumer = createApiConsumer(identityApiDef, fetchClient(baseUrl, baseHeaders, { }, overrides));

  return identityApiProxy(apiConsumer);
};
