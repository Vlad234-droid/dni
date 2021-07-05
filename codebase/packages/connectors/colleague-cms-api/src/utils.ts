import { fetchClient, resolveBaseUrl } from '@energon-connectors/core';
import { createApiConsumer } from '@energon/rest-api-consumer';
import { ApiDefinition, EndpointDefinition } from '@energon/rest-api-definition';
import qs from 'qs';
import merge from 'lodash.merge';

import { COLLEAGUE_CMS_API_URLS, COLLEAGUE_CMS_TENANT_KEY } from './config';
import { DniCmsApiContext } from './types';
import { SimpleFetchClient } from '@energon/fetch-client';

const buildApiConsumer = <T extends ApiDefinition>(ctx: DniCmsApiContext, apiDef: T) => {
  const client = buildClient(ctx);
  return createApiConsumer(apiDef, client);
};

function buildClient(ctx: DniCmsApiContext): SimpleFetchClient {
  const baseUrl = process.env.COLLEAGUE_CMS_URL || resolveBaseUrl(COLLEAGUE_CMS_API_URLS, ctx);
  const tenantkey = process.env.COLLEAGUE_CMS_TENANT_KEY || COLLEAGUE_CMS_TENANT_KEY;

  const headers = {
    Auth: () => `Bearer ${ctx.identityClientToken()}`,
    tenantkey,
  };

  return fetchClient(baseUrl, headers, ctx);
}

const buildParams = <T, U = unknown>(
  params: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: U = undefined as any,
) => ({
  params,
  body,
});

const buildFetchParams = <U = unknown>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: U = undefined as any,
  fetchParams = {},
) =>
  merge(
    {
      body,
    },
    fetchParams,
  );

const buildFetchClient = (ctx: DniCmsApiContext) => {
  const client = buildClient(ctx);

  return <T, U = unknown>(def: EndpointDefinition, qsParams: U, fetchParams = {}) => {
    const { path: defPath, method } = def;

    const queryString = qs.stringify(qsParams);

    const path = queryString ? `${defPath}?${queryString}` : defPath;

    return client
      .fetch<T>(path, {
        method,
        ...fetchParams,
      })
      .then((r) => r.json())
      .then((r) => ({ data: r as T }));
  };
};

export { buildApiConsumer, buildParams, buildClient, buildFetchParams, buildFetchClient };
