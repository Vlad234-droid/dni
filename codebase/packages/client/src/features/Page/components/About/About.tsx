import React, { FC } from 'react';

import { useMedia } from 'context/InterfaceContext';
import { Page, PAGE_PREFIX } from 'features/Page';
import Intro from 'features/Intro';
import InfoPanel, { InfoPanelType } from 'features/InfoPanel';
import NetworksPreview from 'features/NetworksPreview';
import { NetworkMainCarousel } from 'features/Network';
import { buildPublicPath } from 'config/api';

import BasePage from '../BasePage';
import { InfoPanelReducer, Reducer, Footer } from './styled';
import survey from './survey';

const PageAbout: FC = () => {
  const { isDesktop } = useMedia();

  return (
    <div data-testid={`${PAGE_PREFIX}${Page.ABOUT}`}>
      <BasePage
        withBackground={false}
        renderMain={() => (
          <>
            <Intro />
            <Reducer>
              <InfoPanelReducer>
                <InfoPanel
                  type={InfoPanelType.WARNING}
                  title={survey.title}
                  content={survey.description}
                  footnote={survey.footnote}
                  infoLink={ buildPublicPath('/') }
                  customIcon='lists'
                />
              </InfoPanelReducer>
              <NetworksPreview />
            </Reducer>
            <NetworkMainCarousel />
            {isDesktop && <Footer>© Tesco.com 2020 All Rights Reserved</Footer>}
          </>
        )}
      />
    </div>
  );
};

export default PageAbout;
