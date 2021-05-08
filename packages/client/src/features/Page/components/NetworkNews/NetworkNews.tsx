import React, { FC } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';
import { PostList, ALL } from 'features/Post';
import { EventSidebar } from 'features/Event';
import { useMedia } from 'context/InterfaceContext';

import BasePage from '../BasePage';
import { Container, Left, Right } from './styled';

const NetworkNews: FC = () => {
  const { isDesktop } = useMedia();

  return (
    <div data-testid={`${PAGE_PREFIX}${Page.NETWORK_NEWS}`}>
      <BasePage
        renderMain={() => (
          <Container>
            <Left data-testid='container_feeds'>
              <PostList filter={ALL} />
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

export default NetworkNews;
