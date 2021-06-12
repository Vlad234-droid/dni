import { PayloadAction } from '@reduxjs/toolkit';

import { Page } from 'features/Page';
import { NotificationState } from './slice';
import { EntityType, Notification, NotificationView, PostAs, GroupByIdInArray, Groups } from '../config/types';
import { entityAdapter, notificationAdapter } from './selectors';

const reducer = {
  setSocketConnect: (state: NotificationState) => {
    state.socketConnect = true;
  },

  setSocketDisconnect: (state: NotificationState) => {
    state.socketConnect = false;
  },

  setAllNotifications: (
    state: NotificationState,
    action: PayloadAction<{
      data: [];
    }>,
  ) => {
    const { data } = action.payload;

    const groups: Groups = {
      all: new Map(),
      [EntityType.POST]: new Map(),
      [EntityType.EVENT]: new Map(),
      [EntityType.NETWORK]: new Map(),
    };

    const output = Array.isArray(data)
      ? data.reverse().reduce((input, item: Notification) => {
          try {
            const notification = {
              id: item.id,
              createdAt: item.createdAt,
              actionType: item.action,
              entityType: item.entityType,
              entity: item.entity,
            } as NotificationView;

            notification.name = item.entity.title;
            notification.avatar = item.entity.avatar;

            const entityId = item.entity.id;
            const poster = item.entity.postAs?.[0] || item.entity[0]?.postAs?.[0];
            const { event, network } = poster;

            switch (notification.entityType) {
              case EntityType.POST:
                switch (poster.__component) {
                  case PostAs.USER:
                    notification.href = `${Page.NETWORK_NEWS}/${entityId}`;
                    break;
                  case PostAs.EVENT:
                    notification.href = `${Page.EVENTS}/${event.id}/${entityId}`;
                    break;
                  case PostAs.NETWORK:
                    notification.href = `${Page.NETWORKS}/${network.id}/${entityId}`;
                    break;
                }
                break;
              case EntityType.EVENT:
                notification.href = `${Page.EVENTS}/${entityId}`;
                break;
              case EntityType.NETWORK:
                notification.href = `${Page.NETWORKS}/${entityId}`;
                break;
            }

            let groupByEntity = input[notification.entityType]?.get(entityId);
            if (!groupByEntity) {
              groupByEntity = {
                id: entityId,
                href: '',
                name: '',
                avatar: '',
                notifications: new Map(),
              };
              input[notification.entityType]?.set(entityId, groupByEntity);
            }

            groupByEntity.notifications?.set(notification.id, notification);
            input.all?.set(notification.id, notification);

            return {
              ...input,
            };
          } catch (error) {
            console.warn(error);
            return input;
          }
        }, groups)
      : groups;

    [EntityType.POST, EntityType.EVENT, EntityType.NETWORK].forEach((entityType) => {
      const group: GroupByIdInArray[] = [];

      output[entityType]?.forEach((element) => {
        const notifications: NotificationView[] = [];

        element.notifications?.forEach((element) => {
          notifications.push(element);
        });

        const groupElement = {
          ...element,
          notifications,
        };

        group.push(groupElement);
      });

      entityAdapter[entityType]?.setAll(
        state[entityType],
        group.map(({ notifications, ...props }) => ({
          ...props,
          notifications: notificationAdapter.setAll(notificationAdapter.getInitialState(), notifications),
        })),
      );
    });

    const all: NotificationView[] = [];

    output.all?.forEach((element) => {
      all.push(element);
    });

    notificationAdapter.setAll(state.all, all);
  },

  aggregateNotifications: (
    state: NotificationState,
    action: PayloadAction<{
      data: [];
    }>,
  ) => {
    const { data } = action.payload;

    Array.isArray(data) &&
      data.reverse().forEach(() => {
        try {
          console.log();
        } catch (error) {
          console.warn(error);
        }
      });
  },

  deleteNotification: (
    state: NotificationState,
    action: PayloadAction<{
      ids: [];
    }>,
  ) => {
    const { ids } = action.payload;
    console.log(ids);
  },

  toggleNotificationSidebar: (state: NotificationState) => {
    state.isSidebarOpened = !state.isSidebarOpened;
  },

  closeNotificationSidebar: (state: NotificationState) => {
    state.isSidebarOpened = false;
  },
};

export { reducer };
