import styled, { css } from 'styled-components';
import { baseInputStyles, RootElement } from '@beans/foundation';
import { forms, spacing } from '@beans/selectors';
import { DateSeparator as BeansDateSeparator } from '@beans/date-input';

export const InputContainer = styled(RootElement)`
  ${baseInputStyles};
  display: inline-flex;
  align-items: center;
  padding: 0 ${spacing.sm};
  height: ${forms.fieldHeight};
  width: 100px;
`;

export const fragmentStyles = {
  hh: css`
    width: 27px;
  `,
  mm: css`
    width: 27px;
  `,
};

export const DateSeparator = styled(BeansDateSeparator)`
  padding: 0 4px 0 0;
`;

export const IconWrapper = styled.span`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
