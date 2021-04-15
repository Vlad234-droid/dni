import React, { FC } from 'react';
import styled from 'styled-components';

import { Post, PostStatus } from '../../config/types';
import PostPublished from '../PostPublished';
import PostArchived from '../PostArchived';

const PostItemWrapper = styled.div`
  padding: 8px 0 0;
`;

interface PostItemProps {
  item: Post;
}

const postItemTestId = 'post-item-test-id';

const PostItem: FC<PostItemProps> = ({
  item,
}) => {
  const { status } = item;

  return (
    <PostItemWrapper data-testid={postItemTestId}>
      {status === PostStatus.PUBLISHED && (
        <PostPublished item={item} />
      )}
      {status === PostStatus.ARCHIVED && (
        <PostArchived item={item} />
      )}
    </PostItemWrapper>
  );
};

export default PostItem;
export { postItemTestId };
