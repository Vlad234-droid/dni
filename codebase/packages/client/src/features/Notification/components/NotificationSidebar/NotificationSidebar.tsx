import React, { FC, useState, useCallback, useEffect, useMemo, useRef, RefObject } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@beans/button';
import isEmpty from 'lodash.isempty';

import { Page } from 'features/Page';

import Loading from 'types/loading';
import { EmptyContainer, Error, Spinner } from 'features/Common';
import {
  hideSidebar,
  toggleSidebar,
  notificationsSelector,
  notificationsMetadataSelector,
  isSidebarOpenedSelector,
  acknowledge,
} from '../../store';
import { EntityType, AcknowledgePayload } from '../../config/types';
import NotificationerItem, { NotificationItem } from '../NotificationItem';
import { Wrapper, Title, TitleWrapper } from './styled';

const NOTIFICATION_CONTAINER_TEST_ID = 'notification-container-test-id';

type Props = {
  buttonRef: RefObject<HTMLButtonElement>;
};

const NotificationSidebar: FC<Props> = ({ buttonRef }) => {
  const dispatch = useDispatch();

  const [items, setItems] = useState<Array<NotificationItem & { key: string | number }>>([]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleOnBodyClick = (e: MouseEvent) => {
    if (
      buttonRef?.current &&
      !buttonRef?.current.contains(e.target as Node) &&
      wrapperRef.current &&
      !wrapperRef.current.contains(e.target as Node)
    ) {
      dispatch(hideSidebar());
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOnBodyClick, false);

    return () => document.removeEventListener('click', handleOnBodyClick, false);
  }, []);

  const handleSettingsClick = () => {
    dispatch(toggleSidebar());
  };

  const handleCloserClick = useCallback((payload: AcknowledgePayload) => {
    dispatch(acknowledge(payload));
  }, []);

  const isSidebarOpened = useSelector(isSidebarOpenedSelector);

  const notifications = useSelector(notificationsSelector);
  const { error, loading } = useSelector(notificationsMetadataSelector);
  const isLoading = useMemo(() => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED, [loading]);

  const memoizedContent = useMemo(() => {
    if (error) return <Error />;

    if (isEmpty(items) && isLoading) return <Spinner height='270px' />;

    if (loading === Loading.SUCCEEDED && isEmpty(items)) return <EmptyContainer description='Nothing to show' />;

    return (
      <>
        {items.map(({ key, ...props }) => (
          <NotificationerItem key={key} {...props} />
        ))}
      </>
    );
  }, [items, error, loading]);

  const buildLink = (entityId?: number, entityType?: EntityType) => {
    switch (entityType) {
      case EntityType.NETWORK:
        return `/${Page.NETWORKS}/${entityId}`;
      case EntityType.EVENT:
        return `/${Page.EVENTS}/${entityId}`;
      default:
        return `/${Page.NETWORK_NEWS}`;
    }
  };

  useEffect(() => {
    setItems(
      notifications.map(
        ({
          entityType,
          entityId,
          entity,
          //rootAncestorId, 
          //rootAncestorType, 
          //rootAncestor,
          parentId,
          parentType,
          parent,
          createdAt,
        }) => ({
          key: entityId || `network-news-${entityId}`,
          href: buildLink(parentId, parentType),
          name: parent?.title || 'Diversity & Inclusion News',
          title: entity?.title || 'Unknown Post',
          avatar: parent?.image?.url || '',
          createdAt,
          onCloserClick: () => handleCloserClick({ entityType, entityId }),
        }),
      ),
    );
  }, [notifications, handleCloserClick]);

  return (
    <Wrapper data-testid={NOTIFICATION_CONTAINER_TEST_ID} visible={isSidebarOpened} ref={wrapperRef}>
      <TitleWrapper>
        <Title>Notifications</Title>
        <Link to={Page.NOTIFICATION_SETTINGS}>
          <Button variant='primary' onClick={handleSettingsClick}>
            Settings
          </Button>
        </Link>
      </TitleWrapper>
      {memoizedContent}
    </Wrapper>
  );
};

export { NOTIFICATION_CONTAINER_TEST_ID };

export default NotificationSidebar;
