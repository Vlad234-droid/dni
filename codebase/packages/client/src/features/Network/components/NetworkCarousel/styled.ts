import styled from 'styled-components';

import Media from 'styles/media';

const Wrapper = styled.div`
  ${Media.small_desktop`
    padding: 32px;
  `}
`;

const ParticipantsWrapper = styled.div`
  margin-top: 12px;
`;

export { Wrapper, ParticipantsWrapper };
