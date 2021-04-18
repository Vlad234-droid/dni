import React, { FC } from 'react';
import { VERTICAL } from '@beans/constants';

import Tile from 'features/Tile';

import { Wrapper, ActionContainer, StatusContainer } from './styled';

type Props = {
  id: number;
  title: string;
  participants: number;
  link: string;
  image?: {
    alternativeText: string;
    url: string;
  } | null;
  renderAction: (id: number) => JSX.Element;
  meta?: string;
  renderStatus?: () => JSX.Element;
  isOnAir?: boolean;
};

const LargeTile: FC<Props> = ({
  title,
  participants,
  image,
  renderAction,
  renderStatus,
  link,
  meta,
  isOnAir,
  id,
}) => (
  <Wrapper>
    {isOnAir && renderStatus && (
      <StatusContainer>{renderStatus()}</StatusContainer>
    )}
    <Tile
      id={id}
      link={link}
      renderAction={() => <ActionContainer>{renderAction(id)}</ActionContainer>}
      meta={meta}
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
