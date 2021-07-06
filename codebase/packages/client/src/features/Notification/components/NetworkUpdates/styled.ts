import styled from 'styled-components';

export const TEST_ID = 'network-updates';

export const Wrapper = styled.nav.attrs({
  'data-testid': TEST_ID,
})`
  font-family: ${({ theme }) => theme.fontFamily.text};
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 48px;
`;

export const Title = styled.div`
  margin-bottom: 10px;
  margin-right: 4px;
  color: ${({ theme }) => theme.colors.text.dark};
  font-size: 20px;
  line-height: 28px;
  font-weight: bold;
`;

export const List = styled.div`
  margin-bottom: 19px;
`;
