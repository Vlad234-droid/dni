import React, { FC } from 'react';
import { VERTICAL } from '@beans/constants';

import Tile from 'features/Tile';
import { OnAir } from 'features/Common';

import { Type } from '../../config/types';
import { Wrapper, ActionContainer, StatusContainer } from './styled';

const TEST_ID = 'vertical-tile';

type Props = {
  // type?: Type;
  id: number;
  title: string;
  // participants: number;
  link: string;
  image?: {
    alternativeText: string;
    url: string;
  } | null;
  renderAction: () => JSX.Element;
  renderDateTime?: () => JSX.Element;
  renderParticipants?: () => JSX.Element;
  // meta?: string;
  isOnAir?: boolean;
  // maxParticipants?: number;
  // hideMaxParticipants?: boolean;
  // hideParticipants?: boolean;
  // wrapperHeight?: string;
};

const VerticalTile: FC<Props> = ({
  title,
  // participants,
  image,
  renderAction,
  renderDateTime,
  renderParticipants,
  link,
  isOnAir,
  id,
}) => (
  <Wrapper data-testid={TEST_ID}>
    {isOnAir && (
      <StatusContainer>
        <OnAir />
      </StatusContainer>
    )}
    <Tile
      // type={type}
      id={id}
      link={link}
      renderAction={() => <ActionContainer>{renderAction()}</ActionContainer>}
      renderDateTime={renderDateTime}
      renderParticipants={renderParticipants}
      title={title}
      image={image}
      orientation={{
        aboveTablet: VERTICAL,
        belowTablet: VERTICAL,
      }}
      imageHeight='140px'
    />
  </Wrapper>
);

export { TEST_ID };

export default VerticalTile;
