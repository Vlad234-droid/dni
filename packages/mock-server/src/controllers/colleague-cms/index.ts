import express from 'express';

import { COLLEAGUE_CMS_API_URLS } from '@dni-connectors/colleague-cms-api';

import { cmsPostsApiRouter } from './post';

const API_PATH = COLLEAGUE_CMS_API_URLS.LOCAL;

export const colleagueCmsApiRouter = express
  .Router()
  .use(API_PATH, cmsPostsApiRouter);
