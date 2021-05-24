import React, { FC } from 'react';

import { Error } from 'features/Common';
import { Page, PAGE_PREFIX } from 'features/Page';

import BasePage from '../BasePage';

const ERROR_DATA = {
  title: 'Access Denied',
  message: 'Some text here',
};

const Forbidden: FC = () => (
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

export default Forbidden;
