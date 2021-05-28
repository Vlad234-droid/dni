import styled from 'styled-components';
import Media from 'styles/media';

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 1000px;
  margin: -56px auto 0;
  padding: 24px 0;
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
  max-height: 250px;
  padding: 24px 16px 80px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background.darkest};
  align-items: flex-end;
  min-height: 151px;

  ${Media.large_tablet`
    padding: 54px 40px 80px 40px;
    height: 249px;
  `}
`;
