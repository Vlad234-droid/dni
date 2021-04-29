import React, { FC } from 'react';
import { HORIZONTAL } from '@beans/constants';

import Tile from 'features/Tile';
import { StatusLabel, StatusType } from 'features/Common';

import { Wrapper, ActionContainer, StatusContainer } from './styled';

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
  maxHeight?: string;
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
  maxHeight = '165px',
  isOnAir,
}) => (
  <Wrapper data-testid={TEST_ID}>
    {isOnAir && (
      <StatusContainer>
        <StatusLabel type={StatusType.SUCCESS} small />
      </StatusContainer>
    )}
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
      maxHeight={maxHeight}
    />
  </Wrapper>
);

export { TEST_ID };

export default SmallTile;
