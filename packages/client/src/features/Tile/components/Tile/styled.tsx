import { BaseElement } from '@beans/foundation';
import { spacing } from '@beans/selectors';
import { BodyText } from '@beans/typography';
import styled from 'styled-components';
import BeansBaseTile from '@beans/base-tile';

import { textSM, textXX } from 'styles';

const BaseTile = styled(BeansBaseTile)`
  & > .beans-base-tile__panel-container {
    padding-bottom: 16px;
    padding-left: 16px;
    padding-right: 16px;
  }

  & h3 .beans-multi-line-ellipsis__visible-text {
    ${textSM}
  }
`;

const TileText = styled(BodyText)`
  && {
    margin-top: ${spacing.xs};
    align-items: center;
    display: flex;
    ${textXX}
  }

  & > .beans-icon__svg {
    margin-right: 10px;
  }
`;

const TileMeta = styled(BodyText)`
  && {
    margin-top: ${spacing.xs};
    ${textXX};
    color: ${({ theme }) => theme.colors.base};
  }
`;

const DescriptionContainer = styled(BaseElement)`
  height: ${({ descriptionHeight }: { descriptionHeight: string }) =>
    descriptionHeight};
  margin-top: ${spacing.xx};
  overflow: hidden;
`;

const ActionContainer = styled(BaseElement)`
  margin-top: ${spacing.xx};
  overflow: hidden;
  display: flex;
  margin: 16px -16px -16px;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-top: ${({ theme }) => `1px solid ${theme.colors.lines.base}`};

  & > button {
    width: 100%;
  }
`;

export { BaseTile, TileText, TileMeta, DescriptionContainer, ActionContainer };
