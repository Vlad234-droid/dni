import React, { FC } from 'react';
import { HORIZONTAL } from '@beans/constants';

import Tile from 'features/Tile';
import { OnAir } from 'features/Common';

import { Type } from '../../config/types';
import { Wrapper, ActionContainer, StatusContainer } from './styled';

const TEST_ID = 'horizontal-tile';

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
  renderDateTime?: () => JSX.Element;
  renderParticipants?: () => JSX.Element;
  isOnAir?: boolean;
  type: Type;
};

const HorizontalTile: FC<Props> = ({
  title,
  image,
  renderAction,
  renderDateTime,
  renderParticipants,
  link,
  id,
  isOnAir,
}) => (
  <Wrapper data-testid={TEST_ID}>
    {isOnAir && (
      <StatusContainer>
        <OnAir small />
      </StatusContainer>
    )}
    <Tile
      id={id}
      link={link}
      renderAction={() => <ActionContainer>{renderAction()}</ActionContainer>}
      renderDateTime={renderDateTime}
      renderParticipants={renderParticipants}
      title={title}
      image={image}
      orientation={{
        aboveTablet: HORIZONTAL,
        belowTablet: HORIZONTAL,
      }}
      imageHeight='126px'
      imageWidth='80px'
    />
  </Wrapper>
);

export { TEST_ID };

export default HorizontalTile;
