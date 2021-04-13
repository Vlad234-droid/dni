import React, { FC } from 'react';
import { HORIZONTAL } from '@beans/constants';

import Tile from 'features/Tile';

import { Wrapper, ActionContainer } from './styled';

type Props = {
  id: number;
  title: string;
  participants?: number;
  link: string;
  image: {
    alternativeText: string;
    url: string;
  } | null;
  renderAction: () => JSX.Element;
  meta?: string;
  hideParticipants?: boolean;
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
  <Wrapper>
    <Tile
      id={id}
      link={link}
      renderAction={() => <ActionContainer>{renderAction()}</ActionContainer>}
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

export default SmallTile;
