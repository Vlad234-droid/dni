import React, { FC } from 'react';
import { VERTICAL } from '@beans/constants';

import Tile from 'features/Tile';
import { OnAir } from 'features/Common';

import { Type } from '../../config/types';
import { Wrapper, ActionWrapper, StatusWrapper, Meta } from './styled';

const TEST_ID = 'vertical-tile';

type Props = {
  type?: Type;
  id: number;
  title: string;
  link: string;
  image?: {
    alternativeText: string;
    url: string;
  } | null;
  renderAction: () => JSX.Element;
  renderDateTime?: () => JSX.Element;
  renderParticipants?: () => JSX.Element;
  isOnAir?: boolean;
};

const VerticalTile: FC<Props> = ({
  title,
  image,
  renderAction,
  renderDateTime,
  renderParticipants,
  link,
  isOnAir,
  id,
  type = Type.WIDE,
}) => {
  return (
    <Wrapper data-testid={TEST_ID} type={type}>
      {isOnAir && (
        <StatusWrapper>
          <OnAir />
        </StatusWrapper>
      )}
      <Tile
        id={id}
        link={link}
        renderAction={() => (
          <ActionWrapper type={type}>{renderAction()}</ActionWrapper>
        )}
        renderMeta={() => (
          <Meta type={type}>
            {renderDateTime && renderDateTime()}
            {renderParticipants && renderParticipants()}
          </Meta>
        )}
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
};

export { TEST_ID };

export default VerticalTile;
