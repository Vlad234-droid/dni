import React, { FC, RefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Icon from '@beans/icon';
import Button from '@beans/button';

import Media from 'styles/media';
import { toggleSidebar, plainNotificationsSelector } from '../../store';

const NotificationCounter = styled.div`
  position: absolute;
  top: -4px;
  right: 4px;
  font-size: 10px;
  color: white;
  padding: 0 4px;
  cursor: pointer;
  border-radius: 8px;
  background-color: red;

  ${Media.desktop`
    top: -3px;
    right: -19px;
  `}
`;

const NotificationRingWrapper = styled(Button)`
  position: relative;
  width: 40px;
  height: inherit;
`;

const NOTIFICATION_RING_TEST_ID = 'notificationer-ring-test-id';

interface NotificationerRingProps {
  inverse: boolean;
  buttonRef: RefObject<HTMLButtonElement>;
}

const NotificationRing: FC<NotificationerRingProps> = ({ inverse, buttonRef }) => {
  const dispatch = useDispatch();
  const notifications = useSelector(plainNotificationsSelector);

  return (
    <NotificationRingWrapper
      domRef={buttonRef}
      variant={inverse ? 'link' : 'primary'}
      data-testid={NOTIFICATION_RING_TEST_ID}
      onClick={() => {
        dispatch(toggleSidebar());
      }}
    >
      <Icon key='ring' href={'/'} inverse={inverse} graphic='notification' position={{ global: 'right' }} />
      {notifications.length > 0 && <NotificationCounter key='counter'>{notifications.length}</NotificationCounter>}
    </NotificationRingWrapper>
  );
};

export { NOTIFICATION_RING_TEST_ID };

export default NotificationRing;
