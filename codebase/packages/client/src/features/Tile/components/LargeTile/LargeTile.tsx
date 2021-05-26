import React, { FC } from 'react';
import { VERTICAL } from '@beans/constants';

import Tile from 'features/Tile';
import { StatusLabel, StatusType } from 'features/Common';

import { Wrapper, ActionContainer, StatusContainer } from './styled';

const TEST_ID = 'large-tile';

type Props = {
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
  id,
  imageHeight = '276px',
  wrapperHeight,
}) => (
  <Wrapper data-testid={TEST_ID} height={wrapperHeight}>
    {isOnAir && (
      <StatusContainer>
        <StatusLabel type={StatusType.SUCCESS}>On-Air</StatusLabel>
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
        aboveTablet: VERTICAL,
        belowTablet: VERTICAL,
      }}
      imageHeight={imageHeight}
    />
  </Wrapper>
);

export { TEST_ID };

export default LargeTile;
