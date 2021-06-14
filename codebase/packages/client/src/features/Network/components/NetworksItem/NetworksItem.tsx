import { HTMLProps } from 'react';
import styled from 'styled-components';

type Props = HTMLProps<HTMLDivElement>;

// TODO: think how to reuse font styles
const NetworksItem = styled.div<Props>`
  font-family: ${({ theme }) => theme.fontFamily.text};
  font-size: ${({ theme }) => theme.fontSize.xx};
  line-height: ${({ theme }) => theme.lineHeight.text.xx};
  font-weight: ${({ theme }) => theme.fontWeight.text};
  color: ${({ theme }) => theme.colors.base};
`;

export default NetworksItem;
