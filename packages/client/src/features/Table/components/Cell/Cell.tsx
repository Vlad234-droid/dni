import React, { FC } from 'react';

import { CellProps, DefaultProps } from '../config/types';
import Container from './styled';

type Props = { width?: string } & DefaultProps & CellProps;

const Cell: FC<Props> = ({
  styles,
  children,
  verticalBorders = false,
  textAlign = 'left',
  verticalAlign = 'middle',
  visible = true,
  width,
}) => {
  return (
    <Container
      as='td'
      styles={styles}
      {...{
        verticalBorders,
        textAlign,
        verticalAlign,
        cellWidth: width,
        visible,
      }}
    >
      {children}
    </Container>
  );
};

export default Cell;
