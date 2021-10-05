import nodeFetch from 'node-fetch';

import { createFetchClient } from '@energon/fetch-client';
import { createApiConsumer } from '@energon/rest-api-consumer';
import { defineAPI } from '@energon/rest-api-definition';
import { ClientTokenIssueBody, ClientScopeToken } from '@dni-connectors/onelogin';

import { getConfig } from '../config/config-accessor';
import { isPROD } from '../config/env';

const config = getConfig();

const identityApiDef = defineAPI((endpoint) => ({
  issueToken: endpoint
    .post('/identity/v4/issue-token/token')
    .body<ClientTokenIssueBody>()
    .response<ClientScopeToken>()
    .build(),
}));

const issueIdentityClientScopeToken = async () => {
  const identityClientId = config.identityClientId;
  const identityClientSecret = config.identityClientSecret;

  const isProduction = isPROD(config.runtimeEnvironment());
  const baseUrl = isProduction ? 'https://api.tesco.com' : 'https://api-ppe.tesco.com';

  const credentials = Buffer.from(`${identityClientId()}:${identityClientSecret()}`).toString('base64');
  const body: ClientTokenIssueBody = { grant_type: 'client_credentials' };
  const baseHeaders = {
    Authorization: () => `Basic ${credentials}`,
    Accept: () => 'application/vnd.tesco.identity.tokenresponse.v4claims+json',
  };

  const fetchClient = createFetchClient({
    fetchFn: nodeFetch as any,
    baseUrl,
    baseHeaders,
  });

  const api = createApiConsumer(identityApiDef, fetchClient);
  const { data } = await api.issueToken({ body });

  return data;
};

const [getCachedClientScopeToken, setCachedClientScopeToken, disposeCache] = ((): [
  () => ClientScopeToken | undefined,
  (newToken: ClientScopeToken, age: number) => void,
  () => void,
] => {
  let cashedClientScopeToken: ClientScopeToken | undefined = undefined;
  let timeoutHandle: NodeJS.Timeout | undefined = undefined;

  return [
    () => cashedClientScopeToken,
    (newCST, maxAge) => {
      cashedClientScopeToken = newCST;
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
        timeoutHandle = undefined;
      }

      timeoutHandle = setTimeout(() => {
        cashedClientScopeToken = undefined;
      }, maxAge);
    },
    () => timeoutHandle && clearTimeout(timeoutHandle),
  ];
})();

const getMaxAge = (claims: { exp: number | string }) => {
  if (!claims.exp || isNaN(Number(claims.exp))) return 0;

  const expiration = Number(claims.exp) * 1000;
  const now = new Date().getTime();
  return expiration - now;
};

/**
 * Robust utility to issue and return identity client scoped token
 * @returns identity client scoped token
 */
export const getIdentityClientScopeToken = async () => {
  let identityClientScopeToken = getCachedClientScopeToken();
  if (identityClientScopeToken) {
    // next is to refresh token asyncroniously before it expires
    const { exp } = identityClientScopeToken.claims;
    if (exp && !isNaN(Number(exp))) {
      const expiresIn = Math.abs(new Date().getTime() - exp * 1000);
      if (expiresIn < 2 * 60 * 1000) {
        // < 2 mins
        issueIdentityClientScopeToken().then((token) => {
          setCachedClientScopeToken(token, getMaxAge(token.claims));
        });
      }
    }

    return identityClientScopeToken;
  }

  identityClientScopeToken = await issueIdentityClientScopeToken();
  setCachedClientScopeToken(identityClientScopeToken, getMaxAge(identityClientScopeToken.claims));
  return identityClientScopeToken;
};

export const disposeIdentityClientScopeToken = () => {
  disposeCache();
};
