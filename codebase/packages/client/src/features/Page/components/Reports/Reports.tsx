import React, { FC } from 'react';
import styled from 'styled-components';

import { Page, PAGE_PREFIX } from 'features/Page';
import Reports from 'features/Reports';
import { menuItemsDesktop } from 'features/Menu';

import BasePage from '../BasePage';
import PageWrapper from '../PageWrapper';
import { TEST_ID } from '../Networks/Networks';

const ReportPage: FC = () => {
  return (
    <BasePage
      data-testid={`${PAGE_PREFIX}${Page.REPORTS}`}
      renderMain={() => (
        <div data-testid={TEST_ID}>
          <PageWrapper
            renderContent={() => (
              <ContentWrapper>
                <Reports />
              </ContentWrapper>
            )}
            pageName={menuItemsDesktop[Page.REPORTS]}
          />
        </div>
      )}
    />
  );
};

const ContentWrapper = styled.div`
  padding-top: 10px;
`;

export default ReportPage;
