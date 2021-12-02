import React, { FC, useState, useRef } from 'react';
import Icon from '@beans/icon';

import { MenuDesktop, MainMenuMobile } from 'features/Menu';
import Toaster from 'features/Toaster';
import { useMedia } from 'context/InterfaceContext';
import NotificationSidebar, { NotificationRing } from 'features/Notification';
import { Mode, AccessibilityButton } from 'features/Accessibility';
import { ShareStoryButton } from 'features/GlobalModal';

import TescoLogo from '../../assets/christmas-tesco-logo.png';
import {
  Wrapper,
  MainWrapper,
  Icons,
  IconWrapper,
  ToasterWrapper,
  MenuWrapper,
  Title,
  Aside,
  ShareStoryBtnWrapper,
} from './styled';

const TEST_ID = 'header';

const Header: FC = () => {
  const { isDesktop, isTablet, isLargeMobile, isMobile } = useMedia();
  const [isOpened, setIsOpened] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpenMenu = () => setIsOpened(true);
  const handleCloseMenu = () => setIsOpened(false);

  return (
    <Wrapper data-testid={TEST_ID}>
      <MainWrapper>
        {isDesktop && (
          <MenuWrapper>
            <MenuDesktop />
          </MenuWrapper>
        )}
        {!isDesktop && isOpened && <MainMenuMobile onClose={handleCloseMenu} />}
        {!isDesktop && <img src={TescoLogo} alt='Tesco logo' />}
        {/*{!isDesktop && <Title>{'Diversity & Inclusion'}</Title>}*/}
        <Aside>
          {(isTablet || isLargeMobile) && <AccessibilityButton mode={Mode.LIGHT} />}
          <Icons>
            <IconWrapper>
              <NotificationRing buttonRef={buttonRef} inverse={!isDesktop} />
            </IconWrapper>
            {/*<IconWrapper>*/}
            {/*  <Link*/}
            {/*    href={'/profile'}*/}
            {/*    icon={{ graphic: 'account', position: { global: 'right' } }}*/}
            {/*    inverse={!isDesktop}*/}
            {/*    variant='iconButton'*/}
            {/*  />*/}
            {/*</IconWrapper>*/}
            {!isDesktop && (
              <IconWrapper>
                <Icon graphic='menu' onClick={handleOpenMenu} />
              </IconWrapper>
            )}
          </Icons>
          <ToasterWrapper>
            <Toaster />
            <NotificationSidebar buttonRef={buttonRef} />
          </ToasterWrapper>
        </Aside>
      </MainWrapper>
      {!isDesktop && (
        <ShareStoryBtnWrapper>
          <ShareStoryButton block={isMobile || isLargeMobile} />
        </ShareStoryBtnWrapper>
      )}
    </Wrapper>
  );
};

export { TEST_ID };

export default Header;
