import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { EmailConfirmation } from 'features/EmailConfirmation';
import { menuItemsDesktop } from 'features/Menu';
import { Page, PAGE_PREFIX } from 'features/Page';

import BasePage from '../BasePage';
import PageWrapper from '../PageWrapper';

const TEST_ID = 'email-confirmation-page';

const EmailConfirmationPage: FC<RouteComponentProps<{ token: string }>> = (props) => {
  return (
    <BasePage
      data-testid={`${PAGE_PREFIX}${Page.EMAIL_CONFIRMATION}`}
      renderMain={() => (
        <div data-testid={TEST_ID}>
          <PageWrapper
            renderContent={() => <EmailConfirmation token={props.match.params.token} />}
            pageName={menuItemsDesktop[Page.EMAIL_CONFIRMATION]}
            withBorder
          />
        </div>
      )}
    />
  );
};

export { TEST_ID };

export default EmailConfirmationPage;
