import store from 'store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import Loading from 'types/loading';
import API from 'utils/api';

import * as T from '../config/types';
import * as A from './actionTypes';
import { plainNotificationSelector } from './selectors';
import { CONTACT_API_ENABLED } from 'config/constants';

const initialState: T.State = {
  plainNotifications: {
    list: [],
    metadata: { loading: Loading.IDLE },
  },
  grouppedNotifications: {
    list: [],
    metadata: { loading: Loading.IDLE },
  },
  isSidebarOpened: false,
  notificationSettings: {
    receivePostsEmailNotifications: false,
    receiveEventsEmailNotifications: false,
  },
};

const getList = createAsyncThunk<T.NotificationListItem[]>(
  A.FETCH_LIST_PLAIN, 
  async () => {

  return await API.notifications.fetchAllPlain<T.NotificationListItem[]>();
});

const getListGroupByNetwork = createAsyncThunk<T.NotificationGrouppedItem[]>(
  A.FETCH_LIST_GROUPBY, 
  async () => {

  return await API.notifications.fetchAllGroupBy<T.NotificationGrouppedItem[]>();
});

const acknowledge = createAsyncThunk<T.Acknowledge | undefined, T.AcknowledgePayload>(
  A.ACKNOWLEDGE_ACTION, 
  async (data) => {

  const entity = plainNotificationSelector(store.getState(), data);
  if (!entity) {
    return;
  }

  return await API.notifications.acknowledge<T.Acknowledge>(data);
});

const getPersonalEmail = createAsyncThunk<T.EmailAddress>(
  A.GET_PERSONAL_EMAIL, 
  async () => {

  return await API.contact.getPersonalEmail<T.EmailAddress>();
});

const updatePersonalEmail = createAsyncThunk<T.EmailAddress, T.EmailAddress & { oldEmailAddress?: string }>(
  A.UPDATE_PERSONAL_EMAIL, 
  async (emailAddress: T.EmailAddress) => {
    if (CONTACT_API_ENABLED) {
      return await API.contact.sendPersonalEmailConfirmation<T.EmailAddress>(emailAddress);
    } else {
      return await API.contact.updatePersonalEmail<T.EmailAddress>(emailAddress?.addressIdentifier, emailAddress);
    }
  },
);

const createPersonalEmail = createAsyncThunk<Pick<T.EmailAddress, 'emailAddress'>, Pick<T.EmailAddress, 'emailAddress'>>(
  A.CREATE_PERSONAL_EMAIL,
  async (emailAddress: Pick<T.EmailAddress, 'emailAddress'>) => {
    await API.contact.createPersonalEmail<T.EmailAddress>(emailAddress);
    return emailAddress;
  },
);

const getNotificationSettings = createAsyncThunk<T.EmailNotificationSettings>(A.GET_NOTIFICATION_SETTINGS, async () => {
  return await API.contact.getNotificationsSettings<T.EmailNotificationSettings>();
});

const updateNotificationSettings = createAsyncThunk<T.EmailNotificationSettings, T.EmailNotificationSettings>(
  A.UPDATE_NOTIFICATION_SETTINGS, 
  async (settings: T.EmailNotificationSettings) => {
    return await API.contact.updateNotificationsSettings(settings);
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
        state.plainNotifications.metadata.loading = Loading.PENDING;
      })
      .addCase(getList.fulfilled, (state: T.State, action) => {
        state.plainNotifications.list = action.payload;
        state.plainNotifications.metadata.loading = Loading.SUCCEEDED;
      })
      .addCase(getList.rejected, (state: T.State, action) => {
        state.plainNotifications.metadata.loading = Loading.FAILED;
        state.plainNotifications.metadata.error = (action as T.Error).error.message;
      })
      .addCase(getListGroupByNetwork.pending, (state: T.State) => {
        state.grouppedNotifications.metadata.loading = Loading.PENDING;
      })
      .addCase(getListGroupByNetwork.fulfilled, (state: T.State, action) => {
        state.grouppedNotifications.list = action.payload;
        state.grouppedNotifications.metadata.loading = Loading.SUCCEEDED;
      })
      .addCase(getListGroupByNetwork.rejected, (state: T.State, action) => {
        state.grouppedNotifications.metadata.loading = Loading.FAILED;
        state.grouppedNotifications.metadata.error = (action as T.Error).error.message;
      })
      .addCase(acknowledge.pending, (state: T.State) => {
        state.plainNotifications.metadata.loading = Loading.PENDING;
        state.grouppedNotifications.metadata.loading = Loading.PENDING;
      })
      .addCase(acknowledge.fulfilled, (state: T.State, action) => {
        const acknowledge: T.Acknowledge | undefined = action.payload;

        if (!acknowledge) {
          return state;
        }

        state.plainNotifications.metadata.loading = Loading.SUCCEEDED;
        state.grouppedNotifications.metadata.loading = Loading.SUCCEEDED;

        state.plainNotifications.list = state.plainNotifications.list.filter(n =>
          (n.entityId !== acknowledge?.acknowledgeEntityId || n.entityType !== acknowledge?.acknowledgeEntityType),
        );

        state.grouppedNotifications.list = state.grouppedNotifications.list
          .map(({ ancestorType, ancestorId, ancestorInstance, nestedAsArray, nestedTotal }) => ({
            ancestorType,
            ancestorId,
            ancestorInstance,
            nestedTotal:
              nestedAsArray.some(d => d.entitiesIds.includes(acknowledge?.acknowledgeEntityId)) &&
              nestedAsArray.some(d => d.entityType === acknowledge?.acknowledgeEntityType)
                ? nestedTotal - 1
                : nestedTotal,
            nestedAsArray: nestedAsArray.map(({entityType, entitiesIds}) => ({
              entityType,
              entitiesIds: entitiesIds.filter(ii => entityType !== acknowledge?.acknowledgeEntityType ||
                (entityType === acknowledge?.acknowledgeEntityType && ii === acknowledge?.acknowledgeEntityId))
            }))
            .filter(nnnn => nnnn.entitiesIds.length > 0)
          }))
          .filter(nnn => nnn.nestedTotal > 0);
      })
      .addCase(getPersonalEmail.fulfilled, (state: T.State, action) => {
        state.personalEmail = action.payload;
      })
      .addCase(updatePersonalEmail.fulfilled, (state: T.State, action) => {
        state.personalEmail = action.payload;
      })
      .addCase(getNotificationSettings.fulfilled, (state: T.State, action) => {
        state.notificationSettings = action.payload;
      })
      .addCase(updateNotificationSettings.fulfilled, (state: T.State, action) => {
        state.notificationSettings = { ...state.notificationSettings, ...action.payload };
      })
      .addDefaultCase((state) => state);
  },
});

const { clear, toggleSidebar, hideSidebar } = slice.actions;

export {
  getList,
  getListGroupByNetwork,
  acknowledge,
  clear,
  toggleSidebar,
  hideSidebar,
  getPersonalEmail,
  getNotificationSettings,
  updatePersonalEmail,
  createPersonalEmail,
  updateNotificationSettings,
};

export default slice.reducer;
