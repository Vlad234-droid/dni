import React, { FC } from 'react';

import { MainMenuDesktop } from 'features/Menu';

import { Logo } from './styled';

const TEST_ID = 'header-main';

const HeaderMain: FC = () => (
  <div data-testid='header-main'>
    <Logo>Our Tesco</Logo>
    <MainMenuDesktop />
  </div>
);

export { TEST_ID };

export default HeaderMain;
