import React, { FC } from 'react';
import styled from 'styled-components';

const TEST_ID = 'heading';

enum Size {
  md = 'md',
  xl = 'xl',
  xxl = 'xxl',
}

enum Color {
  main = 'main',
  black = 'black',
}

type Props = {
  size?: keyof typeof Size;
  color?: keyof typeof Color;
};

const Heading: FC<Props> = ({ children, size, color }) => (
  <Title {...{ size, color, 'data-testid': TEST_ID }}>{children}</Title>
);

type TiteProps = {
  fontSize?: number;
  fontColor?: string;
} & Props;

const Title = styled.h2.attrs<TiteProps>(
  ({ theme, size = Size.xl, color = Color.main }) => ({
    fontSize: theme.fontSize[size],
    fontColor: color == Color.main ? theme.colors.primary : theme.colors.base,
  }),
)`
  font-size: ${({ fontSize }: TiteProps) => fontSize};
  color: ${({ fontColor }) => fontColor};
`;

export { Size, Color, TEST_ID };

export default Heading;
