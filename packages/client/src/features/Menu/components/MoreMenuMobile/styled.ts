import styled from 'styled-components';

export const Wrapper = styled.div`
  overflow: hidden;
  position: fixed;
  bottom: 60px;
  top: 53px;
  background: ${({ theme }) => theme.colors.background.dark};
  width: 100%;
  z-index: 999;
  padding-top: 24px;
`;

export const ItemsList = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.lines.base};
  border-top: 1px solid ${({ theme }) => theme.colors.lines.base};
  margin-bottom: 24px;

  & a {
    padding: 14px 12px;

    &:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => theme.colors.lines.base};
    }
  }
`;

export const Links = styled.div`
  padding-left: 16px;
  display: flex;
  flex-direction: column;

  & a {
    margin-bottom: 8px;
  }
`;
