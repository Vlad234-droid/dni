import React, { FC, useState } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';
import ButtonFilter from 'features/ButtonFilter';
import Reports from 'features/Reports';

import BasePage from '../BasePage';
import PageHeader from '../PageHeader';
import Heading from '../../../Heading';
import PageWrapper from '../PageWrapper';
import { TEST_ID } from '../Networks/Networks';

export const PERIOD = 'PERIOD';
export const REGION = 'REGION';
export const FORMAT = 'FORMAT';

const filters = [
  {
    key: PERIOD,
    title: 'Time period',
    active: true,
  },
  {
    key: REGION,
    title: 'Region',
    active: false,
  },
  {
    key: FORMAT,
    title: 'Format',
    active: false,
  },
];

export type Filter = typeof PERIOD | typeof REGION | typeof FORMAT;

const ReportPage: FC = () => {
  const [filter, setFilter] = useState<Filter>(PERIOD);

  return (
    <BasePage
      data-testid={`${PAGE_PREFIX}${Page.REPORTS}`}
      renderMain={() => (
        <div data-testid={TEST_ID}>
          <PageHeader
            renderLeft={() => <Heading>Reports</Heading>}
            renderCenter={() => (
              <ButtonFilter
                initialFilters={filters}
                onChange={(key) => setFilter(key as Filter)}
              />
            )}
          />
          <PageWrapper>
            <Reports showed={filter} />
          </PageWrapper>
        </div>
      )}
    />
  );
};

export default ReportPage;
