import React, { FC } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';
import { BackLink } from 'features/Common';
import BasePage, { PageHeader, PageWrapper } from '../BasePage';
import { CreateEvent } from 'features/Events';

const Networks: FC = () => {
  return (
    <div data-testid={`${PAGE_PREFIX}${Page.EVENTS}`}>
      <BasePage
        renderMain={() => (
          <>
            <PageHeader
              renderLeft={() => <BackLink to={`/${Page.EVENTS}`} />}
            />
            <PageWrapper>
              <CreateEvent />
            </PageWrapper>
          </>
        )}
      />
    </div>
  );
};

export default Networks;
