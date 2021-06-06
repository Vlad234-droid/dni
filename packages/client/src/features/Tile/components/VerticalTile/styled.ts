import styled from 'styled-components';
import { BaseElement } from '@beans/foundation';

import Media from 'styles/media';

import { Type } from '../../config/types';

export const Wrapper = styled.div`
  position: relative;

  & .beans-base-tile__panel-container {
    padding: 0;
    justify-content: flex-end;
  }

  & .beans-icon__svg {
    margin-right: 8px;
  }

  & .beans-base-tile__content-container {
    padding-bottom: 16px;
  }

  & p {
    margin: 0 16px 11px;
  }
`;

export const ActionContainer = styled(BaseElement)`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: ${({ theme }) => `1px solid ${theme.colors.lines.base}`};
  //margin-bottom: -16px;
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
