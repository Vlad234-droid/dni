import { createEntityAdapter } from '@reduxjs/toolkit';

import { NotificationState } from './slice';
import { EntityType, NotificationView, GroupByEntityId } from '../config/types';

const notificationAdapter = createEntityAdapter<NotificationView>({
  selectId: (notification) => notification.id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const notificationItemsSelector = notificationAdapter.getSelectors<NotificationState>(
  (state) => state.all,
).selectAll;

const notificationItemSelector = notificationAdapter.getSelectors<NotificationState>(
  (state) => state.all,
).selectById;

const notificationByPostIdAdapter = createEntityAdapter<GroupByEntityId>({
  selectId: (notificationByPostId) => notificationByPostId.id,
});

const notificationByPostIdSelector = notificationByPostIdAdapter.getSelectors<NotificationState>(
  (state) => state[EntityType.POST],
).selectById;

const notificationByEventIdAdapter = createEntityAdapter<GroupByEntityId>({
  selectId: (notificationByEventId) => notificationByEventId.id,
});

const notificationByEventIdSelector = notificationByPostIdAdapter.getSelectors<NotificationState>(
  (state) => state[EntityType.EVENT],
).selectById;

const notificationByNetworkIdAdapter = createEntityAdapter<GroupByEntityId>({
  selectId: (notificationByNetworkId) => notificationByNetworkId.id,
});

const notificationByNetworkIdSelector = notificationByPostIdAdapter.getSelectors<NotificationState>(
  (state) => state[EntityType.NETWORK],
).selectById;

const networkUpdatesAdapter = createEntityAdapter<GroupByEntityId>({
  selectId: (notification) => notification.id,
});

const networkUpdatesSelector = networkUpdatesAdapter.getSelectors<NotificationState>(
  (state) => state.networkUpdates,
).selectAll;

const networkUpdateSelector = networkUpdatesAdapter.getSelectors<NotificationState>(
  (state) => state.networkUpdates,
).selectById;

const entityAdapter = {
  [EntityType.POST]: notificationByPostIdAdapter,
  [EntityType.EVENT]: notificationByEventIdAdapter,
  [EntityType.NETWORK]: notificationByNetworkIdAdapter,
};

const entitySelector = {
  [EntityType.POST]: notificationByPostIdSelector,
  [EntityType.EVENT]: notificationByEventIdSelector,
  [EntityType.NETWORK]: notificationByNetworkIdSelector,
};

export {
  networkUpdatesAdapter,
  networkUpdatesSelector,
  networkUpdateSelector,
  notificationAdapter,
  notificationItemSelector,
  notificationItemsSelector,
  notificationByPostIdAdapter,
  notificationByPostIdSelector,
  notificationByEventIdAdapter,
  notificationByEventIdSelector,
  notificationByNetworkIdAdapter,
  notificationByNetworkIdSelector,
  entityAdapter,
  entitySelector,
};
