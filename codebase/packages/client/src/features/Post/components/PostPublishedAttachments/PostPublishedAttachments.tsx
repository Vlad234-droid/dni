import React, { FC } from 'react';
import styled from 'styled-components';

import { Attachment } from '../../config/types';
import PostPublishedAttachment from '../PostPublishedAttachment';

const PostPublishedAttachmentsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 25px;
  border-radius: 4px;
  justify-content: space-between;
  & > * {
    flex-basis: 50%;
    flex-grow: 1;
  }
`;

interface PostPublishedAttachmentsProps {
  attachments: Attachment[];
}

const postPublishedAttachmentsTestId = 'post-attachments-test-id';

const PostPublishedAttachments: FC<PostPublishedAttachmentsProps> = ({ attachments }) => {
  return (
    <PostPublishedAttachmentsWrapper data-testid={postPublishedAttachmentsTestId}>
      {attachments.map((attachment) => {
        return <PostPublishedAttachment key={attachment.name} {...attachment} />;
      })}
    </PostPublishedAttachmentsWrapper>
  );
};

export default PostPublishedAttachments;
export { postPublishedAttachmentsTestId };
