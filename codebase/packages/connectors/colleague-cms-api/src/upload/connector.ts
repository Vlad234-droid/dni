import { defineAPI } from '@energon/rest-api-definition';

import { UploadFile, UploadApiParams, UploadBody } from './types';
import { buildApiConsumer, buildParams, buildFetchClient, buildFetchParams } from '../utils';

import { DniCmsApiContext, ApiInput } from '../types';

export const cmsUploadApiDef = defineAPI((endpoint) => ({
  getFile: endpoint.get('/upload/files/:id').params<Pick<UploadApiParams, 'id'>>().response<UploadFile>().build(),

  getFiles: endpoint.get('/upload/files').params<UploadApiParams>().response<UploadFile[]>().build(),

  postFiles: endpoint.post('/upload').params<UploadApiParams>().body<UploadBody>().response<UploadFile[]>().build(),

  deleteFile: endpoint.delete('/upload/files/:id').params<Pick<UploadApiParams, 'id'>>().response<UploadFile>().build(),
}));

export const cmsUploadApiConnector = (ctx: DniCmsApiContext) => {
  const apiConsumer = buildApiConsumer(ctx, cmsUploadApiDef);
  const fetchClient = buildFetchClient(ctx);

  return {
    getFile: async ({ params }: ApiInput<UploadApiParams>) => await apiConsumer.getFile(buildParams(params)),

    getFiles: async ({ params }: ApiInput<UploadApiParams>) => await apiConsumer.getFiles(buildParams(params)),

    postFiles: async ({ body }: ApiInput<UploadApiParams, UploadBody>) =>
      await fetchClient<UploadFile[]>(
        cmsUploadApiDef.postFiles,
        {},
        buildFetchParams(body, {
          headers: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            'Content-Type': (body as any).getHeaders()['content-type'],
          },
        }),
      ),

    deleteFile: async ({ params }: ApiInput<Pick<UploadApiParams, 'id'>>) =>
      await apiConsumer.deleteFile(buildParams(params)),
  };
};

export type CmsFilesApi = ReturnType<typeof cmsUploadApiConnector>;
