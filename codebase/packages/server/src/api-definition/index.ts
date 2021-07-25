import { ApiDefinition, defineAPI, EndpointDefinition } from '@energon/rest-api-definition';

import {
  cmsEmojisApiDef,
  cmsPostsApiDef,
  cmsRoutingApiDef,
  cmsEventsApiDef,
  cmsNetworksApiDef,
  cmsOrganizationsApiDef,
  cmsEmotionsApiDef,
} from '@dni-connectors/colleague-cms-api';

export const prefixApi = <T extends ApiDefinition>(prefix: string, apiDef: T): T => {
  const result: T = {} as T;
  for (const k in apiDef) {
    const api = apiDef[k];
    Object.assign(result, { [k]: { ...api, path: `${prefix}${api.path}` } });
  }

  return result;
};

export const mutateApi = <T extends ApiDefinition>(
  apiDef: T,
  mutator: (a: EndpointDefinition) => EndpointDefinition,
): T => {
  const result: T = {} as T;
  for (const k in apiDef) {
    const api = apiDef[k] as EndpointDefinition;
    Object.assign(result, { [k]: mutator(api) });
  }

  return result;
};

export const apiDefinition = defineAPI(() => ({
  ...prefixApi('/cms/v1', cmsEmojisApiDef),
  ...prefixApi('/cms/v1', cmsPostsApiDef),
  ...prefixApi('/cms/v1', cmsRoutingApiDef),
  ...prefixApi('/cms/v1', cmsEventsApiDef),
  ...prefixApi('/cms/v1', cmsNetworksApiDef),
  ...prefixApi('/cms/v1', cmsOrganizationsApiDef),
  ...prefixApi('/cms/v1', cmsEmotionsApiDef),
}));
