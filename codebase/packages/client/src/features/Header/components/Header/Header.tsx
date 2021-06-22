import React, { FC, useState } from 'react';
import Icon from '@beans/icon';

import { MenuDesktop, MainMenuMobile } from 'features/Menu';
import Toaster from 'features/Toaster';
import { useMedia } from 'context/InterfaceContext';
import NotificationSidebar, { NotificationRing } from 'features/Notification';

import { Wrapper, Icons, IconWrapper, ToasterWrapper, MenuWrapper, Title } from './styled';

const TEST_ID = 'header';

const Header: FC = () => {
  const { isDesktop } = useMedia();
  const [isOpened, setIsOpened] = useState(false);

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
      <Icons>
        <IconWrapper>
          <NotificationRing inverse={!isDesktop} />
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
        <NotificationSidebar />
      </ToasterWrapper>
    </Wrapper>
  );
};

export { TEST_ID };

export default Header;
