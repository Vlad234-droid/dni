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
  bottom: -113px;
  display: flex;
  justify-content: center;

  & video {
    max-width: 288px;
    max-height: 165px;
    border-radius: 10px;
    box-shadow: 0 4px 114px rgba(59, 129, 196, 0.3);

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

  ${Media.tablet`
    position: static;
    bottom: 0;
    border-radius: 0;
  `}
`;

const IconWrapper = styled.span`
  margin-right: 8px;
`;

export { Wrapper, IconWrapper, Label };
