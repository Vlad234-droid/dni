import { BaseElement } from '@beans/foundation';
import { BodyText } from '@beans/typography';
import styled from 'styled-components';

import { textXX } from 'styles';

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
