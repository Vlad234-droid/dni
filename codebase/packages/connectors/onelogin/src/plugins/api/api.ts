import nodeFetch from 'node-fetch';
import { createFetchClient } from '@energon/fetch-client';
import { createApiConsumer } from '@energon/rest-api-consumer';
import { defineAPI } from '@energon/rest-api-definition';
// import { ColleagueBody, ColleagueResponse } from "./colleague-types";
import { LocationResponse } from './location-types';
import { MarkApiCall } from '@energon/splunk-logger';
import {
  ClientTokenIssueBody,
  UserScopeToken,
  UserRefreshTokenBody,
  UserTokenExchangeBody,
  ClientScopeToken,
} from './identity-types';

export const getIdentityApi = (
  baseHeaders: Record<string, () => string>,
  baseUrl: string,
  path: string,
  markApiCall: MarkApiCall,
) => {
  const censoredMarkApiCall: MarkApiCall = ({ requestUrl, traceId, params }) =>
    markApiCall({
      requestUrl,
      traceId,
      params,
      requestBody: '[hidden due to sensitive information]',
    });

  const fetchClient = createFetchClient({
    fetchFn: nodeFetch as any,
    baseUrl,
    baseHeaders,
    markApiCall: censoredMarkApiCall,
  });
  const identityApiDef = defineAPI((endpoint) => ({
    exchangeUserToken: endpoint.post(path).body<UserTokenExchangeBody>().response<UserScopeToken>().build(),

    refreshUserToken: endpoint.post(path).body<UserRefreshTokenBody>().response<UserScopeToken>().build(),

    issueToken: endpoint.post(path).body<ClientTokenIssueBody>().response<ClientScopeToken>().build(),
  }));
  return createApiConsumer(identityApiDef, fetchClient);
};

// export const getColleagueApi = (
//   baseHeaders: Record<string, () => string>,
//   baseUrl: string,
//   path: string,
//   markApiCall: MarkApiCall,
// ) => {
//   const fetchClient = createFetchClient({
//     fetchFn: nodeFetch as any,
//     baseUrl,
//     baseHeaders,
//     markApiCall,
//   });
//   const colleagueApiDef = defineAPI((endpoint) => ({
//     call: endpoint
//       .post(path)
//       .body<ColleagueBody>()
//       .response<ColleagueResponse>()
//       .build(),
//   }));
//   return createApiConsumer(colleagueApiDef, fetchClient).call;
// };

export const getLocationApi = (
  baseHeaders: Record<string, () => string>,
  baseUrl: string,
  path: string,
  markApiCall: MarkApiCall,
) => {
  const fetchClient = createFetchClient({
    fetchFn: nodeFetch as any,
    baseUrl,
    baseHeaders,
    markApiCall,
  });
  const locationApiDef = defineAPI((endpoint) => ({
    call: endpoint.get(path).params<{ locationUUID: string; fields: string }>().response<LocationResponse>().build(),
  }));
  return createApiConsumer(locationApiDef, fetchClient).call;
};
