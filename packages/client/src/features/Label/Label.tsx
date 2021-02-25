import { HTMLProps } from 'react';
import styled from 'styled-components';

type Props = HTMLProps<HTMLSpanElement>;

// TODO: think how to reuse font styles
const Label = styled.span<Props>`
  font-family: ${({ theme }) => theme.fontFamily.text};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: ${({ theme }) => theme.lineHeight.text.xs};
  font-weight: ${({ theme }) => theme.fontWeight.text};
  color: ${({ theme }) => theme.colors.base};
`;

export default Label;
