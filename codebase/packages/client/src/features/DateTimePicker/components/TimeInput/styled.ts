import styled, { css } from 'styled-components';
import { baseInputStyles, RootElement } from '@beans/foundation';
import { forms, spacing } from '@beans/selectors';
import { DateSeparator as BeansDateSeparator } from '@beans/date-input';

export const SingleContainer = styled(RootElement)`
  ${baseInputStyles};
  display: inline-flex;
  align-items: center;
  height: ${forms.fieldHeight};
  padding: 0 ${spacing.sm};
  justify-content: center;
`;

export const fragmentStyles = {
  hh: css`
    width: 27px;
  `,
  mm: css`
    width: 30px;
  `,
};

export const DateSeparator = styled(BeansDateSeparator)`
  padding: 0 4px;
`;

export const IconWrapper = styled.span`
  width: 24px;
  height: 24px;
  margin-left: 18px;
  cursor: pointer;
`;
