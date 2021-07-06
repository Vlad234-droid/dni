import React, { FC } from 'react';
import Icon from '@beans/icon';
import { isoDateToFormat, FULL_FORMAT } from 'utils/date';

import { CreatorAvatar, CreatorName, Head, Content, Core, Closer, Date, Title, CustomLink, Wrapper } from './styled';

type NotificationItem = {
  href: string;
  name: string;
  avatar: string;
  title?: string;
  createdAt: string;
  onCloserClick: () => void;
};

type Props = NotificationItem;

const NOTIFICATION_ITEM_TEST_ID = 'notificationer-item-test-id';

const NotificationerItem: FC<Props> = ({ href, name, avatar, title, createdAt, onCloserClick }) => {
  return (
    <Wrapper data-testid={NOTIFICATION_ITEM_TEST_ID}>
      <Core>
        <Head>
          <CreatorAvatar avatar={avatar} />
          <CreatorName>{name}</CreatorName>
          <Closer onClick={onCloserClick}>
            <Icon graphic='close' />
          </Closer>
        </Head>
        <Content>
          {title && <Title>{title}</Title>}
          <Date>{isoDateToFormat(createdAt, FULL_FORMAT)}</Date>
        </Content>
      </Core>
      <CustomLink to={href} title={'Click to view'} />
    </Wrapper>
  );
};

export { NOTIFICATION_ITEM_TEST_ID };

export type { NotificationItem };

export default NotificationerItem;
