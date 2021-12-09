import React, { FC } from 'react';

import { MainMenuDesktop } from 'features/Menu';

import { isNextYear } from '../../utils';
import TescoLogo from '../../assets/christmas-tesco-logo.png';
import { Logo, LogoWrapper } from './styled';

const TEST_ID = 'header-main';

const HeaderMain: FC = () => (
  <div data-testid={TEST_ID}>
    { isNextYear() ? <Logo>Our Tesco</Logo> :  (
      <LogoWrapper>
        <img src={TescoLogo} alt='Tesco logo' />
      </LogoWrapper>
    )}
    <MainMenuDesktop />
  </div>
);

export { TEST_ID };

export default HeaderMain;
