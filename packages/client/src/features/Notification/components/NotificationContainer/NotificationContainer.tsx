import React, { FC } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';

import store from 'store';
import { notificationItemsSelector } from '../../store/selectors';
import NotificationItem from '../NotificationItem';

const NotificationTitle = styled.div`
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
  padding-bottom: 16px;
  color: ${({ theme }) => theme.colors.heading};
`;

const NotificationWrapper = styled.div`
  padding: 24px;
  box-sizing: border-box;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  max-width: 408px;
  height: calc(100vh - 226px);
  border-left: 1px solid ${({ theme }) => theme.colors.lines.base};
  background-color: ${({ theme }) => theme.colors.white};
`;

const notificationContainerTestId = 'notification-container-test-id';

const NotificationContainer: FC = () => {
  const items = useSelector(
    () => notificationItemsSelector(store.getState().notification),
    shallowEqual,
  );

  const isSidebarOpened = useSelector(
    () => store.getState().notification.isSidebarOpened,
  );

  if (!isSidebarOpened) {
    return null;
  }

  return (
    <NotificationWrapper data-testid={notificationContainerTestId}>
      <NotificationTitle>Notifications</NotificationTitle>
      {items.map((item) => {
        const {
          id,
          href,
          name,
          avatar,
          createdAt,
          actionType,
          entityType,
          entity,
        } = item;

        return (
          <NotificationItem
            key={id}
            {...{
              id,
              href,
              name,
              avatar,
              createdAt,
              actionType,
              entityType,
              entity,
            }}
          />
        );
      })}
    </NotificationWrapper>
  );
};

export default NotificationContainer;
export { notificationContainerTestId };
