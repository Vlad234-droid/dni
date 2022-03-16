import { identityApiConsumer, ClientTokenIssueBody, ClientTokenResponse } from '@dni-connectors/identity-api';

import { getConfig } from '../config/config-accessor';
import { isPROD } from '@dni-common/connector-utils';

const config = getConfig();

const issueIdentityClientScopeToken = async () => {
  const identityClientId = config.identityClientId;
  const identityClientSecret = config.identityClientSecret;

  const isProduction = isPROD(config.runtimeEnvironment());
  const baseUrl = isProduction ? 'https://api.tesco.com' : 'https://api-ppe.tesco.com';

  const credentials = Buffer.from(`${identityClientId()}:${identityClientSecret()}`).toString('base64');
  const baseHeaders = {
    Authorization: () => `Basic ${credentials}`,
    Accept: () => 'application/vnd.tesco.identity.tokenresponse.v4claims+json',
  };

  const api = identityApiConsumer({ 
    baseUrl, 
    baseHeaders, 
  });

  const body: ClientTokenIssueBody = { grant_type: 'client_credentials' };
  const data = await api.issueToken({ body });

  return data;
};

const [
  getCachedClientScopeToken, 
  setCachedClientScopeToken, 
  disposeCache
] = ((): [
  () => ClientTokenResponse | undefined,
  (newToken: ClientTokenResponse, age: number) => void,
  () => void,
] => {
  let cashedClientScopeToken: ClientTokenResponse | undefined = undefined;
  let timeoutHandle: NodeJS.Timeout | undefined = undefined;

  return [
    // getCachedClientScopeToken
    () => cashedClientScopeToken,

    // setCachedClientScopeToken
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

    // disposeCache
    () => {
      cashedClientScopeToken = undefined;
      timeoutHandle && clearTimeout(timeoutHandle)
    },
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
export const acquireIdentityClientScopeToken = async () => {
  let identityClientScopeToken = getCachedClientScopeToken();
  if (identityClientScopeToken) {
    // next is to refresh token asyncroniously before it expires
    const { exp } = identityClientScopeToken.claims;
    if (exp && !isNaN(Number(exp))) {
      const expiresIn = Math.abs(new Date().getTime() - exp * 1000);
      const twoMins = 2 * 60 * 1000; // gap 2 mins before expire time
      if (expiresIn < twoMins) {
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

process.on('beforeExit', () => { 
  console.log('Disposing issueIdentityClientScopeToken cache.');
  disposeCache(); 
});