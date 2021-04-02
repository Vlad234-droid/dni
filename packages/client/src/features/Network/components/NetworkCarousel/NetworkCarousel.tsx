import { FC, useEffect, useState } from 'react';
import Button from '@beans/button';

import Carousel from 'features/Carousel';
import useFetch from 'hooks/useFetch';
import { LargeTile } from 'features/Tile';
import { normalizeImage } from 'utils/content';
import { Network } from '../../store';

const NetworkCarousel: FC = () => {
  const [{ response: list }, doFetch] = useFetch<Network[]>([]);

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

  return (
    <Carousel itemWidth='278px' id='network-carousel'>
      {list!.map(({ id, title, image }) => (
        <LargeTile
          link='/networks'
          renderAction={() => (
            <Button variant='primary' onClick={() => console.log('test')}>
              Join
            </Button>
          )}
          id={id}
          key={`networks-${id}`}
          title={title}
          participants={120}
          image={normalizeImage(image)}
        />
      ))}
    </Carousel>
  );
};

export default NetworkCarousel;
