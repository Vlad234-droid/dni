import styled, { css } from 'styled-components';
import { BaseElement } from '@beans/foundation';

import Media from 'styles/media';

import { Type } from '../../config/types';

export const WideTileStyles = css`
  margin: 0 16px;
`;

export const NarrowTileStyles = css`
  margin: 0 8px;
`;

export const Wrapper = styled.div<{ type: Type }>`
  position: relative;

  .beans-base-tile__panel-container {
    flex-grow: unset;
  }

  & h5 {
    font-size: 20px;
    line-height: 28px;
    ${({ type }) =>
      type == Type.WIDE
        ? css`
            ${WideTileStyles}
          `
        : css`
            ${NarrowTileStyles}
          `};
    margin-top: ${({ type }) => (type == Type.WIDE ? '16px' : '12px')};
  }

  & .beans-base-tile__panel-container {
    padding: 0;
  }

  & .beans-icon__svg {
    width: ${({ type }) => (type == Type.WIDE ? '20px' : '14px')};
    height: ${({ type }) => (type == Type.WIDE ? '20px' : '14px')};
    margin-right: ${({ type }) => (type == Type.WIDE ? '12px' : '8px')};
  }
`;

export const Meta = styled.div<{ type: Type }>`
  ${({ type }) =>
    type == Type.WIDE
      ? css`
          ${WideTileStyles}
        `
      : css`
          ${NarrowTileStyles}
        `};
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.grayscale};

  & div:not(:last-child) {
    margin-bottom: 9px;
  }
`;

export const ActionWrapper = styled(BaseElement)<{ type: Type }>`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: ${({ theme }) => `1px solid ${theme.colors.lines.base}`};
  padding: 16px;
  margin-top: ${({ type }) => (type == Type.WIDE ? '28px' : '16px')};

  ${Media.large_tablet`
    padding: 16px;
  `}

  & > button {
    width: 100%;
  }
`;

export const StatusWrapper = styled.div`
  position: absolute;
  z-index: 10;
  top: 10px;
  left: 10px;
`;
