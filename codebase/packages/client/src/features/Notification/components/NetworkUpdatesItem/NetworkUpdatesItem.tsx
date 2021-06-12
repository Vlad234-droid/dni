import React, { FC } from 'react';
import { Dictionary } from '@reduxjs/toolkit';
import Icon from '@beans/icon';

import { Wrapper, Avatar, Name, Count } from './styled';
import { Id, NotificationView } from '../../config/types';

interface NetworkUpdateItemProps {
  id: Id;
  href: string;
  name: string;
  avatar: string;
  notifications: {
    ids: Id[];
    entities: Dictionary<NotificationView>;
  };
}

const networkUpdatesItemTestId = 'network-updates-item-test-id';

const NetworkUpdateItem: FC<NetworkUpdateItemProps> = ({ href, name, avatar, notifications }) => {
  const count = notifications.ids.length;

  return (
    <Wrapper to={href} data-testid={networkUpdatesItemTestId}>
      <Avatar avatar={avatar} />
      <Name>{name}</Name>
      {Boolean(count) && (
        <>
          <Count>{count}</Count>
          <Icon graphic={'indicator'} size={'xs'} />
        </>
      )}
    </Wrapper>
  );
};

export default NetworkUpdateItem;
export { networkUpdatesItemTestId };
