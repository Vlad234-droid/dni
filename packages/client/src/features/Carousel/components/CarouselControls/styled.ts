import styled from 'styled-components';

export const Wrapper = styled.div`
  --button-border-color: ${({ theme }) => theme.colors.tescoBlue};

  position: relative;
  z-index: 3;
  margin-bottom: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 35px;

  & > button:not(:last-child) {
    margin-bottom: 8px;
  }

  svg {
    width: 34px;
    height: 34px;
    margin-left: 15px;
  }
`;
