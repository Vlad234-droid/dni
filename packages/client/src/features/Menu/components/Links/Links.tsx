import React, { FC } from 'react';
import styled from 'styled-components';
import Link from '@beans/link';

const Links: FC = () => (
  <Wrapper>
    <Link href='#'>Colleague Help</Link>
    <Link href='#'>Terms & Conditions</Link>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  & a {
    margin-bottom: 8px;
    text-decoration: underline;
  }
`;

export default Links;
