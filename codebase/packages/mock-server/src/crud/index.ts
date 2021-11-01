import {
  generateNetwork,
  generateNetworks,
  generateEvent,
  generateEvents,
  generateOrganization,
  generateOrganizations,
  generatePost,
  generatePosts,
  generateUpload,
  generateUploads,
} from '../generators/colleague-cms';

import {
  Network,
  Event,
  Organization,
  Post,
  UploadFile,
} from '@dni-connectors/colleague-cms-api';
import { buildCRUD } from '../utils';

const buildNetworkCRUD = (size: number) =>
  buildCRUD<Network>(() => generateNetworks(size), generateNetwork);

const buildEventCRUD = (size: number) =>
  buildCRUD<Event>(() => generateEvents(size), generateEvent);

const buildOrganizationCRUD = (size: number) =>
  buildCRUD<Organization>(
    () => generateOrganizations(size),
    generateOrganization,
  );

const buildPostCRUD = (size: number) =>
  buildCRUD<Post>(() => generatePosts(size), generatePost);

const buildUploadCRUD = (size: number) =>
  buildCRUD<UploadFile>(() => generateUploads(size), generateUpload);

export {
  buildNetworkCRUD,
  buildEventCRUD,
  buildOrganizationCRUD,
  buildPostCRUD,
  buildUploadCRUD,
};
