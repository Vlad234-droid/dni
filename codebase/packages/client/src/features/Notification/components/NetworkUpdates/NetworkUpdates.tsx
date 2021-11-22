import React, { FC, useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@beans/button';
import isEmpty from 'lodash.isempty';

import { Page } from 'features/Page';
import Loading from 'types/loading';
import { EmptyContainer, Level, Error, Spinner } from 'features/Common';

import { networkNotificationsSelector, networkNotificationMetadataSelector } from '../../store';
import { Wrapper, Title, List } from './styled';
import NetworkUpdatesItem, { UpdateItem } from '../NetworkUpdatesItem';
import DefaultLogo from '../../assets/colleague-network-logo.jpg';

const TEST_ID = 'network-updates';

const NetworkUpdates: FC = () => {
  const [items, setItems] = useState<Array<UpdateItem & { key: string | number }>>([]);

  const networkNotifications = useSelector(networkNotificationsSelector);
  const { error, loading } = useSelector(networkNotificationMetadataSelector);

  const isLoading = useMemo(() => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED, [loading]);

  useEffect(() => {
    setItems(
      networkNotifications.map(({ rootAncestorId, rootAncestor, totalEntitiesCount }, idx) => ({
        key: rootAncestorId || `network-news-${idx}`,
        href: rootAncestorId ? `/${Page.NETWORKS}/${rootAncestorId}` : `/${Page.NETWORK_NEWS}`,
        name: rootAncestor?.title || 'D&I News',
        avatar: rootAncestor?.image?.url || DefaultLogo,
        count: totalEntitiesCount,
      })),
    );
  }, [networkNotifications]);

  const memoizedContent = useMemo(() => {
    if (error) return <Error />;

    if (isEmpty(items) && isLoading) return <Spinner height='200px' />;

    if (loading === Loading.SUCCEEDED && isEmpty(items))
      return <EmptyContainer description='No updates' level={Level.INFO} explanation='' />;

    return (
      <List>
        {items.map(({ key, ...props }) => {
          return <NetworkUpdatesItem key={key} {...props} />;
        })}
      </List>
    );
  }, [items, error, loading]);

  return (
    <Wrapper data-testid={TEST_ID}>
      <Title>Updates in my Networks</Title>
      {memoizedContent}
      <Link to={`/${Page.NETWORKS}`}>{!isEmpty(items) && <Button variant='secondary'>See all</Button>}</Link>
    </Wrapper>
  );
};

export { TEST_ID };

export default NetworkUpdates;
