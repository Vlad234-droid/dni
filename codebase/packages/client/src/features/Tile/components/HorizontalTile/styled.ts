import styled from 'styled-components';
import { BaseElement } from '@beans/foundation';

import Media from 'styles/media';

export const Wrapper = styled.div`
  position: relative;

  h5 {
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 4px;
  }

  & .beans-base-tile__panel-container {
    width: 70%;
    padding: 8px 8px 14px;

    ${Media.large_phone`
        padding: 8px 16px 15px;
    `}
  }

  & .beans-icon__svg {
    width: 14px;
    height: 14px;
    margin-right: 8px;
  }

  & .beans-button__container {
    padding: 0;
  }

  & .beans-responsive-image__image {
    height: 100%;
    width: unset;
  }
`;

export const Meta = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.grayscale};
  margin-bottom: 4px;
`;

export const ActionWrapper = styled(BaseElement)`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -5px;
  padding: 5px;
  max-width: 300px;

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
