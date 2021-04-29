import React, { FC, useMemo } from 'react';
import isNumber from 'lodash.isnumber';
import Icon from '@beans/icon';
import { WindowResize } from '@beans/helpers';
import ResponsiveImage from '@beans/responsive-image';
import { TitleWithEllipsis } from '@beans/title-link';
import { HORIZONTAL, VERTICAL } from '@beans/constants';
import BaseTile from '@beans/base-tile';

import { normalizeImage } from 'utils/content';

import Description from '../Description';
import { DescriptionContainer, TileText, TileMeta } from './styled';

type Props = {
  id: number;
  title: string;
  description?: string;
  descriptionHeight?: number;
  link: string;
  renderAction: () => JSX.Element;
  meta?: string;
  participants?: number;
  maxParticipants?: number;
  hideMaxParticipants?: boolean;
  image?: {
    alternativeText: string;
    url: string;
  } | null;
  orientation: {
    aboveTablet: typeof HORIZONTAL | typeof VERTICAL;
    belowTablet: typeof HORIZONTAL | typeof VERTICAL;
  };
  maxHeight: string;
};

const Tile: FC<Props> = ({
  title,
  description,
  descriptionHeight,
  participants,
  image,
  link,
  renderAction,
  meta,
  orientation,
  maxParticipants,
  hideMaxParticipants = false,
  id,
  maxHeight,
}) => {
  // TODO move image normalization to action when loading images?
  //@ts-ignore
  const memoizedImage = useMemo(() => normalizeImage(image), [image]);

  return (
    <BaseTile
      href={`${link}/${id}`}
      orientation={orientation}
      responsiveImage={
        <ResponsiveImage
          alt={memoizedImage?.alternativeText}
          src={memoizedImage?.url}
          fallbackSizeRatio='57%'
          minHeight='116px'
          maxHeight={maxHeight}
          maxWidth='100%'
          objectFit='contain'
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
      {meta && <TileMeta>{meta}</TileMeta>}
      {isNumber(participants) && (
        <TileText>
          <Icon graphic='account' size={'sm'} />
          {participants}
          {!hideMaxParticipants && maxParticipants && ` / ${maxParticipants}`}
          &nbsp; participants
        </TileText>
      )}
      {renderAction()}
    </BaseTile>
  );
};

export default Tile;
