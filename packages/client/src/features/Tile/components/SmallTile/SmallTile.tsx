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
  renderAction: (id: number) => JSX.Element;
  meta?: string;
  hideParticipants?: boolean;
  isOnAir?: boolean;
};

const SmallTile: FC<Props> = ({
  title,
  participants,
  image,
  renderAction,
  link,
  meta,
  hideParticipants,
  id,
}) => (
  <Wrapper data-testid={TEST_ID}>
    <Tile
      id={id}
      link={link}
      renderAction={() => <ActionContainer>{renderAction(id)}</ActionContainer>}
      meta={meta}
      title={title}
      participants={participants}
      hideParticipants={hideParticipants}
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
