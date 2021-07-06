import styled from 'styled-components';

export const Wrapper = styled.div`
  .recharts-legend-wrapper,
  .recharts-tooltip-wrapper,
  .recharts-bar,
  .recharts-cartesian-axis {
    font-family: ${({ theme }) => theme.fontFamily.text};
  }
`;
