import React, { FC } from 'react';
import { HORIZONTAL } from '@beans/constants';

import Tile from 'features/Tile';

import { Wrapper, ActionContainer } from './styled';

const TEST_ID = 'small-tile';

type Props = {
  id: number;
  title: string;
  participants?: number;
  link: string;
  image?: {
    alternativeText: string;
    url: string;
  } | null;
  renderAction: () => JSX.Element;
  meta?: string;
  isOnAir?: boolean;
  maxParticipants?: number;
  hideMaxParticipants?: boolean;
};

const SmallTile: FC<Props> = ({
  title,
  participants,
  image,
  renderAction,
  link,
  meta,
  maxParticipants,
  hideMaxParticipants,
  id,
}) => (
  <Wrapper data-testid={TEST_ID}>
    <Tile
      id={id}
      link={link}
      renderAction={() => <ActionContainer>{renderAction()}</ActionContainer>}
      meta={meta}
      title={title}
      participants={participants}
      maxParticipants={maxParticipants}
      hideMaxParticipants={hideMaxParticipants}
      image={image}
      orientation={{
        aboveTablet: HORIZONTAL,
        belowTablet: HORIZONTAL,
      }}
    />
  </Wrapper>
);

export { TEST_ID };

export default SmallTile;
