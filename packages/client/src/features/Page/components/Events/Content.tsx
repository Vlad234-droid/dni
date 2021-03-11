import React, { FC } from 'react';
import styled from 'styled-components';

import RangeDateTimePicker from 'features/RangeDateTimePicker';

const Wrapper = styled.div`
  padding: 40px;
`;

const Content: FC = () => (
  <Wrapper>
    <RangeDateTimePicker />
  </Wrapper>
);

export default Content;
