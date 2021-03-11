import React, { FC } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';

import store from 'store';
import { PostUpdaterHandler, PostReaderHandler } from '../../store/handlers';
import {
  postItemsSelector,
  PostFormPublishersSelector,
} from '../../store/selectors';
import PostItem from '../PostItem';

const PostListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface PostListProps {
  readerHandler: PostReaderHandler;
  updaterHandler: PostUpdaterHandler;
  itemsSelector: typeof postItemsSelector;
  publishersSelector: PostFormPublishersSelector;
}

const postListTestId = 'post-list-test-id';

const PostList: FC<PostListProps> = ({
  readerHandler,
  updaterHandler,
  itemsSelector,
  publishersSelector,
}) => {
  const posts = useSelector(
    () => itemsSelector(store.getState().post),
    shallowEqual,
  );

  return (
    <PostListWrapper data-testid={postListTestId}>
      {posts.map((item) => {
        return (
          <PostItem
            key={item.id}
            {...{
              item,
              readerHandler,
              updaterHandler,
              publishersSelector,
            }}
          />
        );
      })}
    </PostListWrapper>
  );
};

export default PostList;
export { postListTestId };
