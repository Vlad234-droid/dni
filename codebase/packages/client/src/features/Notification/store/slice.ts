import store from 'store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import omit from 'lodash.omit';

import Loading from 'types/loading';
import API from 'utils/api';

import * as T from '../config/types';
import * as A from './actionTypes';
import { notificationSelector } from './selectors';
import { CONTACT_API_ENABLED } from 'config/constants';

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
  notificationSettings: {
    settings: {
      receivePostsEmailNotifications: false,
      receiveEventsEmailNotifications: false,
    },
  },
};

const getList = createAsyncThunk<T.Notification[]>(A.GET_LIST_ACTION, async () => {
  return await API.notifications.fetchAll<T.Notification[]>();
});

const getListGroupByNetwork = createAsyncThunk<T.NetworkNotification[]>(A.GET_LIST_NETWORKS_ACTION, async () => {
  return await API.notifications.fetchAllGroupByNetwork<T.NetworkNotification[]>();
});

const getPersonalEmail = createAsyncThunk<T.EmailAddress>(A.GET_PERSONAL_EMAIL, async () => {
  return await API.contact.getPersonalEmail<T.EmailAddress>();
});

const updatePersonalEmail = createAsyncThunk<T.EmailAddress, any>(
  A.UPDATE_PERSONAL_EMAIL,
  async (emailAddress: T.EmailAddress) => {
    if (CONTACT_API_ENABLED) {
      await API.contact.sendPersonalEmailConfirmation<T.EmailAddress>(emailAddress);
    } else {
      await API.contact.updatePersonalEmail<T.EmailAddress>(emailAddress?.addressIdentifier, emailAddress);
    }

    return emailAddress;
  },
);

const createPersonalEmail = createAsyncThunk<{ emailAddress: string }, any>(
  A.CREATE_PERSONAL_EMAIL,
  async (emailAddress: { emailAddress: string }) => {
    await API.contact.createPersonalEmail<T.EmailAddress>(emailAddress);

    return emailAddress;
  },
);

const getNotificationSettings = createAsyncThunk<T.EmailNotificationSettings>(A.GET_NOTIFICATION_SETTINGS, async () => {
  return await API.contact.getNotificationsSettings<T.EmailNotificationSettings>();
});

const updateNotificationSettings = createAsyncThunk(A.UPDATE_NOTIFICATION_SETTINGS, async (settings: any) => {
  return await API.contact.updateNotificationsSettings(settings);
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
            totalEntitiesCount:
              nn.entitiesDetails.some((d) => d.entitiesIds.includes(acknowledge?.acknowledgeEntityId)) &&
              nn.entitiesDetails.some((d) => d.entityType == acknowledge?.acknowledgeEntityType)
                ? nn.totalEntitiesCount - 1
                : nn.totalEntitiesCount,
          }))
          .filter((nn) => nn.totalEntitiesCount > 0);

        state.notifications.list = state.notifications.list.filter(
          (n) =>
            !(n.entityId == acknowledge?.acknowledgeEntityId && n.entityType == acknowledge?.acknowledgeEntityType),
        );
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
