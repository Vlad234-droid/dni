import styled from 'styled-components';

import { textXS } from 'styles';
import Media from 'styles/media';

const Label = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.grayscale};
  text-align: center;
  ${textXS};
  
  svg path {
    stroke: ${({ theme }) => theme.colors.grayscale};
  }
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: -140px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${Media.large_tablet`
    width: 440px;
    height: 254px;
  `}

  ${Media.tablet`
    position: static;
    bottom: 0;
    border-radius: 0;
  `}
`;

const VideoContainer = styled.div`
  & > div {
    width: 280px;
    height: 149px;

    ${Media.large_phone`
      width: 350px;
      height: 195px;
    `}

    ${Media.large_tablet`
      width: 440px;
      height: 254px;
  `}
  }
`;

const IconWrapper = styled.span`
  margin-right: 8px;
`;

export { Wrapper, IconWrapper, Label, VideoContainer };
