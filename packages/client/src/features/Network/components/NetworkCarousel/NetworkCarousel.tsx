import { FC, useEffect, useState } from 'react';
import isEmpty from 'lodash.isempty';

import useFetch from 'hooks/useFetch';
import useStore from 'hooks/useStore';
import { EmptyContainer, Spinner } from 'features/Common';
import { Page } from 'features/Page';
import { useMedia } from 'context/InterfaceContext';
import List from 'features/List';

import { Network } from '../../config/types';
import { serializer } from '../../store';
import NetworkAction from '../NetworkAction';

const NetworkCarousel: FC = () => {
  const { isMobile } = useMedia();
  const [{ response: list, isLoading }, doFetch] = useFetch<Network[]>([]);
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

  return isLoading ? (
    <Spinner height='300px' />
  ) : isEmpty(list) ? (
    <EmptyContainer description='Nothing to show' />
  ) : (
    <List
      link={Page.NETWORKS}
      // TODO: object is not correct type
      //@ts-ignore
      items={list}
      participants={participants}
      isMobile={isMobile}
      renderAction={(id) => <NetworkAction id={id} />}
    />
  );
};

export default NetworkCarousel;
