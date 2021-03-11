import React, { FC } from 'react';

import Carousel from 'features/Carousel';
import EventTile from 'features/EventTile';

// TODO: remove in the feature
import { events } from 'features/Page/components/Events/data';

const EventCarusel: FC = () => {
  return (
    <Carousel itemWidth='278px' id='event-carousel'>
      {events.map(({ id, title, participants, image, createdAt }) => (
        <EventTile
          key={id}
          id={id}
          title={title}
          participants={participants}
          createdAt={createdAt}
          image={image}
        />
      ))}
    </Carousel>
  );
};

export default EventCarusel;
