import React, { FC } from 'react';
//import styled from 'styled-components';
// import Link from '@beans/link';

import Layout, { ExtraLayoutProps } from 'features/Layout';
import { Header, HeaderMain, HeaderLink } from 'features/Header';
import { MenuMobile } from 'features/Menu';
import { useMedia } from 'context/InterfaceContext';
// import NetworkUpdates from 'features/NetworkUpdates';

const TEST_ID = 'base-page';

const BasePage: FC<ExtraLayoutProps> = (props) => {
  const { isDesktop } = useMedia();

  return (
    <div data-testid={TEST_ID}>
      <Layout
        renderTopHeader={() => <HeaderLink />}
        renderMainHeader={() => <HeaderMain />}
        renderHeader={() => <Header />}
        renderLeft={() => (
          <>
            {isDesktop ? (
              <>
                {/*<UpdatesWrapper>*/}
                {/*  <NetworkUpdates />*/}
                {/*</UpdatesWrapper>*/}
              </>
            ) : (
              <MenuMobile />
            )}
          </>
        )}
        {...props}
      />
    </div>
  );
};

// const UpdatesWrapper = styled.div`
//   margin-top: 32px;
// `;

export { TEST_ID };

export default BasePage;
