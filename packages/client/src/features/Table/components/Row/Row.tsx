import React, { FC } from 'react';

import { RowProps, DefaultProps, Color } from '../config/types';
import Container from './styled';

type Props = {
  onClick?: () => void;
  tabIndex?: number;
} & DefaultProps &
  RowProps;

const Row: FC<Props> = ({
  styles,
  children,
  active = false,
  rowHeight = '55px',
  tabIndex = 0,
  backgroundColor = Color.LIGHT,
  onClick,
}) => {
  return (
    <Container
      as='tr'
      styles={styles}
      {...{
        active,
        rowHeight,
        clickable: !!onClick,
        onClick,
        tabIndex,
        backgroundColor,
      }}
    >
      {children}
    </Container>
  );
};

export default Row;
