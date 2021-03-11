import React, { FC } from 'react';
import styled from 'styled-components';

import { useMedia } from 'context/InterfaceContext';
import MenuDesktop from '../MenuDesktop';
import NetworkUpdates from '../NetworkUpdates';
import MenuMobile from '../MenuMobile';

const MainMenu: FC = () => {
  const { isMobile } = useMedia();

  return (
    <Wrapper>
      {isMobile ? (
        <MenuMobile />
      ) : (
        <>
          <MenuDesktop />
          <NetworkUpdates />
        </>
      )}
    </Wrapper>
  );
};

export default MainMenu;

const Wrapper = styled.div`
  padding: 45px 0 20px;

  @media (max-width: 504px) {
    padding: 0;
  }
`;
