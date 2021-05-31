import React, { FC } from 'react';

import { useMedia } from 'context/InterfaceContext';

import { RichTextRenderer, CopyLink } from 'features/Common';
import { Page } from 'features/Page';

import { Post } from '../../config/types';
import { PostPublishedAttachments } from '../PostAttachments';
import {
  PostPublisherAvatarBox,
  PostPublisherName,
  PostPublisher,
  PostHead,
  PostTitle,
  PostDescription,
  PostContent,
  PostPublishedWrapper,
  PostPublishDate,
} from './styled';

interface PostPublishedProps {
  item: Post;
}

const TEST_ID = 'post-published';

const PostPublished: FC<PostPublishedProps> = ({ item }) => {
  const { title, content, authorName, attachments, id, published_at } = item;
  const media = useMedia();

  return (
    <PostPublishedWrapper data-testid={TEST_ID} isMobile={media.isMobile}>
      <PostHead>
        <PostPublisher>
          <PostPublisherAvatarBox>
            {/* <PostPublisherAvatar src={createdBy.avatar} /> */}
          </PostPublisherAvatarBox>
          <PostPublisherName>{`${authorName}`}</PostPublisherName>
        </PostPublisher>
        <PostPublishDate>
          {new Date(published_at).toDateString()}
        </PostPublishDate>
      </PostHead>
      <PostContent>
        {attachments && attachments.length > 0 && (
          <PostPublishedAttachments attachments={attachments} />
        )}
        <PostTitle>{title}</PostTitle>
        <PostDescription>
          <RichTextRenderer source={content} />
        </PostDescription>
        <CopyLink id={id} />
        {/*<PostControls id={id} emotions={emotions} /> */}
      </PostContent>
    </PostPublishedWrapper>
  );
};

export default PostPublished;
export { TEST_ID };
