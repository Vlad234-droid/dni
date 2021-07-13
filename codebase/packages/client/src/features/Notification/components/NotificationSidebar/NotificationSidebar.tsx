import React, { FC, useState, useCallback, useEffect, useMemo, useRef, RefObject } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@beans/button';
import isEmpty from 'lodash.isempty';

import { Page } from 'features/Page';

import Loading from 'types/loading';
import { EmptyContainer, Level, Error, Spinner } from 'features/Common';
import {
  hideSidebar,
  toggleSidebar,
  notificationsSelector,
  notificationsMetadataSelector,
  isSidebarOpenedSelector,
} from '../../store';
import { EntityType, AcknowledgePayload } from '../../config/types';
import NotificationerItem, { NotificationItem } from '../NotificationItem';
import { Wrapper, Title, TitleWrapper } from './styled';
import { useNotification } from '../../context/NotificationContext';

const NOTIFICATION_CONTAINER_TEST_ID = 'notification-container-test-id';

type Props = {
  buttonRef: RefObject<HTMLButtonElement>;
};

const NotificationSidebar: FC<Props> = ({ buttonRef }) => {
  const dispatch = useDispatch();
  const { acknowledge } = useNotification();

  const [items, setItems] = useState<Array<NotificationItem & { key: string | number }>>([]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleOnBodyClick = useCallback((e: MouseEvent) => {
    if (
      buttonRef?.current &&
      !buttonRef?.current.contains(e.target as Node) &&
      wrapperRef.current &&
      !wrapperRef.current.contains(e.target as Node)
    ) {
      dispatch(hideSidebar());
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleOnBodyClick, false);

    return () => document.removeEventListener('click', handleOnBodyClick, false);
  }, []);

  const handleSettingsClick = () => {
    dispatch(toggleSidebar());
  };

  const handleCloserClick = useCallback((payload: AcknowledgePayload) => {
    acknowledge(payload);
  }, []);

  const isSidebarOpened = useSelector(isSidebarOpenedSelector);

  const notifications = useSelector(notificationsSelector);
  const { error, loading } = useSelector(notificationsMetadataSelector);
  const isLoading = useMemo(() => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED, [loading]);

  const memoizedContent = useMemo(() => {
    if (error) return <Error />;

    if (isEmpty(items) && isLoading) return <Spinner height='270px' />;

    if (loading === Loading.SUCCEEDED && isEmpty(items))
      return <EmptyContainer level={Level.INFO} explanation='' description='No new notifications' />;

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
      case EntityType.POST:
        return `/${Page.NETWORK_NEWS}/${entityId}`;
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
          rootAncestorId,
          rootAncestorType,
          rootAncestor,
          parentEntityId,
          parentEntityType,
          parentEntity,
          notifiedAt,
        }) => ({
          key: `${entityType}-${entityId}` || `network-news-${entityId}`,
          href: buildLink(entityId, entityType),
          name: parentEntity?.title || 'Diversity & Inclusion News',
          title: entity?.title || 'Unknown Post',
          subName:
            rootAncestor && rootAncestorId != parentEntityId && rootAncestorType != parentEntityType
              ? `on behalf of ${rootAncestor?.title}`
              : undefined,
          avatar: parentEntity?.image?.url || '',
          notifiedAt,
          onCloserClick: () => handleCloserClick({ entityType, entityId }),
          onLinkClick: () => (EntityType.EVENT == entityType ? handleCloserClick({ entityType, entityId }) : null),
        }),
      ),
    );
  }, [notifications, handleCloserClick]);

  return (
    <Wrapper data-testid={NOTIFICATION_CONTAINER_TEST_ID} visible={isSidebarOpened} ref={wrapperRef}>
      <TitleWrapper>
        <Title>Notifications</Title>
        <Link to={`/${Page.NOTIFICATION_SETTINGS}`}>
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
