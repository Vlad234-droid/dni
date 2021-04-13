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
  color: ${({ theme }) => theme.colors.text.base};
  font-size: 12px;
  line-height: 22px;
  padding: 12px 10px 0 0;
  text-transform: uppercase;
`;

export const List = styled.div`
  margin-bottom: 19px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;

  &:hover circle {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

export const Image = styled.div`
  border-radius: 100%;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

export const Name = styled.div`
  flex: 1;
  margin: 0 10px;
`;

export const Count = styled.div`
  margin-right: 10px;
  text-align: right;
`;
