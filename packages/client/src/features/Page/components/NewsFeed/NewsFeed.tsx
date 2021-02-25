import React, { FC } from 'react';

import { Page } from 'features/Page';
import Post from 'features/Post';

import BasePage from '../BasePage';

const NewsFeed: FC = () => (
  <div data-testid={Page.NEWS_FEED}>
    <BasePage
      renderCenter={() => <Post />}
      renderRight={() => (
        <div data-testid='events'>Here you will see Events :)</div>
      )}
    />
  </div>
);

export default NewsFeed;
