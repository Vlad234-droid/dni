import React, { FC } from 'react';
import Button from '@beans/button';

import Tile from 'features/Tile';

type Props = {
  id: number;
  title: string;
  members: number;
  participants: number;
  image: {
    alt: string;
    src: string;
  };
};

const NetworkTile: FC<Props> = ({ title, members, participants, image }) => {
  return (
    <Tile
      link='/networks'
      renderMeta={() => <span>{members} members</span>}
      renderAction={() => (
        <Button variant='primary' onClick={() => console.log('test')}>
          Join
        </Button>
      )}
      title={title}
      participants={participants}
      image={image}
    />
  );
};

export default NetworkTile;
