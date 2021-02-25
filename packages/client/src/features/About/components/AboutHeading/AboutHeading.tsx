import React, { FC } from 'react';
import styled from 'styled-components';

import { headingMD, headingXXXXL } from 'styles';

const Wrapper = styled.div`
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.white};
`;

const Title = styled.h2`
  margin: 0 0 10px;
  ${headingXXXXL}
`;

const Subtitle = styled.h4`
  margin: 0 0 10px;
  ${headingMD}
`;

const AboutHeading: FC = () => (
  <Wrapper>
    <Title>Diversity & Inclusion</Title>
    <Subtitle>Communicate about what makes you unique</Subtitle>
  </Wrapper>
);

export default AboutHeading;
