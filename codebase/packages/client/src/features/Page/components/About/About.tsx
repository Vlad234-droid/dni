import React, { FC } from 'react';
import styled from 'styled-components';

import { Page, PAGE_PREFIX } from 'features/Page';
import Intro from 'features/Intro';
import InfoPanel, { InfoPanelType } from 'features/InfoPanel';
import NetworksPreview from 'features/NetworksPreview';
import { NetworkMainCarousel } from 'features/Network';
import { LINKS } from 'config/constants';

import BasePage from '../BasePage';
import { InfoPanelReducer, Reducer } from './styled';
import survey from './survey';

const PageAbout: FC = () => (
  <div data-testid={`${PAGE_PREFIX}${Page.ABOUT}`}>
    <BasePage
      renderMain={() => (
        <>
          <Intro />
          <Reducer>
            <InfoPanelReducer>
              <InfoPanel
                type={InfoPanelType.DARK}
                title={survey.title}
                content={survey.description}
                footnote={survey.footnote}
                infoLink={LINKS.thisIsMeSurvey}
                customIcon='lists'
              />
            </InfoPanelReducer>
            <NetworksPreview />
          </Reducer>
          <NetworkMainCarousel />
        </>
      )}
    />
  </div>
);

export default PageAbout;
