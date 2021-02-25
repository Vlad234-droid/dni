import React, { FC } from 'react';

import { Page } from 'features/Page';

import BasePage from '../BasePage';

// TODO: cant find page on design
const Users: FC = () => (
  <div data-testid={Page.USERS}>
    <BasePage
      renderCenter={() => <div data-testid='feed'>Center</div>}
      renderRight={() => <div data-testid='events'>Right</div>}
    />
  </div>
);

export default Users;
