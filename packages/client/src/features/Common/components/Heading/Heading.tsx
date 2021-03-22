import styled from 'styled-components';

import Media from 'styles/media';
import { headingMD } from 'styles';

// Reusable tescoBlue heading with font-size 32px
export const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.tescoBlue};
  text-align: center;
  ${headingMD};

  ${Media.tablet`
    font-size: 32px;
    line-height: 45px;
  `}
`;

export default Heading;
