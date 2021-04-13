import React, { FC } from 'react';
import NetworkUpdates from 'features/NetworkUpdates';
import { useMedia } from 'context/InterfaceContext';

import MenuDesktop from '../MenuDesktop';
import MenuMobile from '../MenuMobile';
import Links from '../Links';

const MainMenu: FC = () => {
  const { isDesktop } = useMedia();

  return (
    <>
      {!isDesktop ? (
        <MenuMobile />
      ) : (
        <>
          <MenuDesktop />
          <NetworkUpdates />
          <Links />
        </>
      )}
    </>
  );
};

export default MainMenu;
