import React, { FC } from 'react';
import Button from '@beans/button';

import Carousel from 'features/Carousel';
import { LargeTile } from 'features/Tile';

// TODO: remove in the feature
import { networks } from 'features/Page/components/Networks/data';

const NetworkCarousel: FC = () => {
  return (
    <Carousel itemWidth='278px' id='network-carousel'>
      {networks.map(({ id, title, participants, image }) => (
        <LargeTile
          link='/networks'
          renderAction={() => (
            <Button variant='primary' onClick={() => console.log('test')}>
              Join
            </Button>
          )}
          id={id}
          key={id}
          title={title}
          participants={participants}
          image={image}
        />
      ))}
    </Carousel>
  );
};

export default NetworkCarousel;
