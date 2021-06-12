import React, { FC } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Link from '@beans/link';

import store from 'store';
import { actions } from '../../store/slice';
import { notificationItemsSelector } from '../../store/selectors';

const NotificationCounter = styled.div`
  position: absolute;
  top: 8px;
  left: 4px;
  font-size: 10px;
  color: white;
  padding: 0 4px;
  cursor: pointer;
  border-radius: 8px;
  background-color: red;
`;

const NotificationRingWrapper = styled.div`
  position: relative;
`;

const notificationRingTestId = 'notificationer-ring-test-id';

interface NotificationerRingProps {
  inverse: boolean;
}

const NotificationerRing: FC<NotificationerRingProps> = ({ inverse }) => {
  const dispatch = useDispatch();

  const notifications = useSelector(() => notificationItemsSelector(store.getState().notification), shallowEqual);

  return (
    <NotificationRingWrapper
      data-testid={notificationRingTestId}
      onClick={(event) => {
        event.preventDefault();

        // if (notifications.length === 0) {
        //   return;
        // }

        dispatch(actions.toggleNotificationSidebar());
      }}
    >
      <Link
        href={'/'}
        inverse={inverse}
        icon={{ graphic: 'notification', position: { global: 'right' } }}
        variant='iconButton'
      />
      {notifications.length > 0 && <NotificationCounter>{notifications.length}</NotificationCounter>}
    </NotificationRingWrapper>
  );
};

export default NotificationerRing;
export { notificationRingTestId };
