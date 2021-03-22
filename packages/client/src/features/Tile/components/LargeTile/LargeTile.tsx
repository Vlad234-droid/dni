import React, { FC } from 'react';
import { VERTICAL } from '@beans/constants';

import Tile from 'features/Tile';

import { Wrapper, ActionContainer, TileMeta } from './styled';

type Props = {
  id: number;
  title: string;
  participants: number;
  link: string;
  image: {
    alt: string;
    src: string;
  };
  renderAction: () => JSX.Element;
  renderMeta?: () => JSX.Element;
};

const LargeTile: FC<Props> = ({
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
        belowTablet: VERTICAL,
      }}
    />
  </Wrapper>
);

export default LargeTile;
