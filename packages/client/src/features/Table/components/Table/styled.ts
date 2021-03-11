import { RootElement } from '@beans/foundation';
import styled from 'styled-components';

import { TableProps } from '../config/types';

const Container = styled(RootElement)`
  ${(props) => props.styles};
`;

const StyledTable = styled(RootElement)<TableProps>`
  border-collapse: collapse;
  border-color: ${({ theme }) => theme.colors.lines.base};
  border-style: solid;
  border-width: ${(props) => (props.frame ? '1px' : '0')};
  table-layout: fixed;
  width: 100%;
`;

export { Container, StyledTable };
