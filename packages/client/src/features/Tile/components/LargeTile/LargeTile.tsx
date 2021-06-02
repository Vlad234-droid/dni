import React, { FC } from 'react';
import { VERTICAL } from '@beans/constants';

import Tile from 'features/Tile';
import { OnAir } from 'features/Common';

import { Type } from '../../config/types';
import { Wrapper, ActionContainer, StatusContainer } from './styled';

const TEST_ID = 'large-tile';

type Props = {
  type?: Type;
  id: number;
  title: string;
  participants: number;
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
  hideParticipants?: boolean;
  imageHeight?: string;
  wrapperHeight?: string;
};

const LargeTile: FC<Props> = ({
  title,
  participants,
  image,
  renderAction,
  link,
  meta,
  isOnAir,
  maxParticipants,
  hideMaxParticipants,
  hideParticipants,
  id,
  imageHeight = '276px',
  wrapperHeight,
  type = Type.WIDE,
}) => (
  <Wrapper data-testid={TEST_ID} height={wrapperHeight} type={type}>
    {isOnAir && (
      <StatusContainer>
        <OnAir />
      </StatusContainer>
    )}
    <Tile
      type={type}
      id={id}
      link={link}
      renderAction={() => (
        <ActionContainer type={type} hideParticipants={hideParticipants}>
          {renderAction()}
        </ActionContainer>
      )}
      meta={meta}
      title={title}
      participants={participants}
      maxParticipants={maxParticipants}
      hideMaxParticipants={hideMaxParticipants}
      hideParticipants={hideParticipants}
      image={image}
      orientation={{
        aboveTablet: VERTICAL,
        belowTablet: VERTICAL,
      }}
      imageHeight={imageHeight}
    />
  </Wrapper>
);

export { TEST_ID };

export default LargeTile;
