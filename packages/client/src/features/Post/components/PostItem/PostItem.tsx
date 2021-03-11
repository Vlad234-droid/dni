import React, { FC } from 'react';
import styled from 'styled-components';

import { PostUpdaterHandler, PostReaderHandler } from '../../store/handlers';
import { PostFormPublishersSelector } from '../../store/selectors';
import { Post, PostStatus } from '../../config/types';
import PostForm from '../PostForm';
import PostPublished from '../PostPublished';
import PostArchived from '../PostArchived';

const PostItemWrapper = styled.div`
  padding: 8px 0 0;
`;

interface PostItemProps {
  item: Post;
  readerHandler: PostReaderHandler;
  updaterHandler: PostUpdaterHandler;
  publishersSelector: PostFormPublishersSelector;
}

const postItemTestId = 'post-item-test-id';

const PostItem: FC<PostItemProps> = ({
  item,
  readerHandler,
  updaterHandler,
  publishersSelector,
}) => {
  const { status } = item;

  return (
    <PostItemWrapper data-testid={postItemTestId}>
      {status === PostStatus.EDITING && (
        <PostForm
          item={item}
          handler={updaterHandler}
          publishersSelector={publishersSelector}
        />
      )}
      {status === PostStatus.PUBLISHED && (
        <PostPublished item={item} handler={readerHandler.published} />
      )}
      {status === PostStatus.ARCHIVED && (
        <PostArchived item={item} handler={readerHandler.archived} />
      )}
    </PostItemWrapper>
  );
};

export default PostItem;
export { postItemTestId };
