import { useEffect } from 'react';

import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';

import { getPersonalEmail, getNotificationSettings } from '../store';

const useModalSettings = () => {
  const dispatch = useDispatch();
  const {
    personalEmail,
    notificationSettings,
  } = useStore((state) => state.notifications);
  const {
    settings: {
      receivePostsEmailNotifications,
      receiveEventsEmailNotifications,
    }
  } = notificationSettings;
  const displayModal = !personalEmail?.emailAddress || (!receivePostsEmailNotifications && !receiveEventsEmailNotifications);

  useEffect(() => {
    if (!personalEmail) {
      dispatch(getPersonalEmail());
    }
  }, [personalEmail]);

  // fetch settings
  useEffect(() => {
    if (!notificationSettings) {
      dispatch(getNotificationSettings());
    }
  }, [notificationSettings]);

  return displayModal;
};

export default useModalSettings;
