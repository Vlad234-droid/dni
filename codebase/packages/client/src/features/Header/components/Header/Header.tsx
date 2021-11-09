import React, { FC, useState, useRef } from 'react';
import Icon from '@beans/icon';

import { MenuDesktop, MainMenuMobile } from 'features/Menu';
import Toaster from 'features/Toaster';
import { useMedia } from 'context/InterfaceContext';
import NotificationSidebar, { NotificationRing } from 'features/Notification';
import { Mode, AccessibilityButton } from 'features/Accessibility';

import { Wrapper, Icons, IconWrapper, ToasterWrapper, MenuWrapper, Title, Aside } from './styled';

const TEST_ID = 'header';

const Header: FC = () => {
  const { isDesktop, isTablet, isLargeMobile } = useMedia();
  const [isOpened, setIsOpened] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpenMenu = () => setIsOpened(true);
  const handleCloseMenu = () => setIsOpened(false);

  return (
    <Wrapper data-testid={TEST_ID}>
      {isDesktop && (
        <MenuWrapper>
          <MenuDesktop />
        </MenuWrapper>
      )}
      {!isDesktop && isOpened && <MainMenuMobile onClose={handleCloseMenu} />}
      {!isDesktop && <Title>{'Diversity & Inclusion'}</Title>}
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
    </Wrapper>
  );
};

export { TEST_ID };

export default Header;
