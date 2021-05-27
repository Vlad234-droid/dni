import React, { FC } from 'react';
import styled from 'styled-components';

import Layout, { ExtraLayoutProps } from 'features/Layout';
import Header from 'features/Header';
import { Links, MenuMobile } from 'features/Menu';
import { useMedia } from 'context/InterfaceContext';
// import NetworkUpdates from 'features/NetworkUpdates';

const TEST_ID = 'base-page';

const BasePage: FC<ExtraLayoutProps> = (props) => {
  const { isDesktop } = useMedia();

  return (
    <div data-testid={TEST_ID}>
      <Layout
        renderHeader={() => <Header />}
        renderLeft={() => (
          <>
            {isDesktop ? (
              <>
                {/*<UpdatesWrapper>*/}
                {/*  <NetworkUpdates />*/}
                {/*</UpdatesWrapper>*/}
                <LinksWrapper>
                  <Links />
                </LinksWrapper>
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

const LinksWrapper = styled.div`
  margin-top: 48px;
`;

export { TEST_ID };

export default BasePage;
