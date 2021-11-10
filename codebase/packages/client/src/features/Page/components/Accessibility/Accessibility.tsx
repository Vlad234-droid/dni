import React, { FC } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';
import { AccessibilityInformation } from 'features/Accessibility';

import BasePage from '../BasePage';

const AccessibilityPage: FC = () => (
  <div data-testid={`${PAGE_PREFIX}${Page.ACCESSIBILITY}`}>
    <BasePage
      renderMain={() => <AccessibilityInformation />}
    />
  </div>
);

export default AccessibilityPage;
