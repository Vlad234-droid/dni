import React, { FC } from 'react';
import styled from 'styled-components';

import Layout, { ExtraLayoutProps } from 'features/Layout';
import Header from 'features/Header';
import { Links, MenuMobile } from 'features/Menu';
import { useMedia } from 'context/InterfaceContext';

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
              <LinksWrapper>
                <Links />
              </LinksWrapper>
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

const LinksWrapper = styled.div`
  margin-top: 48px;
`;

export { TEST_ID };

export default BasePage;
