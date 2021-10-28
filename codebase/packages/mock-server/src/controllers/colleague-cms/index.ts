import express from 'express';

import { COLLEAGUE_CMS_API_URLS } from '@dni-connectors/colleague-cms-api';

import { cmsPostsApiRouter } from './post';
import { cmsOrganizationsApiRouter } from './organization';
import { cmsNetworksApiRouter } from './network';
import { cmsEventsApiRouter } from './event';
import { cmsUploadApiRouter } from './upload';

const API_PATH = COLLEAGUE_CMS_API_URLS.LOCAL;

export const colleagueCmsApiRouter = express
  .Router()
  .use(API_PATH, cmsPostsApiRouter)
  .use(API_PATH, cmsOrganizationsApiRouter)
  .use(API_PATH, cmsNetworksApiRouter)
  .use(API_PATH, cmsEventsApiRouter)
  .use(API_PATH, cmsUploadApiRouter)
