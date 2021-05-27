import { BaseElement } from '@beans/foundation';
import styled, { css } from 'styled-components';

import { textXX } from 'styles';
import Media from 'styles/media';

import { Type } from '../../config/types';

export const Wrapper = styled.div`
  height: 100%;

  section {
    height: 100%;
  }
`;

export const TileText = styled.div<{ type?: Type }>`
  && {
    padding: ${({ type }) => (type == Type.WIDE ? '0 16px' : '0 8px')};
    align-items: center;
    display: flex;
    ${textXX}
  }

  svg {
    width: ${({ type }) => (type == Type.WIDE ? '17px' : '12px')};
    height: ${({ type }) => (type == Type.WIDE ? '17px' : '12px')};
  }
`;

export const DescriptionContainer = styled(BaseElement)`
  height: ${({ descriptionHeight }: { descriptionHeight: string }) =>
    descriptionHeight};
  margin-top: 4px;
  overflow: hidden;
`;

export const TileMeta = styled.div<{ type?: Type }>`
  && {
    padding: ${({ type }) => (type == Type.WIDE ? '0 16px' : '0 8px')};
    margin-bottom: ${({ type }) => (type == Type.WIDE ? '8px' : '4px')};
    ${textXX};

    ${({ theme }) => css`
      ${Media.tablet`
        display: block;
        color: ${theme.colors.grayscale};
      `}
    `}
  }
`;

export const ImageWrapper = styled.div<{ imageHeight: string }>`
  max-height: ${({ imageHeight }) => imageHeight};
  overflow: hidden;
`;
