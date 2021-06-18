import React, { FC } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';
import { NetworkList, NetworkCarousel } from 'features/Network';
import { menuItemsDesktop } from 'features/Menu';
import { CMSLink } from 'features/Common';
import { CanPerform } from 'features/Auth';
import { Action, buildAction, Component } from 'features/Action';

import BasePage from '../BasePage';
import PageWrapper from '../PageWrapper';

const TEST_ID = 'container-notifications';

const Notifications: FC = () => {
  return (
    <BasePage
      data-testid={`${PAGE_PREFIX}${Page.NOTIFICATIONS}`}
      renderMain={() => (
        <div data-testid={TEST_ID}>
          <PageWrapper
            renderContent={() => (
              <div>Test content</div>
            )}
            pageName={'Notifications'}
            withBorder
          />
        </div>
      )}
    />
  );
};

export { TEST_ID };

export default Notifications;
