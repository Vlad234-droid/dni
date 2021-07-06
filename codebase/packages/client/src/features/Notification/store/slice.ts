import store from 'store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Loading from 'types/loading';

import API from 'utils/api';

import * as T from '../config/types';
import * as A from './actionTypes';
// import * as S from './serializer';
import { notificationSelector } from './selectors';

const initialState: T.State = {
  notifications: {
    list: [],
    metadata: { loading: Loading.IDLE },
  },
  networkNotifications: {
    list: [],
    metadata: { loading: Loading.IDLE },
  },
  isSidebarOpened: false,
};

// const fetchEntities = async (ids: number[], entities: 'events' | 'posts' | 'networks') => {
//   return ids.length > 0
//     ? await API[entities].fetchAll<T.Entity[]>({
//         _start: 0,
//         _limit: ids.length,
//         id_in: ids,
//       })
//     : [];
// };

// const getEntity = (
//   entityType: T.EntityType,
//   entityId: number,
//   networks: T.Entity[] = [],
//   events: T.Entity[] = [],
//   posts: T.Entity[] = [],
// ): T.Entity | undefined => {
//   switch (entityType) {
//     case T.EntityType.POST:
//       return posts.find((e) => e.id == entityId);
//     case T.EntityType.EVENT:
//       return events.find((e) => e.id == entityId);
//     case T.EntityType.NETWORK:
//       return networks.find((e) => e.id == entityId);
//     default:
//       return;
//   }
// };

const getList = createAsyncThunk<T.Notification[]>(A.GET_LIST_ACTION, async () => {
  const list = await API.notifications.fetchAll<T.Notification[]>();

  // const { networkIds, eventIds, postIds } = list.reduce(
  //   (acc, n) => {
  //     const networkIds = new Set(acc.networkIds);
  //     const eventIds = new Set(acc.eventIds);
  //     const postIds = new Set(acc.postIds);

  //     if (n.entityType == T.EntityType.EVENT) {
  //       eventIds.add(n.entityId);
  //     }

  //     if (n.parentType == T.EntityType.EVENT) {
  //       eventIds.add(n.parentId);
  //     }

  //     if (n.entityType == T.EntityType.POST) {
  //       postIds.add(n.entityId);
  //     }

  //     if (n.parentType == T.EntityType.NETWORK) {
  //       networkIds.add(n.parentId);
  //     }

  //     return {
  //       networkIds: Array.from(networkIds),
  //       eventIds: Array.from(eventIds),
  //       postIds: Array.from(postIds),
  //     };
  //   },
  //   { networkIds: [], eventIds: [], postIds: [] } as T.EntityIds,
  // );

  // const networks = await fetchEntities(networkIds, 'networks');
  // const events = await fetchEntities(eventIds, 'events');
  // const posts = await fetchEntities(postIds, 'posts');

  // return list.map((i) => ({
  //   ...i,
  //   entity: getEntity(i.entityType, i.entityId, networks, events, posts),
  //   parent: getEntity(i.parentType, i.parentId, networks, events, posts),
  // }));

  return list;
});

const getListGroupByNetwork = createAsyncThunk<T.NetworkNotification[]>(A.GET_LIST_NETWORKS_ACTION, async () => {
  const list = await API.notifications.fetchAllGroupByNetwork<T.NetworkNotification[]>();

  // const networkIds = list
  //   .filter((nn) => nn.parentId !== null)
  //   .reduce((acc, nn) => [...acc, nn.parentId], [] as number[]);

  // const networks = await fetchEntities(networkIds, 'networks');

  // return list.map((nn) => ({
  //   ...nn,
  //   parent: getEntity(nn.parentType, nn.parentId, networks),
  // }));

  return list;
});

const acknowledge = createAsyncThunk<T.Acknowledge | undefined, T.AcknowledgePayload>(
  A.ACKNOWLEDGE_ACTION,
  async (data) => {
    const entity = notificationSelector(store.getState(), data);

    if (!entity) {
      return;
    }

    return await API.notifications.acknowledge<T.Acknowledge>(data);
  },
);

const slice = createSlice({
  name: A.ROOT,
  initialState,
  reducers: {
    clear(state) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
    },
    toggleSidebar(state) {
      state.isSidebarOpened = !state.isSidebarOpened;
    },
    hideSidebar(state) {
      state.isSidebarOpened = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state: T.State) => {
        state.notifications.metadata.loading = Loading.PENDING;
      })
      .addCase(getList.fulfilled, (state: T.State, action) => {
        state.notifications.list = action.payload;
        state.notifications.metadata.loading = Loading.SUCCEEDED;
      })
      .addCase(getList.rejected, (state: T.State, action) => {
        state.notifications.metadata.loading = Loading.FAILED;
        state.notifications.metadata.error = (action.payload as T.Error).error.message;
      })
      .addCase(getListGroupByNetwork.pending, (state: T.State) => {
        state.networkNotifications.metadata.loading = Loading.PENDING;
      })
      .addCase(getListGroupByNetwork.fulfilled, (state: T.State, action) => {
        state.networkNotifications.list = action.payload;
        state.networkNotifications.metadata.loading = Loading.SUCCEEDED;
      })
      .addCase(getListGroupByNetwork.rejected, (state: T.State, action) => {
        state.networkNotifications.metadata.loading = Loading.FAILED;
        state.networkNotifications.metadata.error = (action.payload as T.Error).error.message;
      })
      .addCase(acknowledge.pending, (state: T.State) => {
        state.networkNotifications.metadata.loading = Loading.PENDING;
        state.notifications.metadata.loading = Loading.PENDING;
      })
      .addCase(acknowledge.fulfilled, (state: T.State, action) => {
        const acknowledge: T.Acknowledge | undefined = action.payload;

        state.notifications.metadata.loading = Loading.SUCCEEDED;
        state.networkNotifications.metadata.loading = Loading.SUCCEEDED;

        if (!acknowledge) {
          return state;
        }

        state.networkNotifications.list = state.networkNotifications.list
          .map((nn) => ({
            ...nn,
            count:
              nn.entitiesIds.includes(acknowledge?.acknowledgeEntityId) &&
              nn.entityType == acknowledge?.acknowledgeEntityType
                ? nn.count - 1
                : nn.count,
          }))
          .filter((nn) => nn.count > 0);

        state.notifications.list = state.notifications.list.filter(
          (n) => n.entityId != acknowledge?.acknowledgeEntityId && n.entityType == acknowledge?.acknowledgeEntityType,
        );
      })
      .addDefaultCase((state) => state);
  },
});

const { clear, toggleSidebar, hideSidebar } = slice.actions;

export { getList, getListGroupByNetwork, acknowledge, clear, toggleSidebar, hideSidebar };

export default slice.reducer;
