import styled from 'styled-components';
import { BaseElement } from '@beans/foundation';

import Media from 'styles/media';

import { Type } from '../../config/types';

export const Wrapper = styled.div<{ height?: string; type?: Type }>`
  position: relative;
  height: ${({ height }) => height || 'unset'};

  & .beans-base-tile__panel-container {
    padding: 0;
    justify-content: flex-end;
  }

  & .beans-icon__svg {
    margin-right: 8px;
  }

  // customize tile TitleWithEllipsis
  & h5 {
    margin: ${({ type }) => (type == Type.WIDE ? '16px 16px 0' : '12px 8px 0')};
    font-size: ${({ type }) => (type == Type.WIDE ? '20px' : '16px')};
    line-height: ${({ type }) => (type == Type.WIDE ? '28px' : '20px')};
  }

  & .beans-base-tile__content-container {
    padding-bottom: 16px;
  }

  & p {
    margin: 0 16px 11px;
  }
`;

export const ActionContainer = styled(BaseElement)<{
  type?: Type;
  hideParticipants?: boolean;
}>`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: ${({ theme }) => `1px solid ${theme.colors.lines.base}`};
  margin-top: ${({ type, hideParticipants }) =>
    type == Type.NARROW || hideParticipants ? '16px' : '34px'};
  margin-bottom: -16px;
  padding: 16px;

  ${Media.large_tablet`
    padding: 16px;
  `}

  & > button {
    width: 100%;
  }
`;

export const StatusContainer = styled.div`
  position: absolute;
  z-index: 10;
  top: 10px;
  left: 10px;
`;
