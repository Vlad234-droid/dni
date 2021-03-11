import React, { FC } from 'react';

import { Post } from '../../config/types';
import { PostReaderHandler } from '../../store/handlers';
import { PostPublishedAttachments } from '../PostAttachments';
import PostControls from '../PostControls';
import {
  PostPublisherAvatar,
  PostPublisherAvatarBox,
  PostPublisherName,
  PostPublisher,
  PostPublisDate,
  PostHead,
  PostTitle,
  PostDescription,
  PostContent,
  PostPublishedWrapper,
} from './styled';

interface PostPublishedProps {
  item: Post;
  handler: PostReaderHandler['published'];
}

const postPublishedTestId = 'post-published-test-id';

const PostPublished: FC<PostPublishedProps> = ({ handler, item }) => {
  const {
    id,
    title,
    description,
    emotions,
    createdBy,
    createdAt,
    updatedAt,
    attachments,
  } = item;

  return (
    <PostPublishedWrapper data-testid={postPublishedTestId}>
      <PostHead>
        <PostPublisher>
          <PostPublisherAvatarBox>
            <PostPublisherAvatar src={createdBy.avatarSrc} />
          </PostPublisherAvatarBox>
          <PostPublisherName>{createdBy.name}</PostPublisherName>
        </PostPublisher>
        <PostPublisDate>{updatedAt || createdAt}</PostPublisDate>
      </PostHead>
      <PostContent>
        {attachments.length > 0 && (
          <PostPublishedAttachments attachments={attachments} />
        )}
        {title && <PostTitle>{title}</PostTitle>}
        <PostDescription>{description}</PostDescription>
        <PostControls id={id} handler={handler} emotions={emotions} />
      </PostContent>
    </PostPublishedWrapper>
  );
};

export default PostPublished;
export { postPublishedTestId };
