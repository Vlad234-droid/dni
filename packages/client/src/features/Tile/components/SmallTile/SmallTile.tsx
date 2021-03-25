import React, { FC } from 'react';
import { VERTICAL, HORIZONTAL } from '@beans/constants';

import Tile from 'features/Tile';

import { Wrapper, ActionContainer, TileMeta } from './styled';

type Props = {
  id: number;
  title: string;
  participants: number;
  link: string;
  image: {
    alternativeText: string;
    url: string;
  } | null;
  renderAction: () => JSX.Element;
  renderMeta?: () => JSX.Element;
};

const SmallTile: FC<Props> = ({
  title,
  participants,
  image,
  renderAction,
  link,
  renderMeta,
}) => (
  <Wrapper>
    <Tile
      link={link}
      renderAction={() => <ActionContainer>{renderAction()}</ActionContainer>}
      renderMeta={() => renderMeta && <TileMeta>{renderMeta()}</TileMeta>}
      title={title}
      participants={participants}
      image={image}
      orientation={{
        aboveTablet: VERTICAL,
        belowTablet: HORIZONTAL,
      }}
    />
  </Wrapper>
);

export default SmallTile;
