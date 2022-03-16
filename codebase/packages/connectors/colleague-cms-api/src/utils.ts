import { fetchClient, resolveBaseUrl } from '@energon-connectors/core';
import { createApiConsumer } from '@energon/rest-api-consumer';
import { ApiDefinition, EndpointDefinition } from '@energon/rest-api-definition';
import qs from 'qs';
import merge from 'lodash.merge';

import { COLLEAGUE_CMS_API_URLS, DEFAULT_COLLEAGUE_CMS_TENANT_KEY } from './config';
import { ColleagueCmsApiContext, ColleagueCmsApiHeaders } from './types';
import { SimpleFetchClient } from '@energon/fetch-client';


const failoverConfig = <T>(func: (() => T | undefined) | undefined, defaultValue: T) => {
  return () => {
    let result: T | undefined = undefined;
    if (func && typeof func === 'function') {
      result = func();
    }
    return result || defaultValue;
  };
}

export const buildApiConsumer = <T extends ApiDefinition>(ctx: ColleagueCmsApiContext, apiDef: T) => {
  const client = buildClient(ctx);
  return createApiConsumer(apiDef, client);
};

export const buildClient = (ctx: ColleagueCmsApiContext): SimpleFetchClient => {
  const baseUrl = failoverConfig(ctx.config()?.colleagueCmsBaseUrl, resolveBaseUrl(COLLEAGUE_CMS_API_URLS, ctx));
  const tenantKey = failoverConfig(ctx.config()?.colleagueCmsTenantKey, DEFAULT_COLLEAGUE_CMS_TENANT_KEY);
  const auth = () => `Bearer ${ctx.identityClientToken()}`;

  const headers: ColleagueCmsApiHeaders = {
    Auth: auth,
    TenantKey: tenantKey,
  };

  return fetchClient(baseUrl(), headers, { });
}

export const buildParams = <T, U = unknown>(
  params: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: U = undefined as any,
) => {
  return {
    params,
    body,
  };
};

export const buildFetchParams = <U = unknown>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: U = undefined as any,
  fetchParams = {},
) => {
  return merge(
    { body },
    fetchParams,
  );
};

export const buildFetchClient = (ctx: ColleagueCmsApiContext) => {
  const client = buildClient(ctx);

  return async <T, U = unknown>(def: EndpointDefinition, qsParams: U, fetchParams = {}) => {
    const { path: defPath, method } = def;
    const queryString = qs.stringify(qsParams);
    const path = queryString ? `${defPath}?${queryString}` : defPath;

    return await client
      .fetch<T>(path, { method, ...fetchParams })
      .then((r) => r.json())
      .then((r) => ({ data: r as T }));
  };
};
