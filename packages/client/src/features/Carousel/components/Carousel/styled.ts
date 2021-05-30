import styled from 'styled-components';

import { GREY_COLOR } from 'styles';
import Media from 'styles/media';

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  ${Media.small_desktop`
     padding: 0 10px;
  `}

  & .beans-carousel__controls-container {
    background-color: ${GREY_COLOR};

    ${Media.tablet`
      margin: 0 -10px;
    `}
  }
`;

export { Wrapper };
