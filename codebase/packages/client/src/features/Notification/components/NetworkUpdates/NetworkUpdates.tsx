import React, { FC, useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@beans/button';
import isEmpty from 'lodash.isempty';

import { Page } from 'features/Page';
import Loading from 'types/loading';
import { EmptyContainer, Error, Spinner } from 'features/Common';
import { networkNotificationsSelector, networkNotificationMetadataSelector } from '../../store';
import { Wrapper, Title, List } from './styled';
import NetworkUpdatesItem, { UpdateItem } from '../NetworkUpdatesItem';

const NETWORK_UPDATES_TEST_ID = 'network-updates-test-id';

const NetworkUpdates: FC = () => {
  const [items, setItems] = useState<Array<UpdateItem & { key: string | number }>>([]);

  const networkNotifications = useSelector(networkNotificationsSelector);
  const { error, loading } = useSelector(networkNotificationMetadataSelector);

  const isLoading = useMemo(() => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED, [loading]);

  useEffect(() => {
    setItems(
      networkNotifications.map(({ rootAncestorId, rootAncestor, count }) => ({
        key: rootAncestorId || 'network-news',
        href: rootAncestorId ? `/${Page.NETWORKS}/${rootAncestorId}` : `/${Page.NETWORK_NEWS}`,
        name: rootAncestor?.title || 'D&I News',
        avatar: rootAncestor?.image?.url || '',
        count,
      })),
    );
  }, [networkNotifications]);

  const memoizedContent = useMemo(() => {
    if (error) return <Error />;

    if (isEmpty(items) && isLoading) return <Spinner height='200px' />;

    if (loading === Loading.SUCCEEDED && isEmpty(items))
      return <EmptyContainer description='Nothing to show' showIcon={false} explanation='' />;

    return (
      <List>
        {items.map(({ key, ...props }) => {
          return <NetworkUpdatesItem key={key} {...props} />;
        })}
      </List>
    );
  }, [items, error, loading]);

  return (
    <Wrapper data-testid={NETWORK_UPDATES_TEST_ID}>
      <Title>Updates in my Networks</Title>
      {memoizedContent}
      <Link to={Page.NETWORKS}>
        <Button variant='secondary'>See all</Button>
      </Link>
    </Wrapper>
  );
};

export { NETWORK_UPDATES_TEST_ID };

export default NetworkUpdates;
