import { createSlice, Dictionary } from '@reduxjs/toolkit';

import { reducer } from './reducers';
import { notificationAdapter, entityAdapter, networkUpdatesAdapter } from './selectors';
import { Id, EntityType, NotificationView, GroupByEntityId } from '../config/types';

export interface NotificationState {
  socketConnect: boolean;
  all: {
    ids: Id[];
    entities: Dictionary<NotificationView>;
  };
  [EntityType.POST]: {
    ids: Id[];
    entities: Dictionary<GroupByEntityId>;
  };
  [EntityType.EVENT]: {
    ids: Id[];
    entities: Dictionary<GroupByEntityId>;
  };
  [EntityType.NETWORK]: {
    ids: Id[];
    entities: Dictionary<GroupByEntityId>;
  };
  networkUpdates: {
    ids: Id[];
    entities: Dictionary<GroupByEntityId>;
  };
  isSidebarOpened: boolean;
}

const initialState: NotificationState = {
  socketConnect: false,
  all: notificationAdapter.getInitialState(),
  [EntityType.POST]: entityAdapter[EntityType.POST].getInitialState(),
  [EntityType.EVENT]: entityAdapter[EntityType.EVENT].getInitialState(),
  [EntityType.NETWORK]: entityAdapter[EntityType.NETWORK].getInitialState(),
  networkUpdates: networkUpdatesAdapter.getInitialState(),
  isSidebarOpened: false,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    ...reducer,
  },
});

export const actions = notificationSlice.actions;

export default notificationSlice.reducer;
