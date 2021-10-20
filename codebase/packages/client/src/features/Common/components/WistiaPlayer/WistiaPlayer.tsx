import React from 'react';
import styled from 'styled-components';

import { Box } from '@energon-components/layout';

type ContainerProps = {
  aspectRatio: number;
};

type Props = {
  videoId: string;
  aspectRatio: number;
};

const WistiaPlayer: React.FC<Props> = ({ videoId, aspectRatio }) => {
  return (
    <Container background='backgroundDark' aspectRatio={aspectRatio}>
      <IFrame
        src={`https://fast.wistia.net/embed/iframe/${videoId}?videoFoam=true`}
        frameBorder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />
    </Container>
  );
};

const Container = styled(Box)<ContainerProps>`
  height: 0;
  overflow: hidden;
  position: relative;

  /* matches size to video aspect ratio */
  padding: ${({ aspectRatio }) => `${(1 / aspectRatio) * 100}% 0 0 0`};
`;

const IFrame = styled.iframe`
  position: absolute;
  top: -4px;
  right: auto;
  bottom: auto;
  left: -4px;
  width: calc(100% + 8px);
  height: calc(100% + 8px);
`;

export default WistiaPlayer;
