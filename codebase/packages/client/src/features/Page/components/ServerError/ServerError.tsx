import React, { FC } from 'react';

import { Error } from 'features/Common';
import { Page, PAGE_PREFIX } from 'features/Page';

import BasePage from '../BasePage';

const ERROR_DATA = {
  title: 'Server Error',
  message: 'Please, try later',
};

const ServerError: FC = () => (
  <div data-testid={`${PAGE_PREFIX}${Page.NOT_FOUND}`}>
    <BasePage
      renderMain={() => (
        <>
          <Error errorData={ERROR_DATA} />
        </>
      )}
    />
  </div>
);

export default ServerError;
