import { FC, useEffect, useMemo, useState } from 'react';
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
import { Wrapper } from './styled';

const NetworkCarousel: FC = () => {
  const [{ response: networks, loading }, doFetch] = useFetch<Network[]>([]);
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

  if (isLoading) return <Spinner height='300px' />;

  if (loading === Loading.SUCCEEDED && isEmpty(networks))
    return <EmptyContainer description='Nothing to show' />;

  return (
    <Wrapper>
      <List
        link={Page.NETWORKS}
        //@ts-ignore
        items={networks}
        participants={participants}
        renderAction={(id) => <NetworkAction id={id} />}
      />
    </Wrapper>
  );
};

export default NetworkCarousel;
