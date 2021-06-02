import React, { FC } from 'react';
import isNumber from 'lodash.isnumber';
import Icon from '@beans/icon';
import { WindowResize } from '@beans/helpers';
import ResponsiveImage from '@beans/responsive-image';
import { HORIZONTAL, VERTICAL } from '@beans/constants';
import BaseTile from '@beans/base-tile';

import { TextWithEllipsis } from 'features/Common';

import { Type } from '../../config/types';
import Description from '../Description';
import { DescriptionContainer, TileMeta, TileText, Wrapper } from './styled';

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
  hideParticipants?: boolean;
  image?: {
    alternativeText: string;
    url: string;
  } | null;
  orientation: {
    aboveTablet: typeof HORIZONTAL | typeof VERTICAL;
    belowTablet: typeof HORIZONTAL | typeof VERTICAL;
  };
  imageHeight: string;
  type?: Type;
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
  hideParticipants = false,
  id,
  imageHeight,
  type = Type.WIDE,
}) => {
  return (
    <Wrapper>
      <BaseTile
        href={`${link}/${id}`}
        orientation={orientation}
        responsiveImage={
          <ResponsiveImage
            alt={image?.alternativeText}
            src={image?.url}
            fallbackSizeRatio='57%'
            minHeight='116px'
            maxHeight={imageHeight}
            maxWidth='100%'
            objectFit='contain'
          />
        }
        title={
          <TextWithEllipsis
            height={hideParticipants && type == Type.NARROW ? 'auto' : '30px'}
            href={`${link}/${id}`}
          >
            {title}
          </TextWithEllipsis>
        }
      >
        {description && (
          <DescriptionContainer descriptionHeight={`${descriptionHeight}px`}>
            <WindowResize>
              <Description ellipse>{description}</Description>
            </WindowResize>
          </DescriptionContainer>
        )}
        {meta && <TileMeta type={type}>{meta}</TileMeta>}
        {isNumber(participants) && (
          <TileText type={type}>
            <Icon graphic='account' size={'sm'} />
            {participants}
            {!hideMaxParticipants && maxParticipants && ` / ${maxParticipants}`}
            &nbsp; participants
          </TileText>
        )}
        {renderAction()}
      </BaseTile>
    </Wrapper>
  );
};

export default Tile;
