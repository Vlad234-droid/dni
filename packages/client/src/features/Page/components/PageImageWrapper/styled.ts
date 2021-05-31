import styled from 'styled-components';

import { GREY_COLOR } from 'styles';
import Media from 'styles/media';

export const Wrapper = styled.div`
  & .beans-breadcrumb__container {
    background: ${GREY_COLOR};
    position: fixed;
    top: 43px;
    width: 100%;
    z-index: 100;

    ${Media.small_desktop`
    top: 237px;
  `}
  }
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 1000px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  ${Media.small_desktop`
    margin: -56px 40px -10px 40px;
    padding: 32px 0;
    min-height: calc(100vh - 237px - 194px);
  `}
`;

export const Header = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  margin-top: 39px;
  max-height: 250px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background.darkest};
  align-items: flex-end;
  min-height: 151px;

  ${Media.large_tablet`
    padding: 54px 40px 80px 40px;
    height: 249px;
  `}
`;
