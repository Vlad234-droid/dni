import React, { FC } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';
import { NetworkList } from 'features/Network';
import { menuItemsDesktop } from 'features/Menu';
import { CMSLink } from 'features/Common';
import { CanPerform } from 'features/Auth';
import { Action, buildAction, Component } from 'features/Action';

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
            renderContent={() => <NetworkList />}
            pageName={menuItemsDesktop[Page.NETWORKS]}
            renderLink={() => (
              <CanPerform perform={buildAction(Component.CMS_LINK, Action.LIST)} yes={() => <CMSLink />} />
            )}
            withBorder
          />
        </div>
      )}
    />
  );
};

export { TEST_ID };

export default Networks;
