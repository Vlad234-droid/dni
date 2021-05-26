import styled from 'styled-components';

import Media from 'styles/media';
import { headingXL } from 'styles';

// Reusable white heading with font-size 44px
export const LargeHeading = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  ${headingXL};

  ${Media.tablet`
    font-size: 44px;
    line-height: 1.17;
  `}
`;

export default LargeHeading;
