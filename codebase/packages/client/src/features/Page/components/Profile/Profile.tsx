import React, { FC } from 'react';

import Heading from 'features/Heading';
import ProfileForm from 'features/ProfileForm';

import BasePage from '../BasePage';
import PageHeader from '../PageHeader';
import PageWrapper from '../PageWrapper';

const TEST_ID = 'profile-page';

const ProfilePage: FC = () => {
  return (
    <div data-testid={TEST_ID}>
      <BasePage
        renderMain={() => (
          <div>
            <PageHeader renderLeft={() => <Heading>Profile</Heading>} />
            <PageWrapper>
              <ProfileForm />
            </PageWrapper>
          </div>
        )}
      />
    </div>
  );
};
export { TEST_ID };

export default ProfilePage;
