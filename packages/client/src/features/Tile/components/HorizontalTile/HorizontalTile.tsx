import React, { FC } from 'react';
import { HORIZONTAL } from '@beans/constants';

import Tile from 'features/Tile';
import { OnAir } from 'features/Common';

import { Type } from '../../config/types';
import { Wrapper, ActionWrapper, StatusWrapper, Meta } from './styled';

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
  meta?: string;
  renderParticipants?: () => JSX.Element;
  isOnAir?: boolean;
  type: Type;
};

const HorizontalTile: FC<Props> = ({
  title,
  image,
  renderAction,
  meta,
  renderParticipants,
  link,
  id,
  isOnAir,
}) => (
  <Wrapper data-testid={TEST_ID}>
    {isOnAir && (
      <StatusWrapper>
        <OnAir small />
      </StatusWrapper>
    )}
    <Tile
      id={id}
      link={link}
      renderAction={() => <ActionWrapper>{renderAction()}</ActionWrapper>}
      renderMeta={() => (
        <Meta>
          {meta && <div>{meta}</div>}
          {renderParticipants && renderParticipants()}
        </Meta>
      )}
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
