import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const LinkWrapper = styled.div`
  position: relative;
  bottom: 18px;

  .beans-link__text {
    color: ${({ theme }) => theme.colors.grayscale};
    font-size: 14px;
    line-height: 20px;
  }

  .beans-link__anchor {
    padding-right: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.colors.lines.base};
    border-radius: 45px;

    svg {
      width: 30px;
      height: 30px;
    }
  }

  //.beans-link__icon-container {
  //  margin-right: 0;
  //}
`;
