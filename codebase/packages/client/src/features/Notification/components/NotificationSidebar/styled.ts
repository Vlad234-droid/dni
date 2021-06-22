import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 24px;
  box-sizing: border-box;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  max-width: 408px;
  height: calc(100vh - 226px);
  border-left: 1px solid ${({ theme }) => theme.colors.lines.base};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const Title = styled.div`
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.heading};
`;
