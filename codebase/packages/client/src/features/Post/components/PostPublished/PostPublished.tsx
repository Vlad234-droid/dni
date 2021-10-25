import React, { FC } from 'react';

import { useMedia } from 'context/InterfaceContext';
import { EntityType } from 'types/entity';

import { RichTextRenderer, CopyLink } from 'features/Common';
import { Page } from 'features/Page';
import Reactions from 'features/Reactions';

import { Post } from '../../config/types';
import PostPublishedAttachments from '../PostPublishedAttachments';
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
  const { title, content, authorName, attachments, id, published_at, network, event, reactions } = item;
  const media = useMedia();

  return (
    <PostPublishedWrapper data-testid={TEST_ID} isMobile={media.isMobile || media.isLargeMobile}>
      <PostHead>
        <PostPublisher>
          <PostPublisherAvatarBox>{/* <PostPublisherAvatar src={createdBy.avatar} /> */}</PostPublisherAvatarBox>
          <PostPublisherName>
            {`${authorName || network?.title || event?.title || 'Diversity and Inclusion'}`}
          </PostPublisherName>
        </PostPublisher>
        <PostPublishDate>{new Date(published_at).toDateString()}</PostPublishDate>
      </PostHead>
      <PostContent>
        {attachments && attachments.length > 0 && <PostPublishedAttachments attachments={attachments} />}
        <PostTitle>{title}</PostTitle>
        <PostDescription>
          <RichTextRenderer source={content} />
        </PostDescription>
        <CopyLink to={`${Page.NETWORK_NEWS}/${id}`} />
        <Reactions entityId={id} entityType={EntityType.POST} reactions={reactions}/>
      </PostContent>
    </PostPublishedWrapper>
  );
};

export default PostPublished;
export { TEST_ID };
