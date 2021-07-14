import React, { FC, useEffect } from 'react';
import styled from 'styled-components';

import { CanPerform } from 'features/Auth';
import { Action, buildAction, Component } from 'features/Action';
import { useNotification, EntityType } from 'features/Notification';

import { Post } from '../../config/types';
import PostPublished from '../PostPublished';
import PostArchived from '../PostArchived';

const PostItemWrapper = styled.div`
  padding: 8px 0 0;
`;

interface PostItemProps {
  item: Post;
}

const TEST_ID = 'post-item';

const PostItem: FC<PostItemProps> = ({ item }) => {
  const { archived } = item;
  const { acknowledgeWithDelay } = useNotification();

  useEffect(() => {
    item?.id && acknowledgeWithDelay({ entityId: item.id, entityType: EntityType.POST }, 2000);
  }, [item]);

  return (
    <PostItemWrapper data-testid={TEST_ID}>
      {archived ? (
        <CanPerform
          perform={buildAction(Component.POST_ARCHIVED, Action.LIST)}
          yes={() => <PostArchived item={item} />}
        />
      ) : (
        <PostPublished item={item} />
      )}
    </PostItemWrapper>
  );
};

export default PostItem;
export { TEST_ID };
