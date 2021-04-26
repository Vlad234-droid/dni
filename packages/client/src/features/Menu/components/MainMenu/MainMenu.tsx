import React, { FC } from 'react';
import NetworkUpdates from 'features/NetworkUpdates';
import { useMedia } from 'context/InterfaceContext';

import MenuDesktop from '../MenuDesktop';
import MenuMobile from '../MenuMobile';
import Links from '../Links';

const TEST_ID = 'menu';

const MainMenu: FC = () => {
  const { isDesktop } = useMedia();

  return (
    <div data-testid={TEST_ID}>
      {!isDesktop ? (
        <MenuMobile />
      ) : (
        <>
          <MenuDesktop />
          <Links />
        </>
      )}
    </div>
  );
};

export { TEST_ID };

export default MainMenu;
