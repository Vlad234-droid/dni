import React, { FC } from 'react';

import { Wrapper, ListContainer } from './styled';
import Heading, { Size, Color } from 'features/Heading';
import EventTile from 'features/EventTile';

// TODO: remove in the feature
import { events } from 'features/Page/components/Events/data';

const EventList: FC = () => {
  return (
    <Wrapper>
      <Heading size={Size.md} color={Color.black}>
        New Events
      </Heading>
      <ListContainer>
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
      </ListContainer>
    </Wrapper>
  );
};

export default EventList;
