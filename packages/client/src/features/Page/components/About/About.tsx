import React, { FC } from 'react';
import Icon from '@beans/icon';
import Link from '@beans/link';

import MainCarousel, { CarouselContent } from 'features/MainCarousel';
import { useMedia } from 'context/InterfaceContext';
import { Page, PAGE_PREFIX } from 'features/Page';
import Intro from 'features/Intro';
import InfoPanel, { InfoPanelType } from 'features/InfoPanel';
import NetworksPreview from 'features/NetworksPreview';

import BasePage from '../BasePage';
import { InfoPanelReducer, Reducer, Footer } from './styled';
import networks from './networks';
import survey from './survey';

const PageAbout: FC = () => {
  const { isMobile, isDesktop } = useMedia();

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
                  infoLink='/'
                  customIcon='lists'
                />
              </InfoPanelReducer>
              <NetworksPreview />
            </Reducer>
            <MainCarousel
              id='networks-preview-carousel'
              hideControls={isMobile}
            >
              {networks.map(({ id, ...network }) => (
                <CarouselContent key={id} {...network} />
              ))}
            </MainCarousel>
            {isDesktop && <Footer>© Tesco.com 2020 All Rights Reserved</Footer>}
          </>
        )}
      />
    </div>
  );
};

export default PageAbout;
