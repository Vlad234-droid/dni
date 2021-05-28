import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.h3`
  margin-right: 32px;
  font-size: 50px;
  line-height: 71px;
  color: ${({ theme }) => theme.colors.tescoBlue};

  &::after {
    content: '.';
    color: ${({ theme }) => theme.colors.tescoRed};
  }
`;

export const Wrapper = styled.div`
  padding: 24px 40px 0;
`;

export const Content = styled.div`
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
  border: ${({ theme }) => `1px solid ${theme.colors.lines.base}`};
  min-height: calc(100vh - 237px - 120px);
`;
