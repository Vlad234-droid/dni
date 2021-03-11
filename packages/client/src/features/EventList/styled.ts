import styled from 'styled-components';
import Media from 'styles/media';

const Wrapper = styled.div`
  padding: 16px;

  ${Media.tablet`
    padding: 32px;
  `}
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  flex-direction: column;

  & > section {
    flex-basis: 350px;
    margin-bottom: 25px;
  }

  & > section:not(:last-child) {
    margin-right: 8px;
  }

  ${Media.tablet`
    flex-direction: row;

    & > section {
      flex-basis: 160px;
    }
  `}
`;

export { Wrapper, ListContainer };
