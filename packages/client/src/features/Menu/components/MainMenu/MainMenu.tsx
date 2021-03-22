import React, { FC } from 'react';

import NetworkUpdates from 'features/NetworkUpdates';
import { useMedia } from 'context/InterfaceContext';

import MenuDesktop from '../MenuDesktop';
import MenuMobile from '../MenuMobile';

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
        </>
      )}
    </>
  );
};

export default MainMenu;
