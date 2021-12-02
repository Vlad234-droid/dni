import React, { FC } from 'react';

import { MainMenuDesktop } from 'features/Menu';
import { LINKS } from 'config/constants';
import TescoLogo from '../../assets/christmas-tesco-logo.png';

import { Logo, LogoWrapper } from './styled';

const TEST_ID = 'header-main';

const HeaderMain: FC = () => (
  <div data-testid={TEST_ID}>
    <LogoWrapper>
      <img src={TescoLogo} alt='Tesco logo' />
    </LogoWrapper>

    {/*<Logo>Our Tesco</Logo>*/}
    <MainMenuDesktop />
  </div>
);

export { TEST_ID };

export default HeaderMain;
