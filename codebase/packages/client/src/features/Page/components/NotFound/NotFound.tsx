import React, { FC } from 'react';

import { Error } from 'features/Common';
import { Page, PAGE_PREFIX } from 'features/Page';

import BasePage from '../BasePage';

const ERROR_DATA = {
  title: 'Something went wrong',
  message:
    "We couldn't find the page you were looking for. Please check the website address or click home and try again.",
};

const NotFound: FC = () => (
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

export default NotFound;
