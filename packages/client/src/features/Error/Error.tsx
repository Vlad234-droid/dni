import styled from 'styled-components';

// TODO: think how to reuse font styles
const Error = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.text};
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: ${({ theme }) => theme.lineHeight.text.sm};
  font-weight: ${({ theme }) => theme.fontWeight.text};
  color: ${({ theme }) => theme.colors.base};
  position: absolute;
  bottom: 0;
  left: 0;
`;

export default Error;
