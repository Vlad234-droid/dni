import { fetchClient, resolveBaseUrl, TESCO_API_URLS, Headers } from '@energon-connectors/core';
import { createApiConsumer } from '@energon/rest-api-consumer';
import { defineAPI } from '@energon/rest-api-definition';

import {
  ApiMsgOutput,
  ApiEmailAddressesOutput,
  ApiEmailAddressOutput,
  ApiMsgBody,
  ApiEmailAddressBody,
  ApiInput,
  ContactApiContext,
  ApiParams,
  ContactAPIHeaders,
} from './types';

export const USER_UID_PREFIX = 'trn:tesco:uid:uuid';

export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType>
  ? ElementType
  : never;

export const contactApiDef = defineAPI((endpoint) => ({
  sendMessages: endpoint
    .post('/contact/messaging/v1/send/:templateId')
    .params<ApiParams>()
    .body<ApiMsgBody>()
    .response<ApiMsgOutput>()
    .build(),
  getEmailAddresses: endpoint
    .get('/contact/v1/addressbook/emailaddresses')
    .params<ApiParams>()
    .response<ApiEmailAddressesOutput>()
    .build(),
  updateEmailAddress: endpoint
    .put('/contact/v1/addressbook/emailaddresses')
    .params<ApiParams>()
    .body<ApiEmailAddressBody>()
    .response<ApiEmailAddressOutput>()
    .build(),
  createEmailAddress: endpoint
    .post('/contact/v1/addressbook/emailaddresses/:userId')
    .params<ApiParams>()
    .body<ApiEmailAddressBody>()
    .response<ApiEmailAddressOutput>()
    .build(),
}));

export const contactApiConnector = (ctx: ContactApiContext) => {
  const headers: ContactAPIHeaders = {
    ...Headers.identityClientScopedAuthorization(ctx),
  };
  const baseUrl = resolveBaseUrl(TESCO_API_URLS, ctx);

  const apiConsumer = createApiConsumer(contactApiDef, fetchClient(baseUrl, headers, ctx));

  return {
    sendMessages: ({ params, body }: ApiInput<ApiParams, ApiMsgBody>) =>
      apiConsumer.sendMessages({ params, body: body! }),
    getEmailAddresses: (input: ApiInput<ApiParams>) => apiConsumer.getEmailAddresses(input),
    updateEmailAddress: ({ params, body }: ApiInput<ApiParams, ApiEmailAddressBody>) =>
      apiConsumer.updateEmailAddress({ params, body: body! }),
    createEmailAddress: ({ params, body }: ApiInput<ApiParams, ApiEmailAddressBody>) =>
      apiConsumer.createEmailAddress({ params, body: body! }),
  };
};

export type ContactApi = ReturnType<typeof contactApiConnector>;
