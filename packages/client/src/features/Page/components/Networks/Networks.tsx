import React, { FC } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';
import BasePage from '../BasePage';
import PageHeader from '../PageHeader';
import PageWrapper from '../PageWrapper';
import Heading, { Size, Color } from 'features/Heading';
import { NetworkList, NetworkCarousel } from 'features/Network';

const TEST_ID = 'container-networks';

const Networks: FC = () => {
  return (
    <BasePage
      data-testid={`${PAGE_PREFIX}${Page.NETWORKS}`}
      renderMain={() => (
        <div data-testid={TEST_ID}>
          <PageHeader
            renderLeft={() => <Heading>Networks</Heading>}
            renderCenter={() => (
              <Heading size={Size.md} color={Color.black}>
                Popular Networks
              </Heading>
            )}
          />
          <PageWrapper>
            <NetworkCarousel />
            <NetworkList />
          </PageWrapper>
        </div>
      )}
    />
  );
};

export { TEST_ID };

export default Networks;
