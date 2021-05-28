import styled from 'styled-components';

import { GREY_COLOR } from 'styles';
import Media from 'styles/media';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 0 10px;

  & .beans-carousel__controls-container {
    display: none;

    ${Media.tablet`
        background-color: ${GREY_COLOR};
        display: flex;
        margin: 0 -10px;
      `}
  }
`;

export { Wrapper };
