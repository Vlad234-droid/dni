import React, { FC } from 'react';
import { WindowResize } from '@beans/helpers';
import Icon from '@beans/icon';
import ResponsiveImage from '@beans/responsive-image';
import { TitleWithEllipsis } from '@beans/title-link';

import Description from '../Description';
import {
  BaseTile,
  DescriptionContainer,
  TileText,
  TileMeta,
  ActionContainer,
} from './styled';

type Props = {
  title: string;
  description?: string;
  descriptionHeight?: number;
  link: string;
  renderAction: () => JSX.Element;
  renderMeta: () => JSX.Element;
  participants: number;
  image: {
    alt: string;
    src: string;
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
}) => {
  return (
    <BaseTile
      href={link}
      responsiveImage={
        <ResponsiveImage
          alt={image.alt}
          src={image.src}
          fallbackSizeRatio='57%'
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
      <TileMeta>{renderMeta()}</TileMeta>
      <TileText>
        <Icon graphic='account' size={'sm'} />
        {participants} participants
      </TileText>
      <ActionContainer>{renderAction()}</ActionContainer>
    </BaseTile>
  );
};

export default Tile;
