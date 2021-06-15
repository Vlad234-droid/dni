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
  meta?: string;
  renderParticipants?: () => JSX.Element;
  isOnAir?: boolean;
};

const VerticalTile: FC<Props> = ({
  title,
  image,
  renderAction,
  meta,
  renderParticipants,
  link,
  isOnAir,
  id,
  type = Type.WIDE,
}) => {
  console.log('type', type);
  const tooltipPosition = type === Type.WIDE ? { top: '44px', left: '16px' } : { top: '42px', left: '8px' };

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
        renderAction={() => <ActionWrapper type={type}>{renderAction()}</ActionWrapper>}
        renderMeta={() => (
          <Meta type={type}>
            {meta && <div>{meta}</div>}
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
        tooltipPosition={tooltipPosition}
      />
    </Wrapper>
  );
};

export { TEST_ID };

export default VerticalTile;
