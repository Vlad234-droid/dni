import React, { FC } from 'react';
import Icon from '@beans/icon';

import { Wrapper, Avatar, Name, Count } from './styled';

type UpdateItem = {
  href: string;
  name: string;
  avatar: string;
  count: number;
};

type Props = UpdateItem;

const NETWORK_UPDATES_ITEM_TEST_ID = 'network-updates-item-test-id';

const NetworkUpdateItem: FC<Props> = ({ href, name, avatar, count }) => {
  return (
    <Wrapper to={href} data-testid={NETWORK_UPDATES_ITEM_TEST_ID}>
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

export { NETWORK_UPDATES_ITEM_TEST_ID };

export type { UpdateItem };

export default NetworkUpdateItem;
