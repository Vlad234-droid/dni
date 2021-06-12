import React, { FC } from 'react';
import Icon from '@beans/icon';

import { skins } from '../../config/skins';
import { Id, ActionType } from '../../config/types';
import { onNotificationCloserClick } from '../../store/handlers';
import {
  CreatorAvatar,
  CreatorName,
  NotificationHead,
  NotificactionContent,
  NotificationCore,
  NotificationCloser,
  NotificationDate,
  NotificationLink,
  NotificationWrapper,
} from './styled';

interface NotificationItemProps {
  id: Id;
  href: string;
  name: string;
  avatar: string;
  createdAt: string;
  actionType: ActionType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entity: any;
}

const notificationItemTestId = 'notificationer-item-test-id';

const NotificationerItem: FC<NotificationItemProps> = ({
  id,
  href,
  name,
  avatar,
  createdAt,
  actionType,
  entity,
}) => {
  const skin = skins[actionType];
  const Content = skin?.Content;

  return (
    <NotificationWrapper data-testid={notificationItemTestId}>
      <NotificationCore>
        <NotificationHead>
          <CreatorAvatar avatar={avatar} />
          <CreatorName>{name}</CreatorName>
          <NotificationCloser onClick={() => onNotificationCloserClick({ id })}>
            <Icon graphic='close' />
          </NotificationCloser>
        </NotificationHead>
        <NotificactionContent>
          {Content && <Content id={id} entity={entity} />}
          <NotificationDate>
            {new Date(createdAt).toUTCString()}
          </NotificationDate>
        </NotificactionContent>
      </NotificationCore>
      <NotificationLink to={href} title={'Click to view'} />
    </NotificationWrapper>
  );
};

export default NotificationerItem;
export { notificationItemTestId };
