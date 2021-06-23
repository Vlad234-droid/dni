import { defineAPI } from '@energon/rest-api-definition';

import {
  cmsEmojisApiDef,
  cmsPostsApiDef,
  cmsRoutingApiDef,
  cmsEventsApiDef,
  cmsNetworksApiDef,
  cmsOrganizationsApiDef,
  cmsEmotionsApiDef,
  cmsUploadApiDef,
} from '@dni-connectors/colleague-cms-api';

import { contactApiDef } from '@dni-connectors/contact-api';

export const apiDefinition = defineAPI(() => ({
  ...cmsEmojisApiDef,
  ...cmsPostsApiDef,
  ...cmsRoutingApiDef,
  ...cmsEventsApiDef,
  ...cmsNetworksApiDef,
  ...cmsOrganizationsApiDef,
  ...cmsEmotionsApiDef,
  ...cmsUploadApiDef,
  ...contactApiDef,
  // TODO: define others API endpoints
}));
