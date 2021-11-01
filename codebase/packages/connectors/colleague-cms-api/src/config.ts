import { ApiUrlConfig } from '@energon-connectors/core';

const COLLEAGUE_CMS_API_URLS: ApiUrlConfig = {
  LOCAL: '/colleague-cms',
  PPE: 'http://localhost:1337',
  PROD: 'https://ourtesco.com/colleague-cms',
};

const COLLEAGUE_CMS_TENANT_KEY = 'DiversityAndInclusion';

export { COLLEAGUE_CMS_API_URLS, COLLEAGUE_CMS_TENANT_KEY };
