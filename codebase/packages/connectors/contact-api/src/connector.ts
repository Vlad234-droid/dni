import { fetchClient, resolveBaseUrl, TESCO_API_URLS } from '@energon-connectors/core';
import { createApiConsumer } from '@energon/rest-api-consumer';
import { defineAPI } from '@energon/rest-api-definition';

import { ApiOutput, ApiBody, ApiInput, ContactApiContext, ApiParams } from './types';

export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType>
  ? ElementType
  : never;

export const contactApiDef = defineAPI((endpoint) => ({
  sendMessages: endpoint
    .post('/messaging/v1/send/:templateId')
    .params<ApiParams>()
    .body<ApiBody>()
    .response<ApiOutput>()
    .build(),
}));

export const contactApiConnector = (ctx: ContactApiContext) => {
  const baseUrl = resolveBaseUrl(TESCO_API_URLS, ctx);

  const apiConsumer = createApiConsumer(contactApiDef, fetchClient(baseUrl, {}, ctx));

  return {
    sendMessages: (input: ApiInput<ApiParams, ApiBody>) =>
      apiConsumer.sendMessages(input).then((resp) => ({
        ...resp,
      })),
  };
};

export type ContactApi = ReturnType<typeof contactApiConnector>;
