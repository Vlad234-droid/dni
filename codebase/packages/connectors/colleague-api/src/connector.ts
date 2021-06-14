import {
  fetchClient,
  resolveBaseUrl,
  Headers,
  TESCO_API_URLS,
} from '@energon-connectors/core';
import { createApiConsumer } from '@energon/rest-api-consumer';
import { defineAPI } from '@energon/rest-api-definition';

import { colleagueQuery } from './query';
import {
  ColleagueApiContext,
  Colleague,
  GetColleagueInput,
  ColleagueRequestBody,
} from './types';

export type ElementType<
  T extends ReadonlyArray<unknown>
> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;

type ColleagueAPIHeaders = {
  Authorization: () => string;
};

export const colleagueApiDef = defineAPI((endpoint) => ({
  /**
   * @see https://developers.tesco.com/explore/Colleague#/Colleague%20API/post_colleagues
   */
  getColleague: endpoint
    .post('/colleague/colleagues')
    .response<{
      data: {
        colleague: Colleague;
      };
    }>()
    .body<ColleagueRequestBody>()
    .build(),
}));

export const colleagueApiConnector = (ctx: ColleagueApiContext) => {
  const headers: ColleagueAPIHeaders = {
    ...Headers.identityUserScopedAuthorization(ctx),
  };
  const baseUrl = resolveBaseUrl(TESCO_API_URLS, ctx);

  const apiConsumer = createApiConsumer(
    colleagueApiDef,
    fetchClient(baseUrl, headers, ctx),
  );

  return {
    v1: {
      getColleague: <T extends keyof Colleague>({
        colleagueUUID,
        fields,
        fetchOpts,
      }: GetColleagueInput<T>) =>
        apiConsumer
          .getColleague({
            body: colleagueQuery({ colleagueUUID, fields }),
            fetchOpts,
          })
          .then((resp) => ({
            ...resp,
            data: resp.data.data.colleague as Pick<
              Colleague,
              ElementType<typeof fields>
            >,
          })),
    },
  };
};

export type ColleagueApi = ReturnType<typeof colleagueApiConnector>;
