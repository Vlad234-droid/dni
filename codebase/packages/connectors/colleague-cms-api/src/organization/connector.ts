import { defineAPI } from '@energon/rest-api-definition';

import { Organization, OrganizationApiParams, OrganizationBody } from './types';
import { buildApiConsumer, buildParams } from '../utils';
import { DniCmsApiContext, ApiInput } from '../types';

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

export const cmsOrganizationsApiConnector = (ctx: DniCmsApiContext) => {
  const apiConsumer = buildApiConsumer(ctx, cmsOrganizationsApiDef);

  return {
    getOrganization: async ({
      params,
    }: ApiInput<OrganizationApiParams>) =>
      apiConsumer.getOrganization(buildParams(params)),

    getOrganizations: ({
      params,
    }: ApiInput<Omit<OrganizationApiParams, 'id'>>) =>
      apiConsumer.getOrganizations(buildParams(params)),

    postOrganization: async ({
      params,
      body,
    }: ApiInput<OrganizationApiParams, OrganizationBody>) =>
      apiConsumer.postOrganization(buildParams(params, body!)),

    putOrganization: async ({
      params,
      body,
    }: ApiInput<OrganizationApiParams, OrganizationBody>) =>
      apiConsumer.putOrganization(buildParams(params, body!)),

    deleteOrganization: ({
      params,
    }: ApiInput<Pick<OrganizationApiParams, 'id'>>) =>
      apiConsumer.deleteOrganization(buildParams(params)),
  };
};

export type CmsOrganizationsApi = ReturnType<
  typeof cmsOrganizationsApiConnector
>;
