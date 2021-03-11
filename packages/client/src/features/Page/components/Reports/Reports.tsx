import React, { FC } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';

import BasePage from '../BasePage';

const Reports: FC = () => (
  <div data-testid={`${PAGE_PREFIX}${Page.REPORTS}`}>
    <BasePage
      renderMain={() => <div data-testid='container_reports'>Reports</div>}
    />
  </div>
);

export default Reports;
