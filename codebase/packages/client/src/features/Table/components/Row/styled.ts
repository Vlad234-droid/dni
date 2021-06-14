import { RootElement } from '@beans/foundation';
import styled, { css } from 'styled-components';
import { base } from '@beans/selectors';

import { RowProps, Color } from '../config/types';

const activeStyles = css`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;

const activeOnFocusStyles = css`
  cursor: pointer;
  transition: background-color ${base.transitionDuration};

  &:focus,
  &:hover {
    ${activeStyles};
    opacity: 0.9;
  }
`;

export default styled(RootElement)<RowProps>`
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor === Color.LIGHT
      ? theme.colors.background.white
      : theme.colors.background.darkest};
  height: ${(props) => props.rowHeight};
  color: ${({ theme }) => theme.colors.base};
  ${(props) => props.active && activeStyles};
  ${(props) => props.clickable && activeOnFocusStyles};
  ${(props) => props.styles};
`;
