import React, { FC } from 'react';

import { Wrapper, ListContainer } from './styled';
import Heading, { Size, Color } from 'features/Heading';
import NetworkTile from '../NetworkTile';

import networks from './networks';

const NetworkList: FC = () => {
  return (
    <Wrapper>
      <Heading size={Size.md} color={Color.black}>
        New Networks
      </Heading>
      <ListContainer>
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
      </ListContainer>
    </Wrapper>
  );
};

export default NetworkList;
