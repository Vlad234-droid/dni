import React, { FC } from 'react';
import Button from '@beans/button';

import Carousel from 'features/Carousel';
import { LargeTile } from 'features/Tile';

// TODO: remove in the feature
import { events } from 'features/Page/components/Events/data';

const EventCarousel: FC = () => {
  return (
    <Carousel itemWidth='278px' id='event-carousel'>
      {events.map(({ id, title, participants, image, createdAt }) => (
        <LargeTile
          key={id}
          id={id}
          title={title}
          participants={participants}
          link='/events'
          renderMeta={() => <span>{createdAt}</span>}
          renderAction={() => (
            <Button variant='primary' onClick={() => console.log('test')}>
              Take part
            </Button>
          )}
          image={image}
        />
      ))}
    </Carousel>
  );
};

export default EventCarousel;
