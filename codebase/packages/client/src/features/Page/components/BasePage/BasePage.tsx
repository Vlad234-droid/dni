import React, { FC } from 'react';
import styled from 'styled-components';
import Link from '@beans/link';

import Layout, { ExtraLayoutProps } from 'features/Layout';
import { Header, HeaderMain, HeaderTop } from 'features/Header';
import { MenuMobile } from 'features/Menu';
import { useMedia } from 'context/InterfaceContext';
import { NetworkUpdates } from 'features/Notification';
import { LINKS } from 'config/constants';
import { ShareStoryButton } from 'features/GlobalModal';

const TEST_ID = 'base-page';

const BasePage: FC<ExtraLayoutProps> = (props) => {
  const { isDesktop } = useMedia();

  return (
    <div data-testid={TEST_ID}>
      <Layout
        renderTopHeader={() => <HeaderTop />}
        renderMainHeader={() => <HeaderMain />}
        renderHeader={() => <Header />}
        renderLeft={() => (
          <>
            {isDesktop ? (
              <>
                <UpdatesWrapper>
                  <NetworkUpdates />
                </UpdatesWrapper>
                <ButtonWrapper>
                  <ShareStoryButton />
                </ButtonWrapper>
                <LinksWrapper>
                  <Link href={LINKS.termsAndConditions} target='_self'>
                    Terms & Conditions
                  </Link>
                  <Link href={LINKS.privacyPolicy} target='_self'>
                    Privacy Policy
                  </Link>
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

const UpdatesWrapper = styled.div`
  margin-top: 32px;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 48px;
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;

  a:last-child {
    margin-top: 10px;
  }
`;

export { TEST_ID };

export default BasePage;
