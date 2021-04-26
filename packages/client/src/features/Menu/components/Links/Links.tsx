import React, { FC } from 'react';
import styled from 'styled-components';
import Link from '@beans/link';

const Links: FC = () => (
  <Wrapper>
    <Link href='https://colleague-help.ourtesco.com/' target='_blank'>
      Colleague Help
    </Link>
    <Link
      href='https://www.ourtesco.com/colleague/terms-and-conditions'
      target='_blank'
    >
      Terms & Conditions
    </Link>
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
