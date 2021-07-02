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
import { colleagueApiDef } from '@dni-connectors/colleague-api';

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
  ...colleagueApiDef,
  // TODO: define others API endpoints
}));
