import { FC, useState } from 'react';
import { Event, Network } from '@dni-connectors/colleague-cms-api';

import { useMedia } from 'context/InterfaceContext';

import { Post } from '../../config/types';
import { RichTextRenderer } from 'features/Common';
import {
  PostPublisherAvatarBox,
  PostPublisherName,
  PostArchiveEllipse,
  PostArchiveLabel,
  PostArchiveMark,
  PostArchiveInfo,
  PostHead,
  PostTitle,
  PostDescription,
  PostContent,
  PostArchivedWrapper,
} from './styled';

interface PostArchivedProps {
  item: Post;
}

const TEST_ID = 'post-archived';

const PostArchived: FC<PostArchivedProps> = ({ item }) => {
  const { title, content, authorName, network, event } = item;
  const [isContentVisible, setVisible] = useState(false);

  const parentEvent = (Array.isArray(event) && event.length > 0) ? event[0] : event as Event | undefined;
  const parentNetwork = (Array.isArray(network) && network.length > 0) ? network[0] : network as Network | undefined;

  const onPostClick = () => {
    setVisible(!isContentVisible);
  };

  const media = useMedia();

  return (
    <PostArchivedWrapper onClick={onPostClick} data-testid={TEST_ID} isMobile={media.isMobile || media.isLargeMobile}>
      <PostHead>
        <PostPublisherAvatarBox>{/* <PostPublisherAvatar src={createdBy.avatarSrc} /> */}</PostPublisherAvatarBox>
        <PostPublisherName>
          {`${authorName || parentNetwork?.title || parentEvent?.title || 'Diversity and Inclusion'}`}
        </PostPublisherName>
        <PostArchiveMark>
          <PostArchiveEllipse />
          <PostArchiveLabel>Archived</PostArchiveLabel>
        </PostArchiveMark>
        <PostArchiveInfo>hidden from other users</PostArchiveInfo>
      </PostHead>
      {isContentVisible && (
        <PostContent>
          {title && <PostTitle>{title}</PostTitle>}
          <PostDescription>
            <RichTextRenderer source={content} />
          </PostDescription>
        </PostContent>
      )}
    </PostArchivedWrapper>
  );
};

export default PostArchived;
export { TEST_ID };
