import React, { FC } from 'react';

import { useMedia } from 'context/InterfaceContext';

import MenuDesktop from '../MenuDesktop';
import MenuMobile from '../MenuMobile';

const TEST_ID = 'menu';

const MainMenu: FC = () => {
  const { isDesktop } = useMedia();

  return (
    <div data-testid={TEST_ID}>
      {!isDesktop ? <MenuMobile /> : <MenuDesktop />}
    </div>
  );
};

export { TEST_ID };

export default MainMenu;
