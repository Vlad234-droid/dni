import React, { FC } from 'react';
import { VERTICAL } from '@beans/constants';

import Tile from 'features/Tile';
import { StatusLabel, StatusType } from 'features/Common';

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
  isOnAir?: boolean;
};

const LargeTile: FC<Props> = ({
  title,
  participants,
  image,
  renderAction,
  link,
  meta,
  isOnAir,
  id,
}) => (
  <Wrapper>
    {isOnAir && (
      <StatusContainer>
        <StatusLabel type={StatusType.SUCCESS}>On-Air</StatusLabel>
      </StatusContainer>
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
