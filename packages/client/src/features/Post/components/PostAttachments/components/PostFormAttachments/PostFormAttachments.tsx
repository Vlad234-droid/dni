import React, { FC } from 'react';
import styled from 'styled-components';

import { Attachment } from '../../../../config/types';
import { UseFileReaderReturn } from '../../../../hooks';
import PostFormAttachment from '../PostFormAttachment';

const PostFormAttachmentsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 25px;
  border-radius: 4px;
  justify-content: space-between;
  & > * {
    flex-basis: 50%;
    flex-grow: 1;
  }
`;

interface PostFormAttachmentsProps {
  attachments: Attachment[];
  onAttachmentLoadStart: UseFileReaderReturn['onAttachmentLoadStart'];
  onAttachmentLoadAbort: UseFileReaderReturn['onAttachmentLoadAbort'];
  onAttachmentDelete: UseFileReaderReturn['onAttachmentDelete'];
}

const postFormAttachmentsTestId = 'post-form-attachments-test-id';

const PostFormAttachments: FC<PostFormAttachmentsProps> = ({
  attachments,
  onAttachmentLoadStart,
  onAttachmentLoadAbort,
  onAttachmentDelete,
}) => {
  return (
    <PostFormAttachmentsWrapper data-testid={postFormAttachmentsTestId}>
      {attachments.map((attachment) => {
        return (
          <PostFormAttachment
            key={attachment.name}
            {...attachment}
            onAttachmentLoadStart={onAttachmentLoadStart}
            onAttachmentLoadAbort={onAttachmentLoadAbort}
            onAttachmentDelete={onAttachmentDelete}
          />
        );
      })}
    </PostFormAttachmentsWrapper>
  );
};

export default PostFormAttachments;
export { postFormAttachmentsTestId };
