import React, { FC } from 'react';

import { TableProps, DefaultProps } from '../config/types';
import { Container, StyledTable } from './styled';

type Props = {
  onClick?: () => void;
} & DefaultProps &
  TableProps;

const Table: FC<Props> = ({ styles, children, frame = false }) => {
  return (
    <Container styles={styles}>
      <StyledTable as='table' frame={frame}>
        {children}
      </StyledTable>
    </Container>
  );
};

export default Table;
