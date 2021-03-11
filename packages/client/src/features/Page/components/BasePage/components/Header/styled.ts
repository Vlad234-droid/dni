import styled from 'styled-components';
import Media from 'styles/media';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 250px;
  padding: 24px 16px 80px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background.darkest};
  align-items: flex-end;

  ${Media.tablet`
    padding: 54px 60px 80px 40px;
  `}
`;

const LeftContainer = styled.div``;

const RightContainer = styled.div``;

const CenterContainer = styled.div`
  flex-basis: 100%;
  margin-top: 32px;
  width: 100%;
  overflow-x: scroll;
`;

export { Wrapper, LeftContainer, RightContainer, CenterContainer };
