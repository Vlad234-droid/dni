import styled, { css } from 'styled-components';
import { BaseElement } from '@beans/foundation';
import { BodyText } from '@beans/typography';

import Media from 'styles/media';
import { textXS, textXX } from 'styles';

export const Wrapper = styled.div`
  margin-bottom: 16px;
  width: 100%;

  ${Media.tablet`
      width: calc(100% / 3 - 8px);
      margin: 0 4px 24px;
  `}

  ${Media.small_desktop`
      width: calc(100% / 4 - 8px);
      margin: 0 4px 24px;
  `}

  ${Media.desktop`
      width: calc(100% / 5 - 8px);
  `}

  & .beans-base-tile__panel-container {
    padding: 8px 16px 0;

    ${Media.tablet`
      padding: 0;
  `}
  }

  & .beans-icon__svg {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }

  & h3 .beans-multi-line-ellipsis__visible-text {
    ${textXS}
  }

  & .beans-title-link__container {
    ${Media.tablet`
        margin: 12px 12px 0;
      `}
  }

  & .beans-base-tile__content-container {
    position: relative;
    bottom: 12px;

    ${Media.tablet`
        margin: 0;
      `}
  }

  & .beans-title-link__container {
    height: 20px;
    margin-bottom: 8px;
  }

  & .beans-button__container {
    height: 32px;

    ${Media.tablet`
        height: 40px;
      `}
  }

  & .beans-responsive-image__image {
    height: 106px;
    width: unset;

    ${Media.tablet`
        height: unset;
        width: 100%;
      `}
  }

  & p {
    margin-bottom: 8px;

    ${Media.tablet`
        margin: 8px 12px 0 !important;
      `}
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

  ${({ theme }) => css`
    ${Media.tablet`
        max-width: unset;
        margin-top: 12px;
        margin-bottom: -12px;
        padding: 16px 18px;
        border-top: 1px solid ${theme.colors.lines.base};
      `}
  `}

  & > button {
    width: 100%;
  }
`;

export const TileMeta = styled(BodyText)`
  && {
    display: none;
    ${textXX};

    ${({ theme }) => css`
      ${Media.tablet`
        display: block;
        color: ${theme.colors.grayscale};
        margin-top: 8px;
      `}
    `}
  }
`;
