import { FC, useEffect, useState } from 'react';
import isEmpty from 'lodash.isempty';

import Carousel from 'features/Carousel';
import useFetch from 'hooks/useFetch';
import useStore from 'hooks/useStore';
import { LargeTile } from 'features/Tile';
import { normalizeImage } from 'utils/content';
import { EmptyContainer } from 'features/Common';
import { Page } from 'features/Page';

import { Network } from '../../store';
import NetworkAction from '../NetworkAction';

const NetworkCarousel: FC = () => {
  const [{ response: list }, doFetch] = useFetch<Network[]>([]);
  const { networkParticipants } = useStore((state) => state.auth);

  const [filters] = useState({
    _start: 0,
    _limit: 5,
  });

  useEffect(() => {
    doFetch(
      (api) => api.networks.fetchAll(filters),
      (res) => res,
    );
  }, [filters]);

  return isEmpty(list) ? (
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
          participants={networkParticipants[id]! || 0}
          image={normalizeImage(image)}
        />
      ))}
    </Carousel>
  );
};

export default NetworkCarousel;
