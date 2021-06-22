import React, { FC } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';
import { NotificationSettings } from 'features/Notification';

import BasePage from '../BasePage';
import PageWrapper from '../PageWrapper';

const TEST_ID = 'container-notifications';

const Notifications: FC = () => {
  return (
    <BasePage
      data-testid={`${PAGE_PREFIX}${Page.NOTIFICATIONS}`}
      renderMain={() => (
        <div data-testid={TEST_ID}>
          <PageWrapper renderContent={() => <NotificationSettings />} pageName={'Notifications'} withBorder />
        </div>
      )}
    />
  );
};

export { TEST_ID };

export default Notifications;
