import React, { FC } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';
import Post from 'features/Post';

import BasePage from '../BasePage';

const NewsFeed: FC = () => (
  <div data-testid={`${PAGE_PREFIX}${Page.NEWS_FEED}`}>
    <BasePage
      renderMain={() => (
        <div data-testid={'container_feeds'}>
          <Post />
        </div>
      )}
    />
  </div>
);

export default NewsFeed;
