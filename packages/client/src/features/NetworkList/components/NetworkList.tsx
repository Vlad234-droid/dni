import React, { FC } from 'react';
import Button from '@beans/button';

import Heading, { Size, Color } from 'features/Heading';
import { SmallTile } from 'features/Tile';
import networks from '../networks';
import { Wrapper, ListContainer } from './styled';

const NetworkList: FC = () => {
  return (
    <Wrapper>
      <Heading size={Size.md} color={Color.black}>
        New Networks
      </Heading>
      <ListContainer>
        {networks.map(({ id, title, participants, image }) => (
          <SmallTile
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
      </ListContainer>
    </Wrapper>
  );
};

export default NetworkList;
