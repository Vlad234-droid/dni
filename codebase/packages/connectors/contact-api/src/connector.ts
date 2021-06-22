import { fetchClient, resolveBaseUrl, TESCO_API_URLS } from '@energon-connectors/core';
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
} from './types';

export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType>
  ? ElementType
  : never;

export const contactApiDef = defineAPI((endpoint) => ({
  sendMessages: endpoint
    .post('/messaging/v1/send/:templateId')
    .params<ApiParams>()
    .body<ApiMsgBody>()
    .response<ApiMsgOutput>()
    .build(),
  getEmailAddresses: endpoint
    .get('/contact/addressbook/v3/users/:colleagueUUID/emailaddresses')
    .params<ApiParams>()
    .response<ApiEmailAddressesOutput>()
    .build(),
  updateEmailAddress: endpoint
    .put('/contact/addressbook/v3/users/:colleagueUUID/emailaddresses/:emailIndex')
    .params<ApiParams>()
    .body<ApiEmailAddressBody>()
    .response<ApiEmailAddressOutput>()
    .build(),
}));

export const contactApiConnector = (ctx: ContactApiContext) => {
  const baseUrl = resolveBaseUrl(TESCO_API_URLS, ctx);

  const apiConsumer = createApiConsumer(contactApiDef, fetchClient(baseUrl, {}, ctx));

  return {
    sendMessages: (input: ApiInput<ApiParams, ApiMsgBody>) => apiConsumer.sendMessages(input),
    getEmailAddresses: (input: ApiInput<ApiParams>) => apiConsumer.getEmailAddresses(input),
    updateEmailAddress: (input: ApiInput<ApiParams, ApiEmailAddressBody>) => apiConsumer.updateEmailAddress(input),
  };
};

export type ContactApi = ReturnType<typeof contactApiConnector>;
