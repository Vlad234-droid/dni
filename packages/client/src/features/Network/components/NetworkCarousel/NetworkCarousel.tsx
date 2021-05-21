import React, { FC, useEffect, useMemo, useState } from 'react';
import isEmpty from 'lodash.isempty';

import useFetch from 'hooks/useFetch';
import useStore from 'hooks/useStore';
import { EmptyContainer, Error, Spinner } from 'features/Common';
import { Page } from 'features/Page';
import List from 'features/List';
import Loading from 'types/loading';

import { Network } from '../../config/types';
import { serializer } from '../../store';
import NetworkAction from '../NetworkAction';
import { Wrapper } from './styled';

const NetworkCarousel: FC = () => {
  const [{ response: networks, loading, error }, doFetch] = useFetch<Network[]>(
    [],
  );
  const { participants } = useStore((state) => state.networks);
  const isLoading = useMemo(
    () => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED,
    [loading],
  );
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

  const memoizedContent = useMemo(() => {
    if (error) return <Error errorData={{ title: error }} />;

    if (isLoading) return <Spinner height='300px' />;

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
  }, [networks, participants, loading, error]);

  return <Wrapper>{memoizedContent}</Wrapper>;
};

export default NetworkCarousel;
