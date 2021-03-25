import React, { FC } from 'react';
import { WindowResize } from '@beans/helpers';
import Icon from '@beans/icon';
import ResponsiveImage from '@beans/responsive-image';
import { TitleWithEllipsis } from '@beans/title-link';
import { HORIZONTAL, VERTICAL } from '@beans/constants';
import BaseTile from '@beans/base-tile';

import Description from '../Description';
import { DescriptionContainer, TileText } from './styled';

type Props = {
  title: string;
  description?: string;
  descriptionHeight?: number;
  link: string;
  renderAction: () => JSX.Element;
  renderMeta: () => JSX.Element | undefined;
  participants: number;
  image: {
    alternativeText: string;
    url: string;
  } | null;
  orientation: {
    aboveTablet: typeof HORIZONTAL | typeof VERTICAL;
    belowTablet: typeof HORIZONTAL | typeof VERTICAL;
  };
};

const Tile: FC<Props> = ({
  title,
  description,
  descriptionHeight,
  participants,
  image,
  link,
  renderAction,
  renderMeta,
  orientation,
}) => {
  return (
    <BaseTile
      href={link}
      orientation={orientation}
      responsiveImage={
        <ResponsiveImage
          alt={image && image.alternativeText}
          src={image && image.url}
          fallbackSizeRatio='57%'
          maxHeight='120px'
          maxWidth='100%'
          objectFit='cover'
        />
      }
      title={
        <TitleWithEllipsis maxLines={1} titleHeight='30px'>
          {title}
        </TitleWithEllipsis>
      }
    >
      {description && (
        <DescriptionContainer descriptionHeight={`${descriptionHeight}px`}>
          <WindowResize>
            <Description ellipse>{description}</Description>
          </WindowResize>
        </DescriptionContainer>
      )}
      {renderMeta && renderMeta()}
      <TileText>
        <Icon graphic='account' size={'sm'} />
        {participants} participants
      </TileText>
      {renderAction()}
    </BaseTile>
  );
};

export default Tile;
