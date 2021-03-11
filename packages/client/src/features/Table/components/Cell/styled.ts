import { RootElement } from '@beans/foundation';
import { spacing } from '@beans/selectors';
import styled from 'styled-components';
import { CellProps } from '../config/types';

export default styled(RootElement)<CellProps>`
  background-clip: border-box;
  background-color: ${({ theme }) => theme.colors.background.white};
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.lines.base};
  border-width: ${(props) => (props.verticalBorders ? '1px' : '0 0 1px')};
  color: inherit;
  padding: ${spacing.xs} ${spacing.sm};
  position: static;
  text-align: ${(props) => props.textAlign};
  display: ${(props) => (props.visible ? 'table-cell' : 'none')};
  vertical-align: ${(props) =>
    props.verticalAlign ? props.verticalAlign : 'middle'};
  width: ${(props) => props.cellWidth};
  ${(props) => props.styles};
`;
