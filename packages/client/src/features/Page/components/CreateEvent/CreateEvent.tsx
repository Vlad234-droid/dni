import React, { FC } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';
import { BackLink } from 'features/Common';
import { CreateEvent } from 'features/Events';
import BasePage from '../BasePage';
import PageHeader from '../PageHeader';
import PageWrapper from '../PageWrapper';
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
