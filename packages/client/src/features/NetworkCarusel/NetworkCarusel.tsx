import React, { FC } from 'react';

import Carousel from 'features/Carousel';
import NetworkTile from 'features/NetworkTile';

// TODO: remove in the feature
import { networks } from 'features/Page/components/Networks/data';

const NetworkCarusel: FC = () => {
  return (
    <Carousel itemWidth='278px' id='network-carousel'>
      {networks.map(({ id, title, participants, members, image }) => (
        <NetworkTile
          id={id}
          key={id}
          title={title}
          participants={participants}
          members={members}
          image={image}
        />
      ))}
    </Carousel>
  );
};

export default NetworkCarusel;
