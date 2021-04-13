import styled from 'styled-components';
import { BaseElement } from '@beans/foundation';

import { textXS } from 'styles';

export const Wrapper = styled.div`
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

  & .beans-title-link__container {
    height: 20px;
    margin-bottom: 12px;
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
  padding: 0;
  max-width: 102px;

  & > button {
    width: 100%;
  }
`;
