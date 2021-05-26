import { fetchClient, resolveBaseUrl } from '@energon-connectors/core';
import { createApiConsumer } from '@energon/rest-api-consumer';
import {
  ApiDefinition,
  EndpointDefinition,
} from '@energon/rest-api-definition';
import qs from 'qs';
import merge from 'lodash.merge';

import { DNI_CMS_API_URLS } from './config';
import { DniCmsApiContext } from './types';

const buildApiConsumer = <T extends ApiDefinition>(
  ctx: DniCmsApiContext,
  apiDef: T,
) => {
  const client = buildClient(ctx);
  return createApiConsumer(apiDef, client);
};

const buildClient = (ctx: DniCmsApiContext) => {
  const baseUrl =
    process.env.COLLEAGUE_CMS_URL || resolveBaseUrl(DNI_CMS_API_URLS, ctx);
  const headers = {
    Auth: () => `Bearer ${ctx.identityClientToken()}`,
  };

  return fetchClient(baseUrl, headers, ctx);
};

const buildParams = <T, U = unknown>(
  params: T,
  tenantkey: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: U = undefined as any,
) => ({
  params,
  fetchOpts: { headers: { tenantkey } },
  body,
});

const buildFetchParams = <U = unknown>(
  tenantkey: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: U = undefined as any,
  fetchParams = {},
) =>
  merge(
    {
      headers: { tenantkey },
      body,
    },
    fetchParams,
  );

const buildFetchClient = (ctx: DniCmsApiContext) => {
  const client = buildClient(ctx);

  return <T, U = unknown>(
    def: EndpointDefinition,
    qsParams: U,
    fetchParams = {},
  ) => {
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

export {
  buildApiConsumer,
  buildParams,
  buildClient,
  buildFetchParams,
  buildFetchClient,
};
