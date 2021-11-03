import styled, { css } from 'styled-components';

import { textXS } from 'styles';
import Media from 'styles/media';

const Label = styled.div`
  color: ${({ theme }) => theme.colors.grayscale};
  text-align: center;
  ${textXS};

  ${({ theme }) => css`
    ${Media.tablet`
      color: ${theme.colors.white}
    `}
  `}
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: -143px;
  display: flex;
  justify-content: center;

  & video {
    max-width: 288px;
    max-height: 165px;
    border-radius: 10px;

    ${Media.large_phone`
      max-width: 350px;
      max-height: 195px;
  `}

    ${Media.tablet`
      max-width: unset;
      max-height: unset;
      border-radius: 0;
      box-shadow: none;
  `}
  }

  // ${Media.large_phone`
  //   bottom: -150px;
  // `}

  ${Media.tablet`
    position: static;
    bottom: 0;
    border-radius: 0;
  `}
`;

const IconWrapper = styled.span`
  margin-right: 8px;
`;

const Overflower = styled.div`
  overflow: hidden;

  & > video {
    margin: 0 -2px;
  }
`;

export { Wrapper, IconWrapper, Overflower, Label };
