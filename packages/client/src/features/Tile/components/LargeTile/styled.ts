import styled from 'styled-components';
import { BaseElement } from '@beans/foundation';

import { textSM } from 'styles';
import Media from 'styles/media';

export const Wrapper = styled.div`
  position: relative;

  & .beans-base-tile__panel-container {
    padding: 0;
  }

  & .beans-icon__svg {
    margin-right: 8px;
  }

  & h3 .beans-multi-line-ellipsis__visible-text {
    ${textSM}
  }

  & .beans-title-link__container {
    margin: 16px 16px 0;
  }

  & .beans-base-tile__content-container {
    padding-bottom: 16px;
  }

  & p {
    margin: 8px 16px 0 !important;
  }
`;

export const ActionContainer = styled(BaseElement)`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: ${({ theme }) => `1px solid ${theme.colors.lines.base}`};
  margin-top: 16px;
  margin-bottom: -16px;
  padding: 16px;

  ${Media.large_tablet`
    padding: 16px 18px;
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
