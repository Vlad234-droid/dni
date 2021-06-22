import React, { FC } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@beans/button';

import store from 'store';
import { Page } from 'features/Page';

import { notificationItemsSelector } from '../../store/selectors';
import { actions } from '../../store/slice';
import NotificationItem from '../NotificationItem';
import { Wrapper, Title, TitleWrapper } from './styled';

const notificationContainerTestId = 'notification-container-test-id';

const NotificationSidebar: FC = () => {
  const dispatch = useDispatch();
  const items = useSelector(() => notificationItemsSelector(store.getState().notification), shallowEqual);

  const handleSettingsClick = () => {
    dispatch(actions.toggleNotificationSidebar());
  };

  const isSidebarOpened = useSelector(() => store.getState().notification.isSidebarOpened);

  if (!isSidebarOpened) {
    return null;
  }

  return (
    <Wrapper data-testid={notificationContainerTestId}>
      <TitleWrapper>
        <Title>Notifications</Title>
        <Link to={Page.NOTIFICATIONS}>
          <Button variant='primary' onClick={handleSettingsClick}>
            Settings
          </Button>
        </Link>
      </TitleWrapper>
      {items.map((item) => {
        const { id, href, name, avatar, createdAt, actionType, entityType, entity } = item;

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
    </Wrapper>
  );
};

export default NotificationSidebar;
export { notificationContainerTestId };
