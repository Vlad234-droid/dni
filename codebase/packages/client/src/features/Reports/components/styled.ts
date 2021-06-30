import styled from 'styled-components';

export const DropdownWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 56px;
`;

export const Wrapper = styled.div`
  .recharts-legend-wrapper,
  .recharts-tooltip-wrapper,
  .recharts-bar,
  .recharts-cartesian-axis {
    font-family: ${({ theme }) => theme.fontFamily.text};
  }
`;
