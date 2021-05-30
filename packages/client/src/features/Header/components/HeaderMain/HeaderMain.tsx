import React, { FC } from 'react';

import { MainMenuDesktop } from 'features/Menu';

import { Wrapper, Logo } from './styled';

const TEST_ID = 'header-main';

const HeaderMain: FC = () => (
  <Wrapper>
    <Logo>Our Tesco</Logo>
    <MainMenuDesktop />
  </Wrapper>
);

export { TEST_ID };

export default HeaderMain;
