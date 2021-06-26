import React, { FC } from 'react';
import { WindowResize } from '@beans/helpers';
import ResponsiveImage from '@beans/responsive-image';
import { HORIZONTAL, VERTICAL } from '@beans/constants';
import BaseTile from '@beans/base-tile';

import { TextWithEllipsis } from 'features/Common';
import defaultImage from 'assets/pride-logo.jpg';

import Description from '../Description';
import { DescriptionContainer, Wrapper } from './styled';

type Props = {
  id: number;
  title: string;
  description?: string;
  link: string;
  renderAction: () => JSX.Element;
  renderMeta?: () => JSX.Element;
  image?: {
    alternativeText: string;
    url: string;
  } | null;
  orientation: {
    aboveTablet: typeof HORIZONTAL | typeof VERTICAL;
    belowTablet: typeof HORIZONTAL | typeof VERTICAL;
  };
  imageHeight?: string;
  imageWidth?: string;
  tooltipPosition: { top: string; left: string };
};

const Tile: FC<Props> = ({
  title,
  description,
  image,
  link,
  renderAction,
  renderMeta,
  orientation,
  id,
  imageHeight,
  imageWidth = '100%',
  tooltipPosition,
}) => {
  return (
    <Wrapper>
      <BaseTile
        ariaLabel={title}
        href={`${link}/${id}`}
        orientation={orientation}
        root={false}
        responsiveImage={
          <ResponsiveImage
            alt={image?.alternativeText || 'Tesco logo'}
            title={image?.alternativeText || 'Tesco logo'}
            src={image?.url || defaultImage}
            fallbackSizeRatio='57%'
            minHeight={imageHeight}
            maxHeight={imageHeight}
            maxWidth={imageWidth}
            minWidth={imageWidth}
            positioning={image?.url ? 'top' : 'center'}
            objectFit={image?.url ? 'cover' : 'contain'}
          />
        }
        title={
          <TextWithEllipsis href={`${link}/${id}`} fullWidthTooltip tooltipPosition={tooltipPosition}>
            {title}
          </TextWithEllipsis>
        }
      >
        {description && (
          <DescriptionContainer>
            <WindowResize>
              <Description ellipse>{description}</Description>
            </WindowResize>
          </DescriptionContainer>
        )}
        {renderMeta && renderMeta()}
        {renderAction()}
      </BaseTile>
    </Wrapper>
  );
};

export default Tile;
