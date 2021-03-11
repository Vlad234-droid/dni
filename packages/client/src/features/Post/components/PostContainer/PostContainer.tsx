import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { useHandler } from '../../store/handlers';
import {
  postFormSelector,
  postItemsSelector,
  postFormPublishersSelector,
} from '../../store/selectors';
import PostForm from '../PostForm';
import PostList from '../PostList';

const PostWrapper = styled.div`
  padding: 8px;
  font-family: ${({ theme }) => theme.fontFamily.text};
`;

const postContainerTestId = 'post-container-test-id';

const PostContainer = () => {
  const item = useSelector(postFormSelector);

  const {
    postCreatorHandler,
    postReaderHandler,
    postUpdaterHandler,
  } = useHandler();

  return (
    <PostWrapper data-testid={postContainerTestId}>
      <PostForm
        item={item}
        handler={postCreatorHandler}
        publishersSelector={postFormPublishersSelector}
      />
      <PostList
        readerHandler={postReaderHandler}
        updaterHandler={postUpdaterHandler}
        itemsSelector={postItemsSelector}
        publishersSelector={postFormPublishersSelector}
      />
    </PostWrapper>
  );
};

export default PostContainer;
