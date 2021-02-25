import React, { FC } from 'react';

import { Page } from 'features/Page';

import BasePage from '../BasePage';

const Reports: FC = () => (
  <div data-testid={Page.REPORTS}>
    <BasePage renderCenter={() => <div data-testid='reports'>Reports</div>} />
  </div>
);

export default Reports;
