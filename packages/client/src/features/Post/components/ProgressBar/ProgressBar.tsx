import React, { FC } from 'react';
import styled from 'styled-components';

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
`;

interface ProgressBarProps {
  progress: number;
  color: Record<string, string>;
}

const progressBarTestId = 'progress-bar-test-id';

const ProgressBar: FC<ProgressBarProps> = ({ progress, color }) => (
  <ProgressBarWrapper
    data-testid={progressBarTestId}
    style={{
      background: `
        linear-gradient(90deg, 
        rgba(${color.from}, ${progress / 100 - 0.1}) ${progress}%,
        rgba(${color.to}) ${progress}%), transparent
      `,
    }}
  />
);

export default ProgressBar;
export { progressBarTestId };
