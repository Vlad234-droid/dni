import React, { FC } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';
import { NetworkList, NetworkCarousel } from 'features/Network';
import { menuItemsDesktop } from 'features/Menu';

import BasePage from '../BasePage';
import PageWrapper from '../PageWrapper';

const TEST_ID = 'container-networks';

const Networks: FC = () => {
  return (
    <BasePage
      data-testid={`${PAGE_PREFIX}${Page.NETWORKS}`}
      renderMain={() => (
        <div data-testid={TEST_ID}>
          <PageWrapper
            renderContent={() => (
              <>
                <NetworkCarousel />
                <NetworkList />
              </>
            )}
            pageName={menuItemsDesktop[Page.NETWORKS]}
          />
        </div>
      )}
    />
  );
};

export { TEST_ID };

export default Networks;
