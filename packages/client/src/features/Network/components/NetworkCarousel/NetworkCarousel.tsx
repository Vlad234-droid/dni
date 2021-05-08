import { FC, useEffect, useState } from 'react';
import isEmpty from 'lodash.isempty';

import Carousel from 'features/Carousel';
import useFetch from 'hooks/useFetch';
import useStore from 'hooks/useStore';
import { LargeTile } from 'features/Tile';
import { EmptyContainer, Spinner } from 'features/Common';
import { Page } from 'features/Page';

import { Network } from '../../config/types';
import { serializer } from '../../store';
import NetworkAction from '../NetworkAction';

const NetworkCarousel: FC = () => {
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
    <Carousel itemWidth='278px' id='network-carousel'>
      {list!.map(({ id, title, image }) => (
        <LargeTile
          link={Page.NETWORKS}
          renderAction={() => <NetworkAction id={id} />}
          id={id}
          key={`networks-${id}`}
          title={title}
          participants={participants[id]! || 0}
          image={image}
        />
      ))}
    </Carousel>
  );
};

export default NetworkCarousel;
