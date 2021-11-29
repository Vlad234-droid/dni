import React, { FC } from 'react';
import { Event, Network } from '@dni-connectors/colleague-cms-api';

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

  const parentEvent = (Array.isArray(event) && event.length > 0) ? event[0] : event as Event | undefined;
  const parentNetwork = (Array.isArray(network) && network.length > 0) ? network[0] : network as Network | undefined;

  const media = useMedia();

  return (
    <PostPublishedWrapper data-testid={TEST_ID} isMobile={media.isMobile || media.isLargeMobile}>
      <PostHead>
        <PostPublisher>
          <PostPublisherAvatarBox>{/* <PostPublisherAvatar src={createdBy.avatar} /> */}</PostPublisherAvatarBox>
          <PostPublisherName>
            {`${authorName || parentNetwork?.title || parentEvent?.title || 'Diversity and Inclusion'}`}
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
