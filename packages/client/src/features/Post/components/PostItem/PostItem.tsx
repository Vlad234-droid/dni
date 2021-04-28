import React, { FC } from 'react';
import styled from 'styled-components';

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

  return (
    <PostItemWrapper data-testid={TEST_ID}>
      {archived ? <PostArchived item={item} /> : <PostPublished item={item} />}
    </PostItemWrapper>
  );
};

export default PostItem;
export { TEST_ID };
