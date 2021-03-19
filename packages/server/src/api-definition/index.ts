import { defineAPI } from '@energon/rest-api-definition';

import {
  cmsEmojisApiDef,
  cmsPostsApiDef,
  cmsRoutingApiDef,
  cmsEventsApiDef,
  cmsNetworksApiDef,
  cmsOrganizationsApiDef,
  cmsEmotionsApiDef,
} from '@dni-connectors/colleague-cms-api';

export const apiDefinition = defineAPI(() => ({
  ...cmsEmojisApiDef,
  ...cmsPostsApiDef,
  ...cmsRoutingApiDef,
  ...cmsEventsApiDef,
  ...cmsNetworksApiDef,
  ...cmsOrganizationsApiDef,
  ...cmsEmotionsApiDef,
  // TODO: define others API endpoints
}));
