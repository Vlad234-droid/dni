import React, { FC } from 'react';

import { Page } from 'features/Page';

import BasePage from '../BasePage';

const Profile: FC = () => (
  <div data-testid={Page.PROFILE}>
    <BasePage renderCenter={() => <div data-testid='profile'>Profile</div>} />
  </div>
);

export default Profile;
