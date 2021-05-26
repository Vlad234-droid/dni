import React, { FC } from 'react';
import styled from 'styled-components';

import { useMedia } from 'context/InterfaceContext';

import MenuDesktop from '../MenuDesktop';
import MenuMobile from '../MenuMobile';
import Links from '../Links';

const TEST_ID = 'menu';

const MenuDesktopWrapper = styled.div`
  margin-bottom: 32px;
`;

const MainMenu: FC = () => {
  const { isDesktop } = useMedia();

  return (
    <div data-testid={TEST_ID}>
      {!isDesktop ? (
        <MenuMobile />
      ) : (
        <>
          <MenuDesktopWrapper>
            <MenuDesktop />
          </MenuDesktopWrapper>
          <Links />
        </>
      )}
    </div>
  );
};

export { TEST_ID };

export default MainMenu;
