import { BaseElement } from '@beans/foundation';
import { BodyText } from '@beans/typography';
import styled, { css } from 'styled-components';

import { textXX } from 'styles';
import Media from 'styles/media';

export const TileText = styled(BodyText)`
  && {
    margin-top: 8px;
    align-items: center;
    display: flex;
    ${textXX}
  }
`;

export const DescriptionContainer = styled(BaseElement)`
  height: ${({ descriptionHeight }: { descriptionHeight: string }) =>
    descriptionHeight};
  margin-top: 4px;
  overflow: hidden;
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
