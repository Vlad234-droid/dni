import { resolveBaseUrl, TESCO_API_URLS } from '@energon-connectors/core';

import { identityApiConsumer } from '@dni-connectors/identity-api';
import { getAppEnv } from '@dni-common/connector-utils';
import { ColleagueCmsApiContext } from '@dni-connectors/colleague-cms-api'

/**
 * 
 * @param config 
 * @returns 
 */
export const colleagueCmsContext = async (): Promise<ColleagueCmsApiContext> => {
  const identityApi = identityApiConsumer(buildIdentityApiConfig());

  const token = await identityApi.issueToken({ body: { grant_type: 'client_credentials' }});
  const apiEnv = () => getAppEnv(process.env.RUNTIME_ENV || 'ppe', process.env.MOCK_SERVER_URL);
  const colleagueCmsBaseUrl = () => process.env.COLLEAGUE_CMS_URL;
  const colleagueCmsTenantKey = () => process.env.COLLEAGUE_CMS_TENANT_KEY;
  
  return {
    identityClientToken: () => token?.access_token || '',
    apiEnv, 
    config: () => ({
      colleagueCmsBaseUrl,
      colleagueCmsTenantKey,
    })
  };
}

const buildIdentityApiConfig = () => {
  const identityClientId = process.env.IDENTITY_CLIENT_ID;
  const identityClientSecret = process.env.IDENTITY_CLIENT_SECRET;
  const credentials = Buffer.from(`${identityClientId}:${identityClientSecret}`).toString('base64');

  const apiEnv = () => getAppEnv(process.env.RUNTIME_ENV || 'ppe', process.env.MOCK_SERVER_URL);
  const baseUrl = resolveBaseUrl(TESCO_API_URLS, { apiEnv });

  const baseHeaders = {
    Authorization: () => `Basic ${credentials}`,
    Accept: () => 'application/vnd.tesco.identity.tokenresponse.v4claims+json',
  };

  return {
    baseUrl, 
    baseHeaders, 
  };
}
