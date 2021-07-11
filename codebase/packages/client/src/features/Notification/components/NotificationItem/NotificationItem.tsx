import React, { FC } from 'react';
import Icon from '@beans/icon';
import { isoDateToFormat, FULL_FORMAT } from 'utils/date';

import {
  CreatorAvatar,
  CreatorName,
  CreatorSubName,
  NameWrapper,
  Head,
  Content,
  Core,
  Closer,
  Date,
  Title,
  CustomLink,
  Wrapper,
} from './styled';

type NotificationItem = {
  href: string;
  name: string;
  subName?: string;
  avatar: string;
  title?: string;
  notifiedAt: string;
  onCloserClick: () => void;
  onLinkClick: () => void;
};

type Props = NotificationItem;

const NOTIFICATION_ITEM_TEST_ID = 'notificationer-item-test-id';

const NotificationerItem: FC<Props> = ({
  href,
  name,
  subName,
  avatar,
  title,
  notifiedAt,
  onCloserClick,
  onLinkClick,
}) => {
  return (
    <Wrapper data-testid={NOTIFICATION_ITEM_TEST_ID}>
      <Core>
        <Head>
          <CreatorAvatar avatar={avatar} />
          <NameWrapper>
            <CreatorName>{name}</CreatorName>
            {subName && <CreatorSubName>{subName}</CreatorSubName>}
          </NameWrapper>
          <Closer onClick={onCloserClick}>
            <Icon graphic='close' />
          </Closer>
        </Head>
        <Content>
          {title && <Title>{title}</Title>}
          <Date>{isoDateToFormat(notifiedAt, FULL_FORMAT)}</Date>
        </Content>
      </Core>
      <CustomLink to={href} title={'Click to view'} onClick={onLinkClick} />
    </Wrapper>
  );
};

export { NOTIFICATION_ITEM_TEST_ID };

export type { NotificationItem };

export default NotificationerItem;
