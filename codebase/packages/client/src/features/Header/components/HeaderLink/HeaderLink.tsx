import React, { FC } from 'react';
import styled from 'styled-components';
import Link from '@beans/link';

const HeaderLink: FC = () => {
  return (
    <Wrapper>
      <Link href='#' inverse>
        Sign out
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  a {
    text-decoration: none;
    font-weight: bold;
  }
`;

export default HeaderLink;
