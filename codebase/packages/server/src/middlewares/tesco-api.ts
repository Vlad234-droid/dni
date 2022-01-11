import { createApiRouter, ContextProvider } from '@energon/rest-api-provider';
import {
  cmsEmojisApiConnector,
  cmsEventsApiConnector,
  cmsPostsApiConnector,
  cmsNetworksApiConnector,
  cmsOrganizationsApiConnector,
  cmsReactionsApiConnector,
} from '@dni-connectors/colleague-cms-api';

import { apiDefinition } from '../api-definition';

const unsafelyUnpackResponseData = <T>(res: { data: T }) => res.data;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tescoApi = (requestCtx: ContextProvider<any>) =>
  createApiRouter(
    apiDefinition,
    requestCtx,
  )({
    // Colleague CMS: Emojis
    getEmoji: async ({ params }, ctx) => {
      const res = await cmsEmojisApiConnector(ctx).getEmoji({ params });
      return unsafelyUnpackResponseData(res);
    },
    getEmojis: async ({ params }, ctx) => {
      const res = await cmsEmojisApiConnector(ctx).getEmojis({ params });
      return unsafelyUnpackResponseData(res);
    },

    // Colleague CMS: Reactions
    getReactionsCount: async ({ params }, ctx) => {
      const res = await cmsReactionsApiConnector(ctx).getReactionsCount({ params });
      return unsafelyUnpackResponseData(res);
    },
    getReactions: async ({ params }, ctx) => {
      const res = await cmsReactionsApiConnector(ctx).getReactions({ params });
      return unsafelyUnpackResponseData(res);
    },
    postReaction: async ({ body }, ctx) => {
      const res = await cmsReactionsApiConnector(ctx).postReaction({ body });
      return unsafelyUnpackResponseData(res);
    },
    deleteReaction: async ({ params }, ctx) => {
      const res = await cmsReactionsApiConnector(ctx).deleteReaction({ params });
      return unsafelyUnpackResponseData(res);
    },

    // Colleague CMS: Posts
    getPost: async ({ params }, ctx) => {
      const res = await cmsPostsApiConnector(ctx).getPost({ params });
      return unsafelyUnpackResponseData(res);
    },
    getPosts: async ({ params }, ctx) => {
      const res = await cmsPostsApiConnector(ctx).getPosts({ params });
      return unsafelyUnpackResponseData(res);
    },
    getPostsCount: async ({ params }, ctx) => {
      const res = await cmsPostsApiConnector(ctx).getPostsCount({ params });
      return unsafelyUnpackResponseData(res);
    },
    postPost: async ({ params, body }, ctx) => {
      const res = await cmsPostsApiConnector(ctx).postPost({ params, body });
      return unsafelyUnpackResponseData(res);
    },
    putPost: async ({ params, body }, ctx) => {
      const res = await cmsPostsApiConnector(ctx).putPost({ params, body });
      return unsafelyUnpackResponseData(res);
    },
    deletePost: async ({ params }, ctx) => {
      const res = await cmsPostsApiConnector(ctx).deletePost({ params });
      return unsafelyUnpackResponseData(res);
    },

    // Colleague CMS: Events
    getEvent: async ({ params }, ctx) => {
      const res = await cmsEventsApiConnector(ctx).getEvent({ params });
      return unsafelyUnpackResponseData(res);
    },
    getEvents: async ({ params }, ctx) => {
      const res = await cmsEventsApiConnector(ctx).getEvents({ params });
      return unsafelyUnpackResponseData(res);
    },
    getEventsCount: async ({ params }, ctx) => {
      const res = await cmsEventsApiConnector(ctx).getEventsCount({ params });
      return unsafelyUnpackResponseData(res);
    },
    postEvent: async ({ params, body }, ctx) => {
      const res = await cmsEventsApiConnector(ctx).postEvent({ params, body });
      return unsafelyUnpackResponseData(res);
    },
    putEvent: async ({ params, body }, ctx) => {
      const res = await cmsEventsApiConnector(ctx).putEvent({ params, body });
      return unsafelyUnpackResponseData(res);
    },
    deleteEvent: async ({ params }, ctx) => {
      const res = await cmsEventsApiConnector(ctx).deleteEvent({ params });
      return unsafelyUnpackResponseData(res);
    },

    // Colleague CMS: Networks
    getNetwork: async ({ params }, ctx) => {
      const res = await cmsNetworksApiConnector(ctx).getNetwork({ params });
      return unsafelyUnpackResponseData(res);
    },
    getNetworks: async ({ params }, ctx) => {
      const res = await cmsNetworksApiConnector(ctx).getNetworks({ params });
      return unsafelyUnpackResponseData(res);
    },
    getNetworksCount: async ({ params }, ctx) => {
      const res = await cmsNetworksApiConnector(ctx).getNetworksCount({ params });
      return unsafelyUnpackResponseData(res);
    },
    postNetwork: async ({ params, body }, ctx) => {
      const res = await cmsNetworksApiConnector(ctx).postNetwork({ params, body });
      return unsafelyUnpackResponseData(res);
    },
    putNetwork: async ({ params, body }, ctx) => {
      const res = await cmsNetworksApiConnector(ctx).putNetwork({ params, body });
      return unsafelyUnpackResponseData(res);
    },
    deleteNetwork: async ({ params }, ctx) => {
      const res = await cmsNetworksApiConnector(ctx).deleteNetwork({ params });
      return unsafelyUnpackResponseData(res);
    },

    // Colleague CMS: Organizations
    getOrganization: async ({ params }, ctx) => {
      const res = await cmsOrganizationsApiConnector(ctx).getOrganization({ params });
      return unsafelyUnpackResponseData(res);
    },
    getOrganizations: async ({ params }, ctx) => {
      const res = await cmsOrganizationsApiConnector(ctx).getOrganizations({ params });
      return unsafelyUnpackResponseData(res);
    },
    postOrganization: async ({ params, body }, ctx) => {
      const res = await cmsOrganizationsApiConnector(ctx).postOrganization({ params, body });
      return unsafelyUnpackResponseData(res);
    },
    putOrganization: async ({ params, body }, ctx) => {
      const res = await cmsOrganizationsApiConnector(ctx).putOrganization({ params, body });
      return unsafelyUnpackResponseData(res);
    },
    deleteOrganization: async ({ params }, ctx) => {
      const res = await cmsOrganizationsApiConnector(ctx).deleteOrganization({ params });
      return unsafelyUnpackResponseData(res);
    },
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tescoApiMiddleware = <T extends ContextProvider<any>>(context: T) => tescoApi(context);
