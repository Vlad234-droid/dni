import React, { FC } from 'react';
import Button from '@beans/button';

import Tile from 'features/Tile';

type Props = {
  id: number;
  title: string;
  participants: number;
  createdAt: string;
  image: {
    alt: string;
    src: string;
  };
};

const EventTile: FC<Props> = ({ title, participants, createdAt, image }) => {
  return (
    <Tile
      link='/events'
      renderMeta={() => <span>{createdAt}</span>}
      renderAction={() => (
        <Button variant='primary' onClick={() => console.log('test')}>
          Take part
        </Button>
      )}
      title={title}
      participants={participants}
      image={image}
    />
  );
};

export default EventTile;
