import { createApiRouter, ContextProvider } from '@energon/rest-api-provider';
import {
  cmsEmojisApiConnector,
  cmsEventsApiConnector,
  cmsPostsApiConnector,
  cmsRoutingApiConnector,
  cmsNetworksApiConnector,
  cmsOrganizationsApiConnector,
  cmsEmotionsApiConnector,
  // cmsUploadApiConnector,
} from '@dni-connectors/colleague-cms-api';

import { v4 as uuidv4 } from 'uuid';

import { contactApiConnector } from '@dni-connectors/contact-api';
import { colleagueApiConnector } from '@dni-connectors/colleague-api';

import { apiDefinition } from '../api-definition';

const unsafelyUnpackResponseData = <T>(res: { data: T }) => res.data;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tescoApi = (requestCtx: ContextProvider<any>) =>
  createApiRouter(
    apiDefinition,
    requestCtx,
  )({
    // Colleague API (v1)
    // getColleague: async (payload, ctx) => {
    //   const res = await colleagueApiConnector(ctx).v1.getColleague(payload as any);
    //   return unsafelyUnpackResponseData(res);
    // },

    // // Colleague API (v2)
    // getColleagueV2: async ({ params }, ctx) => {
    //   const res = await colleagueApiConnector(ctx).v2.getColleague({ params });
    //   return unsafelyUnpackResponseData(res);
    // },
    // getColleaguesV2: async ({ params }, ctx) => {
    //   const res = await colleagueApiConnector(ctx).v2.getColleagues({ params });
    //   return unsafelyUnpackResponseData(res);
    // },

    // // Contact API
    // sendMessages: async (payload, ctx) => {
    //   const res = await contactApiConnector(ctx).sendMessages({ ...payload, traceId: uuidv4() });
    //   return unsafelyUnpackResponseData(res);
    // },
    // getEmailAddresses: async ({ params }, ctx) => {
    //   const res = await contactApiConnector(ctx).getEmailAddresses({ params, traceId: uuidv4() });
    //   return unsafelyUnpackResponseData(res);
    // },
    // updateEmailAddress: async (payload, ctx) => {
    //   const res = await contactApiConnector(ctx).updateEmailAddress({ ...payload, traceId: uuidv4() });
    //   return unsafelyUnpackResponseData(res);
    // },
    // createEmailAddress: async (payload, ctx) => {
    //   const res = await contactApiConnector(ctx).createEmailAddress({ ...payload, traceId: uuidv4() });
    //   return unsafelyUnpackResponseData(res);
    // },

    // Colleague CMS: Emojis
    getEmoji: async ({ params }, ctx) => {
      const res = await cmsEmojisApiConnector(ctx).getEmoji({ params });
      return unsafelyUnpackResponseData(res);
    },
    getEmojis: async ({ params }, ctx) => {
      const res = await cmsEmojisApiConnector(ctx).getEmojis({ params });
      return unsafelyUnpackResponseData(res);
    },

    // Colleague CMS: Emotions
    postEmotion: async ({ params, body }, ctx) => {
      const res = await cmsEmotionsApiConnector(ctx).postEmotion({ params, body });
      return unsafelyUnpackResponseData(res);
    },
    putEmotion: async ({ params, body }, ctx) => {
      const res = await cmsEmotionsApiConnector(ctx).putEmotion({ params, body });
      return unsafelyUnpackResponseData(res);
    },
    deleteEmotion: async ({ params }, ctx) => {
      const res = await cmsEmotionsApiConnector(ctx).deleteEmotion({ params });
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

    // Colleague CMS: Routing
    getRoutingConfig: async ({ params }, ctx) => {
      const res = await cmsRoutingApiConnector(ctx).getRoutingConfig({ params });
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

    // // Colleague CMS: Upload
    // getFile: async ({ params }, ctx) => {
    //   const res = await cmsUploadApiConnector(ctx).getFile({ params });
    //   return unsafelyUnpackResponseData(res);
    // },
    // getFiles: async ({ params }, ctx) => {
    //   const res = await cmsUploadApiConnector(ctx).getFiles({ params });
    //   return unsafelyUnpackResponseData(res);
    // },
    // postFiles: async ({ params, body }, ctx) => {
    //   const res = await cmsUploadApiConnector(ctx).postFiles({ params, body });
    //   return unsafelyUnpackResponseData(res);
    // },
    // deleteFile: async ({ params }, ctx) => {
    //   const res = await cmsUploadApiConnector(ctx).deleteFile({ params });
    //   return unsafelyUnpackResponseData(res);
    // },
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tescoApiMiddleware = <T extends ContextProvider<any>>(context: T) => tescoApi(context);
