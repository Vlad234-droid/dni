import styled from 'styled-components';

import Media from 'styles/media';

const ListContainer = styled.div`
  margin-top: 16px;

  & > div {
    width: 100%;
    height: 100%;
  }
`;

const Wrapper = styled.div`
  padding: 16px 0;

  ${Media.small_desktop`
    padding: 32px;
  `}
`;

const ParticipantsWrapper = styled.div`
  margin-top: 12px;
`;

export { Wrapper, ListContainer, ParticipantsWrapper };
