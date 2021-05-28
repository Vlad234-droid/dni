import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Page, PAGE_PREFIX } from 'features/Page';
import { PostList, PostSingle } from 'features/Post';
import { EventSidebar } from 'features/Event';
import { useMedia } from 'context/InterfaceContext';
import { menuItemsDesktop } from 'features/Menu';

import BasePage from '../BasePage';
import PageWrapper from '../PageWrapperNew';
import { Container, Left, Right } from './styled';

const NetworkNews: FC = () => {
  const { isDesktop } = useMedia();
  const { id } = useParams<{ id: string }>();

  return (
    <div data-testid={`${PAGE_PREFIX}${Page.NETWORK_NEWS}`}>
      <BasePage
        renderMain={() => (
          <PageWrapper
            pageName={menuItemsDesktop[Page.NETWORK_NEWS]}
            renderContent={() => (
              <Container>
                <Left data-testid='container_feeds'>
                  {id ? <PostSingle postId={parseInt(id, 10)} /> : <PostList />}
                </Left>
                {isDesktop && (
                  <Right data-testid='container_sidebar'>
                    <EventSidebar />
                  </Right>
                )}
              </Container>
            )}
          />
        )}
      />
    </div>
  );
};

export default NetworkNews;
