import React, { FC } from 'react';
import styled from 'styled-components';
import Link from '@beans/link';

import { LINKS } from 'config/constants';

const HeaderLink: FC = () => (
  <Wrapper data-testid='header-link'>
    <Link href={LINKS.signOut} inverse>
      Sign out
    </Link>
  </Wrapper>
);

const Wrapper = styled.div`
  a {
    text-decoration: none;
    font-weight: bold;
  }
`;

export default HeaderLink;
