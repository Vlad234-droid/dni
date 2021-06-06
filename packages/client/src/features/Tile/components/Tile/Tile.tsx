import React, { FC } from 'react';
import isNumber from 'lodash.isnumber';
import Icon from '@beans/icon';
import { WindowResize } from '@beans/helpers';
import ResponsiveImage from '@beans/responsive-image';
import { HORIZONTAL, VERTICAL } from '@beans/constants';
import BaseTile from '@beans/base-tile';

import { TextWithEllipsis } from 'features/Common';
import defaultImage from 'assets/pride-logo.jpg';

import { Type } from '../../config/types';
import Description from '../Description';
import {
  DescriptionContainer,
  TileMeta,
  TileText,
  Wrapper,
  ImageWrapper,
} from './styled';

type Props = {
  id: number;
  title: string;
  description?: string;
  link: string;
  renderAction: () => JSX.Element;
  renderParticipants?: () => JSX.Element;
  renderDateTime?: () => JSX.Element;
  // meta?: string;
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
  type?: Type;
};

const Tile: FC<Props> = ({
  title,
  description,
  image,
  link,
  renderAction,
  renderDateTime,
  renderParticipants,
  // meta,
  orientation,
  // hideParticipants = false,
  id,
  imageHeight,
  imageWidth = '100%',
  // type = Type.WIDE,
}) => {
  return (
    <Wrapper>
      <BaseTile
        href={`${link}/${id}`}
        orientation={orientation}
        responsiveImage={
          <ResponsiveImage
            alt={image?.alternativeText || 'Tesco'}
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
          <TextWithEllipsis
            // height={hideParticipants && type == Type.NARROW ? 'auto' : '30px'}
            href={`${link}/${id}`}
          >
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
        {renderDateTime && renderDateTime()}
        {renderParticipants && renderParticipants()}
        {/*{meta && <TileMeta type={type}>{meta}</TileMeta>}*/}
        {/*{isNumber(participants) && (*/}
        {/*  <TileText type={type}>*/}
        {/*    <Icon graphic='account' size={'sm'} />*/}
        {/*    {participants}*/}
        {/*    {!hideMaxParticipants && maxParticipants && ` / ${maxParticipants}`}*/}
        {/*    &nbsp; participants*/}
        {/*  </TileText>*/}
        {/*)}*/}
        {renderAction()}
      </BaseTile>
    </Wrapper>
  );
};

export default Tile;
