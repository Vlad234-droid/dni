import React, { FC, Children, cloneElement, ReactElement } from 'react';

import { DefaultProps, Color } from '../config/types';
import Container from './styled';

type Props = {
  zebraStripes?: boolean;
} & DefaultProps;

const Body: FC<Props> = ({ zebraStripes = false, styles, children }) => {
  const zebraStripeColors = zebraStripes
    ? [Color.LIGHT, Color.DARK]
    : [Color.LIGHT, Color.LIGHT];

  return (
    <Container as='tbody' styles={styles}>
      {Children.map(children, (child, index) => {
        return cloneElement(child as ReactElement, {
          tabIndex: index,
          backgroundColor: zebraStripeColors[index % 2],
        });
      })}
    </Container>
  );
};

export default Body;
