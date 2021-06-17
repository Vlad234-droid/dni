import React, { FC } from 'react';

import { Error } from 'features/Common';
import { Page, PAGE_PREFIX } from 'features/Page';

import BasePage from '../BasePage';

const ERROR_DATA = {
  title: 'Unauthorized user',
  message: 'Please, login to get access',
};

const Unauthorized: FC = () => (
  <div data-testid={`${PAGE_PREFIX}${Page.NOT_FOUND}`}>
    <BasePage
      renderMain={() => (
        <>
          <Error errorData={ERROR_DATA} showButton />
        </>
      )}
    />
  </div>
);

export default Unauthorized;
