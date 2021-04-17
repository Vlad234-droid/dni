import styled from 'styled-components';
import Media from 'styles/media';

const Wrapper = styled.div`
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

const LeftContainer = styled.div``;

const RightContainer = styled.div``;

const CenterContainer = styled.div`
  flex-basis: 100%;
  margin-top: 32px;
  width: 100%;
  overflow-x: auto;
`;

export { Wrapper, LeftContainer, RightContainer, CenterContainer };
