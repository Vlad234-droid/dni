import { defineAPI } from '@energon/rest-api-definition';

import { Organization, OrganizationApiParams, OrganizationBody } from './types';
import { buildApiConsumer, buildParams } from '../utils';
import { ColleagueCmsApiContext, ApiInput } from '../types';

export const cmsOrganizationsApiDef = defineAPI((endpoint) => ({
  getOrganization: endpoint
    .get('/organizations/:id')
    .params<Pick<OrganizationApiParams, 'id'>>()
    .response<Organization>()
    .build(),

  getOrganizations: endpoint
    .get('/organizations')
    .params<Omit<OrganizationApiParams, 'id'>>()
    .response<Organization[]>()
    .build(),

  postOrganization: endpoint
    .post('/organizations')
    .params<OrganizationApiParams>()
    .body<OrganizationBody>()
    .response<Organization>()
    .build(),

  putOrganization: endpoint
    .put('/organizations/:id')
    .params<Pick<OrganizationApiParams, 'id'>>()
    .body<OrganizationBody>()
    .response<Organization>()
    .build(),

  deleteOrganization: endpoint
    .delete('/organizations/:id')
    .params<Pick<OrganizationApiParams, 'id'>>()
    .response<Organization>()
    .build(),
}));

export const cmsOrganizationsApiConnector = (ctx: ColleagueCmsApiContext) => {
  const apiConsumer = buildApiConsumer(ctx, cmsOrganizationsApiDef);

  return {
    getOrganization: async ({ params }: ApiInput<OrganizationApiParams>) =>
      await apiConsumer.getOrganization(buildParams(params)),

    getOrganizations: async ({ params }: ApiInput<Omit<OrganizationApiParams, 'id'>>) =>
      await apiConsumer.getOrganizations(buildParams(params)),

    postOrganization: async ({ params, body }: ApiInput<OrganizationApiParams, OrganizationBody>) =>
      await apiConsumer.postOrganization(buildParams(params, body!)),

    putOrganization: async ({ params, body }: ApiInput<OrganizationApiParams, OrganizationBody>) =>
      await apiConsumer.putOrganization(buildParams(params, body!)),

    deleteOrganization: async ({ params }: ApiInput<Pick<OrganizationApiParams, 'id'>>) =>
      await apiConsumer.deleteOrganization(buildParams(params)),
  };
};

export type CmsOrganizationsApi = ReturnType<typeof cmsOrganizationsApiConnector>;
