/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useCallback, createContext, FC, useState, useEffect } from 'react';

import { socket, NOTIFICATIONS, NOTIFICATION_CREATE, NOTIFICATION_REMOVE } from 'config/notification';

interface NotificationContext {
  notifications: Notification[];
  removeNotificationBy: (ids: number[]) => void;
}

const defaultNotificationContext: NotificationContext = {
  notifications: [],
  removeNotificationBy: (_: number[]) => null,
};

const NotificationContext = createContext<NotificationContext>(defaultNotificationContext);

enum ActionType {
  // Feed
  POST_UPDATED = 'POST_UPDATED',
  POST_CREATED = 'POST_CREATED',
  POST_ARCHIVED = 'POST_ARCHIVED',
  POST_REMOVED = 'POST_REMOVED',
  // Event
  EVENT_UPDATED = 'EVENT_UPDATED',
  EVENT_CREATED = 'EVENT_CREATED',
  EVENT_ARCHIVED = 'EVENT_ARCHIVED',
  EVENT_REMOVED = 'EVENT_REMOVED',
  // Network
  NETWORK_UPDATED = 'NETWORK_UPDATED',
  NETWORK_CREATED = 'NETWORK_CREATED',
  NETWORK_ARCHIVED = 'NETWORK_ARCHIVED',
  NETWORK_REMOVED = 'NETWORK_REMOVED',
}

enum EntityType {
  POST = 'Post',
  NETWORK = 'Network',
  EVENT = 'Event',
}

type Notification = {
  id: number;
  createdAt: Date;
  actionType: ActionType;
  entityType: EntityType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entity: any;
};

export const NotificationProvider: FC = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newNotifications, setNewNotifications] = useState<Notification[]>([]);
  const [removedNotifications, setRemovedNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on('connection', () => {
        console.log(`Client connected: ${socket && socket.id}`);
      });

      socket.on('connect', () => {
        console.log(`Got 'connect' event`);
        socket && socket.emit(NOTIFICATIONS);
      });

      socket.on(NOTIFICATIONS, (data) => {
        console.log(`Got ${NOTIFICATIONS} event`);
        setNotifications(data);
      });

      socket.on(NOTIFICATION_CREATE, (data) => {
        console.log(`Got ${NOTIFICATION_CREATE} event`);
        setNewNotifications(data);
      });

      socket.on(NOTIFICATION_REMOVE, (data) => {
        console.log(`Got ${NOTIFICATION_REMOVE} event`);
        setRemovedNotifications(data);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    }
  }, []);

  const removeNotificationBy = useCallback((ids: number[]) => {
    socket && socket.emit(NOTIFICATION_REMOVE, ids);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        removeNotificationBy,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
