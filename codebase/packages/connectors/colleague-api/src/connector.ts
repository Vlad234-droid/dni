import { fetchClient, resolveBaseUrl, Headers, TESCO_API_URLS } from '@energon-connectors/core';
import { FetchClientConfig } from '@energon/fetch-client';
import { createApiConsumer } from '@energon/rest-api-consumer';
import { ApiClientConfig, ApiInput } from '@dni-common/connector-utils';

import { colleagueApiDef } from './api-def';
import { ColleagueApiContext } from 'context';

import { Colleague, ColleagueAPIHeaders, ColleagueRequestParams, ColleagueListRequestParams } from './types';

export function colleagueApiConsumer(apiConfig: ApiClientConfig, overrides?: FetchClientConfig) {
  const { baseUrl, baseHeaders } = apiConfig;

  return createApiConsumer(colleagueApiDef, fetchClient(baseUrl, baseHeaders, { }, overrides));
}

export function colleagueApiConnector(ctx: ColleagueApiContext, overrides?: FetchClientConfig) {
  const baseUrl = resolveBaseUrl(TESCO_API_URLS, ctx);
  const headers: ColleagueAPIHeaders = {
    ...Headers.identityClientScopedAuthorization(ctx),
  };
  const apiConsumer = createApiConsumer(colleagueApiDef, fetchClient(baseUrl, headers, ctx, overrides));

  return {
    getColleague: (input: ApiInput<ColleagueRequestParams>): Promise<Colleague | undefined> =>
      apiConsumer.getColleague(input).then((response) => response?.data),

    getColleagues: (input: ApiInput<ColleagueListRequestParams>): Promise<Colleague[]> =>
      apiConsumer.getColleagues(input).then((response) => response?.data?.colleagues || []),
  };
}

export type ColleagueApi = ReturnType<typeof colleagueApiConsumer>;
