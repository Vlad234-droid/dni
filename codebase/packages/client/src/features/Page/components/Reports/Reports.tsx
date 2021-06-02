import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { Page, PAGE_PREFIX } from 'features/Page';
import ButtonFilter from 'features/ButtonFilter';
import Reports, { Filter, PERIOD, filters } from 'features/Reports';
import { menuItemsDesktop } from 'features/Menu';

import BasePage from '../BasePage';
import PageWrapper from '../PageWrapper';
import { TEST_ID } from '../Networks/Networks';

const ReportPage: FC = () => {
  const [filter, setFilter] = useState<Filter>(PERIOD);

  return (
    <BasePage
      data-testid={`${PAGE_PREFIX}${Page.REPORTS}`}
      renderMain={() => (
        <div data-testid={TEST_ID}>
          <PageWrapper
            renderContent={() => (
              <ContentWrapper>
                <Reports showed={filter} />
              </ContentWrapper>
            )}
            renderHeaderFilters={() => (
              <ButtonFilter initialFilters={filters} onChange={(key) => setFilter(key as Filter)} name='reports' />
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
