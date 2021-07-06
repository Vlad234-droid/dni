import { FC, createContext, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { getList, getListGroupByNetwork, clear, toggleSidebar, acknowledge } from '../store';
import { AcknowledgePayload } from '../config/types';

type NotificationData = {
  refetchNotifications: () => void;
  clear: () => void;
  toggleSidebar: () => void;
  acknowledge: (payload: AcknowledgePayload) => void;
};

export const defaultValue: NotificationData = {
  refetchNotifications: () => null,
  clear: () => null,
  toggleSidebar: () => null,
  acknowledge: () => null,
};

const NotificationContext = createContext(defaultValue);

export const NotificationProvider: FC = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    handleFetchNotifications();
  }, []);

  const handleFetchNotifications = async () => {
    await dispatch(getList());
    await dispatch(getListGroupByNetwork());
  };

  const handleClear = () => {
    dispatch(clear());
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleAcknowledge = (payload: AcknowledgePayload) => {
    dispatch(acknowledge(payload));
  };

  return (
    <NotificationContext.Provider
      value={{
        refetchNotifications: handleFetchNotifications,
        clear: handleClear,
        toggleSidebar: handleToggleSidebar,
        acknowledge: handleAcknowledge,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const NotificationConsumer = NotificationContext.Consumer;

export const useNotificationContext = () => useContext(NotificationContext);

export default NotificationContext;
