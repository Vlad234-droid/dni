import styled from 'styled-components';

export const Wrapper = styled.nav`
  font-family: ${({ theme }) => theme.fontFamily.text};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.text.base};
  font-size: 12px;
  line-height: 22px;
  padding: 12px 10px 0 0;
  text-transform: uppercase;
`;

export const List = styled.div`
  margin-bottom: 19px;
`;
