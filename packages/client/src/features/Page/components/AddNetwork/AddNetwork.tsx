import React, { FC } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';
import { BackLink } from 'features/Common';
import BasePage, { PageHeader, PageWrapper } from '../BasePage';
import { CreateNetwork } from 'features/Networks';

const Networks: FC = () => {
  return (
    <div data-testid={`${PAGE_PREFIX}${Page.NETWORKS}`}>
      <BasePage
        renderMain={() => (
          <>
            <PageHeader
              renderLeft={() => <BackLink to={`/${Page.NETWORKS}`} />}
            />
            <PageWrapper>
              <CreateNetwork />
            </PageWrapper>
          </>
        )}
      />
    </div>
  );
};

export default Networks;
