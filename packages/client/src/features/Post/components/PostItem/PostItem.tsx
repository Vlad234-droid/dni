import React, { FC } from 'react';
import styled from 'styled-components';

import { CanPerform } from 'features/Auth';

import { Post } from '../../config/types';
import PostPublished from '../PostPublished';
import PostArchived from '../PostArchived';
import { useIsAdmin, useIsManager } from '../../../Auth/hooks/usePermission';

const PostItemWrapper = styled.div`
  padding: 8px 0 0;
`;

interface PostItemProps {
  item: Post;
}

const TEST_ID = 'post-item';

const PostItem: FC<PostItemProps> = ({ item }) => {
  const { archived } = item;
  const isAdmin = useIsAdmin();
  const isManager = useIsManager();

  return (
    <PostItemWrapper data-testid={TEST_ID}>
      {archived ? (
        <CanPerform
          perform='postsArchived:visit'
          yes={() =>
            isAdmin || isManager ? <PostArchived item={item} /> : null
          }
        />
      ) : (
        <PostPublished item={item} />
      )}
    </PostItemWrapper>
  );
};

export default PostItem;
export { TEST_ID };
