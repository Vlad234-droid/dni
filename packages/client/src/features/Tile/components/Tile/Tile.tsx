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
  title: string;
  description?: string;
  descriptionHeight?: number;
  link: string;
  renderAction: () => JSX.Element;
  meta?: string;
  participants?: number;
  hideParticipants?: boolean;
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
  meta,
  orientation,
  hideParticipants = false,
}) => {
  const memoizedParticipants = useMemo(() => {
    if (!isNumber(participants) || hideParticipants) return null;

    return (
      <TileText>
        <Icon graphic='account' size={'sm'} />
        {participants} participants
      </TileText>
    );
  }, [participants, hideParticipants]);

  const memoizedTitle = useMemo(
    () => (
      <TitleWithEllipsis maxLines={1} titleHeight='30px'>
        {title}
      </TitleWithEllipsis>
    ),
    [title],
  );

  const memoizedMeta = useMemo(() => {
    if (!meta) return null;

    return <TileMeta>{meta}</TileMeta>;
  }, [meta]);

  // TODO move image normalization to action when loading images?
  //@ts-ignore
  const memoizedImage = useMemo(() => normalizeImage(image), [image]);

  // TODO: is it needed?
  const memoizedDescription = useMemo(() => {
    if (!description) return null;

    return (
      <DescriptionContainer descriptionHeight={`${descriptionHeight}px`}>
        <WindowResize>
          <Description ellipse>{description}</Description>
        </WindowResize>
      </DescriptionContainer>
    );
  }, [description, descriptionHeight]);

  return (
    <BaseTile
      href={link}
      orientation={orientation}
      responsiveImage={
        <ResponsiveImage
          alt={memoizedImage?.alternativeText}
          src={memoizedImage?.url}
          fallbackSizeRatio='57%'
          maxHeight='120px'
          maxWidth='100%'
          objectFit='cover'
        />
      }
      title={memoizedTitle}
    >
      {memoizedDescription}
      {memoizedMeta}
      {memoizedParticipants}
      {renderAction()}
    </BaseTile>
  );
};

export default Tile;
