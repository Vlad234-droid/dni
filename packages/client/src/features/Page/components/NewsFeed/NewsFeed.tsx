import React, { FC } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';
import Post from 'features/Post';
import { EventSidebar } from 'features/Event';
import { useMedia } from 'context/InterfaceContext';

import BasePage from '../BasePage';
import { Container, Left, Right } from './styled';

const NewsFeed: FC = () => {
  const { isDesktop } = useMedia();

  return (
    <div data-testid={`${PAGE_PREFIX}${Page.NEWS_FEED}`}>
      <BasePage
        renderMain={() => (
          <Container>
            <Left data-testid='container_feeds'>
              <Post />
            </Left>
            {isDesktop && (
              <Right>
                <EventSidebar />
              </Right>
            )}
          </Container>
        )}
      />
    </div>
  );
};

export default NewsFeed;
