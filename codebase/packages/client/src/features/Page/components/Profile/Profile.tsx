import React, { FC } from 'react';

import ProfileForm from 'features/ProfileForm';

import BasePage from '../BasePage';

const TEST_ID = 'profile-page';

const ProfilePage: FC = () => {
  return (
    <div data-testid={TEST_ID}>
      <BasePage renderMain={() => <ProfileForm />} />
    </div>
  );
};
export { TEST_ID };

export default ProfilePage;
