import { FC, useEffect, useState } from 'react';
import isEmpty from 'lodash.isempty';

import useFetch from 'hooks/useFetch';
import useStore from 'hooks/useStore';
import { EmptyContainer, Spinner } from 'features/Common';
import { Page } from 'features/Page';
import List from 'features/List';
import Loading from 'types/loading';

import { Network } from '../../config/types';
import { serializer } from '../../store';
import NetworkAction from '../NetworkAction';

const NetworkCarousel: FC = () => {
  const [{ response: networks, loading }, doFetch] = useFetch<Network[]>([]);
  const { participants } = useStore((state) => state.networks);

  const [filters] = useState({
    _start: 0,
    _limit: 5,
  });

  useEffect(() => {
    doFetch(
      (api) => api.networks.fetchAll(filters),
      (res) => res.map((i) => serializer(i)!),
    );
  }, [filters]);

  if (loading === Loading.IDLE) return null;

  if (loading === Loading.PENDING) return <Spinner height='300px' />;

  if (loading === Loading.SUCCEEDED && isEmpty(networks))
    return <EmptyContainer description='Nothing to show' />;

  return (
    <List
      link={Page.NETWORKS}
      //@ts-ignore
      items={networks}
      participants={participants}
      renderAction={(id) => <NetworkAction id={id} />}
    />
  );
};

export default NetworkCarousel;
