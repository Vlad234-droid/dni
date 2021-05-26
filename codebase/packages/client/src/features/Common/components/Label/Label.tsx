import { HTMLProps } from 'react';
import styled from 'styled-components';

type Props = HTMLProps<HTMLSpanElement>;

// TODO: remove - is not commonly used
const Label = styled.label<Props>`
  font-family: ${({ theme }) => theme.fontFamily.text};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: ${({ theme }) => theme.lineHeight.text.xs};
  font-weight: ${({ theme }) => theme.fontWeight.heading};
  color: ${({ theme }) => theme.colors.base};
`;

export default Label;
