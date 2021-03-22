import React, { FC } from 'react';
import Button from '@beans/button';

import Heading, { Size, Color } from 'features/Heading';
import { SmallTile } from 'features/Tile';

// TODO: remove in the feature
import { newEvents } from 'features/Page/components/Events/data';
import { Wrapper, ListContainer } from './styled';

const EventList: FC = () => {
  return (
    <Wrapper>
      <Heading size={Size.md} color={Color.black}>
        New Events
      </Heading>
      <ListContainer>
        {newEvents.map(({ id, title, participants, image, createdAt }) => (
          <SmallTile
            link='/events'
            key={id}
            id={id}
            title={title}
            participants={participants}
            renderAction={() => (
              <Button variant='primary' onClick={() => console.log('test')}>
                Take part
              </Button>
            )}
            renderMeta={() => <span>{createdAt}</span>}
            image={image}
          />
        ))}
      </ListContainer>
    </Wrapper>
  );
};

export default EventList;
