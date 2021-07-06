import React, { FC } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';
import { NotificationSettings } from 'features/Notification';

import BasePage from '../BasePage';
import PageWrapper from '../PageWrapper';

const TEST_ID = 'container-notifications';

const Notifications: FC = () => {
  return (
    <BasePage
      data-testid={`${PAGE_PREFIX}${Page.NOTIFICATION_SETTINGS}`}
      renderMain={() => (
        <div data-testid={TEST_ID}>
          <PageWrapper renderContent={() => <NotificationSettings />} pageName={'Notification Settings'} withBorder />
        </div>
      )}
    />
  );
};

export { TEST_ID };

export default Notifications;
