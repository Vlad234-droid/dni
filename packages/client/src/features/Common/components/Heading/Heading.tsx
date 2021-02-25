import styled from 'styled-components';

import { headingXL } from 'styles';

// Reusable tescoBlue heading with font-size 32px
export const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.tescoBlue};
  text-align: center;
  ${headingXL}
`;

export default Heading;
