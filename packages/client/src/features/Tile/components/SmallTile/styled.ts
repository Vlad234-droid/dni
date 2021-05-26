import styled from 'styled-components';
import { BaseElement } from '@beans/foundation';

import { textXS } from 'styles';

export const Wrapper = styled.div`
  position: relative;

  & .beans-base-tile__panel-container {
    padding: 4px 16px 0;
  }

  & .beans-icon__svg {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }

  & h3 .beans-multi-line-ellipsis__visible-text {
    ${textXS};
  }

  & .beans-base-tile__content-container {
    position: relative;
    bottom: 8px;
  }

  & .beans-button__container {
    height: 32px;
  }

  & .beans-responsive-image__image {
    height: 100%;
    width: unset;
  }

  & p {
    margin-bottom: 8px;
  }
`;

export const ActionContainer = styled(BaseElement)`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  margin-bottom: 0;
  padding: 5px;
  max-width: 112px;

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
