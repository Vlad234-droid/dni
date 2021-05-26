import { createApiRouter, ContextProvider } from '@energon/rest-api-provider';
import {
  cmsEmojisApiConnector,
  cmsEventsApiConnector,
  cmsPostsApiConnector,
  cmsRoutingApiConnector,
  cmsNetworksApiConnector,
  cmsOrganizationsApiConnector,
  cmsEmotionsApiConnector,
  cmsUploadApiConnector,
  TENANT_KEY as tenantkey,
} from '@dni-connectors/colleague-cms-api';

import { apiDefinition } from '../api-definition';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const api = (requestCtx: ContextProvider<any>) =>
  createApiRouter(
    apiDefinition,
    requestCtx,
  )({
    // Emojis
    getEmoji: ({ params }, ctx) => {
      return cmsEmojisApiConnector(ctx)
        .getEmoji({ params, tenantkey })
        .then(unsafelyUnpackResponseData);
    },
    getEmojis: ({ params }, ctx) => {
      return cmsEmojisApiConnector(ctx)
        .getEmojis({
          params,
          tenantkey,
        })
        .then(unsafelyUnpackResponseData);
    },

    // Emotions
    postEmotion: ({ params, body }, ctx) => {
      return cmsEmotionsApiConnector(ctx)
        .postEmotion({
          params,
          tenantkey,
          body,
        })
        .then(unsafelyUnpackResponseData);
    },
    putEmotion: ({ params, body }, ctx) => {
      return cmsEmotionsApiConnector(ctx)
        .putEmotion({
          params,
          tenantkey,
          body,
        })
        .then(unsafelyUnpackResponseData);
    },
    deleteEmotion: ({ params }, ctx) => {
      return cmsEmotionsApiConnector(ctx)
        .deleteEmotion({ params, tenantkey })
        .then(unsafelyUnpackResponseData);
    },

    // Posts
    getPost: ({ params }, ctx) => {
      return cmsPostsApiConnector(ctx)
        .getPost({ params, tenantkey })
        .then(unsafelyUnpackResponseData);
    },
    getPosts: ({ params }, ctx) => {
      return cmsPostsApiConnector(ctx)
        .getPosts({
          params,
          tenantkey,
        })
        .then(unsafelyUnpackResponseData);
    },
    getPostsCount: ({ params }, ctx) => {
      return cmsPostsApiConnector(ctx)
        .getPostsCount({ params, tenantkey })
        .then(unsafelyUnpackResponseData);
    },
    postPost: ({ params, body }, ctx) => {
      return cmsPostsApiConnector(ctx)
        .postPost({
          params,
          tenantkey,
          body,
        })
        .then(unsafelyUnpackResponseData);
    },
    putPost: ({ params, body }, ctx) => {
      return cmsPostsApiConnector(ctx)
        .putPost({
          params,
          tenantkey,
          body,
        })
        .then(unsafelyUnpackResponseData);
    },
    deletePost: ({ params }, ctx) => {
      return cmsPostsApiConnector(ctx)
        .deletePost({ params, tenantkey })
        .then(unsafelyUnpackResponseData);
    },

    // Events
    getEvent: ({ params }, ctx) => {
      return cmsEventsApiConnector(ctx)
        .getEvent({ params, tenantkey })
        .then(unsafelyUnpackResponseData);
    },
    getEvents: ({ params }, ctx) => {
      return cmsEventsApiConnector(ctx)
        .getEvents({
          params,
          tenantkey,
        })
        .then(unsafelyUnpackResponseData);
    },
    getEventsCount: ({ params }, ctx) => {
      return cmsEventsApiConnector(ctx)
        .getEventsCount({ params, tenantkey })
        .then(unsafelyUnpackResponseData);
    },
    postEvent: ({ params, body }, ctx) => {
      return cmsEventsApiConnector(ctx)
        .postEvent({
          params,
          tenantkey,
          body,
        })
        .then(unsafelyUnpackResponseData);
    },
    putEvent: ({ params, body }, ctx) => {
      return cmsEventsApiConnector(ctx)
        .putEvent({
          params,
          tenantkey,
          body,
        })
        .then(unsafelyUnpackResponseData);
    },
    deleteEvent: ({ params }, ctx) => {
      return cmsEventsApiConnector(ctx)
        .deleteEvent({ params, tenantkey })
        .then(unsafelyUnpackResponseData);
    },

    // Networks
    getNetwork: ({ params }, ctx) => {
      return cmsNetworksApiConnector(ctx)
        .getNetwork({ params, tenantkey })
        .then(unsafelyUnpackResponseData);
    },
    getNetworks: ({ params }, ctx) => {
      return cmsNetworksApiConnector(ctx)
        .getNetworks({
          params,
          tenantkey,
        })
        .then(unsafelyUnpackResponseData);
    },
    getNetworksCount: ({ params }, ctx) => {
      return cmsNetworksApiConnector(ctx)
        .getNetworksCount({ params, tenantkey })
        .then(unsafelyUnpackResponseData);
    },
    postNetwork: ({ params, body }, ctx) => {
      return cmsNetworksApiConnector(ctx)
        .postNetwork({
          params,
          tenantkey,
          body,
        })
        .then(unsafelyUnpackResponseData);
    },
    putNetwork: ({ params, body }, ctx) => {
      return cmsNetworksApiConnector(ctx)
        .putNetwork({
          params,
          tenantkey,
          body,
        })
        .then(unsafelyUnpackResponseData);
    },
    deleteNetwork: ({ params }, ctx) => {
      return cmsNetworksApiConnector(ctx)
        .deleteNetwork({ params, tenantkey })
        .then(unsafelyUnpackResponseData);
    },

    // Routing
    getRoutingConfig: (_, ctx) => {
      return cmsRoutingApiConnector(ctx)
        .getRoutingConfig(tenantkey)
        .then(unsafelyUnpackResponseData);
    },

    // Organizations
    getOrganization: ({ params }, ctx) => {
      return cmsOrganizationsApiConnector(ctx)
        .getOrganization({ params, tenantkey })
        .then(unsafelyUnpackResponseData);
    },
    getOrganizations: ({ params }, ctx) => {
      return cmsOrganizationsApiConnector(ctx)
        .getOrganizations({
          params,
          tenantkey,
        })
        .then(unsafelyUnpackResponseData);
    },
    postOrganization: ({ params, body }, ctx) => {
      return cmsOrganizationsApiConnector(ctx)
        .postOrganization({
          params,
          tenantkey,
          body,
        })
        .then(unsafelyUnpackResponseData);
    },
    putOrganization: ({ params, body }, ctx) => {
      return cmsOrganizationsApiConnector(ctx)
        .putOrganization({
          params,
          tenantkey,
          body,
        })
        .then(unsafelyUnpackResponseData);
    },
    deleteOrganization: ({ params }, ctx) => {
      return cmsOrganizationsApiConnector(ctx)
        .deleteOrganization({ params, tenantkey })
        .then(unsafelyUnpackResponseData);
    },

    // Upload
    getFile: ({ params }, ctx) => {
      return cmsUploadApiConnector(ctx)
        .getFile({ params, tenantkey })
        .then(unsafelyUnpackResponseData);
    },
    getFiles: ({ params }, ctx) => {
      return cmsUploadApiConnector(ctx)
        .getFiles({
          params,
          tenantkey,
        })
        .then(unsafelyUnpackResponseData);
    },
    postFiles: ({ params, body }, ctx) => {
      return cmsUploadApiConnector(ctx)
        .postFiles({
          params,
          tenantkey,
          body,
        })
        .then(unsafelyUnpackResponseData);
    },
    deleteFile: ({ params }, ctx) => {
      return cmsUploadApiConnector(ctx)
        .deleteFile({ params, tenantkey })
        .then(unsafelyUnpackResponseData);
    },
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiMiddleware = <T extends ContextProvider<any>>(context: T) =>
  api(context);

const unsafelyUnpackResponseData = <T>(res: { data: T }) => res.data;
