import { FC, createContext, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { getList, getListGroupByNetwork, clear, toggleSidebar, acknowledge } from '../store';
import { AcknowledgePayload } from '../config/types';

type NotificationData = {
  refetchNotifications: () => void;
  refetchNotificationsWithDelay: (delay?: number) => void;
  clear: () => void;
  toggleSidebar: () => void;
  acknowledge: (payload: AcknowledgePayload) => void;
  acknowledgeWithDelay: (payload: AcknowledgePayload, delay?: number) => void;
};

export const defaultValue: NotificationData = {
  refetchNotifications: () => null,
  refetchNotificationsWithDelay: () => null,
  clear: () => null,
  toggleSidebar: () => null,
  acknowledge: () => null,
  acknowledgeWithDelay: () => null,
};

const NotificationContext = createContext(defaultValue);

export const NotificationProvider: FC = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await handleFetchNotifications();
    })(); 
  }, []);

  const handleFetchNotifications = async () => {
    await Promise.all([
      dispatch(getList()), 
      dispatch(getListGroupByNetwork()),
    ]);
  };

  const handleFetchNotificationsWithDelay = async (dalay = 1000) => {
    setTimeout(async () => await handleFetchNotifications(), dalay);
  };

  const handleClear = () => {
    dispatch(clear());
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleAcknowledge = async (payload: AcknowledgePayload) => {
    dispatch(acknowledge(payload));
  };

  const handleAcknowledgeWithDelay = async (payload: AcknowledgePayload, dalay = 1000) => {
    setTimeout(async () => await handleAcknowledge(payload), dalay);
  };

  return (
    <NotificationContext.Provider
      value={{
        refetchNotifications: handleFetchNotifications,
        refetchNotificationsWithDelay: handleFetchNotificationsWithDelay,
        clear: handleClear,
        toggleSidebar: handleToggleSidebar,
        acknowledge: handleAcknowledge,
        acknowledgeWithDelay: handleAcknowledgeWithDelay,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const NotificationConsumer = NotificationContext.Consumer;

export const useNotification = () => useContext(NotificationContext);

export default NotificationContext;
