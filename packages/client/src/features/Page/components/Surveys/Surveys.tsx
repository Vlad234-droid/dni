import React, { FC } from 'react';

import { Page } from 'features/Page';

import BasePage from '../BasePage';

const Surveys: FC = () => (
  <div data-testid={Page.SURVEYS}>
    <BasePage renderCenter={() => <div data-testid='surveys'>Surveys</div>} />
  </div>
);

export default Surveys;
