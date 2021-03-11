import React, { FC } from 'react';
import styled from 'styled-components';

import { cutFileName } from '../../../../utils';
import { Attachment } from '../../../../config/types';
import PostAttachmentSuccess from '../PostAttachmentSuccess';

const PostAttachmentDownloadLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const PostPublishedAttachmentWrapper = styled.div`
  position: relative;
`;

const postPublishedAttachmentTestId = 'post-published-attachment-test-id';

const PostPublishedAttachment: FC<Attachment> = ({ format, name, path }) => {
  const nameToView = cutFileName({ name, format, maxLength: 24 });

  return (
    <PostPublishedAttachmentWrapper data-testid={postPublishedAttachmentTestId}>
      <PostAttachmentSuccess name={nameToView} path={path} format={format} />
      <PostAttachmentDownloadLink href={path} download={name} />
    </PostPublishedAttachmentWrapper>
  );
};

export default PostPublishedAttachment;
export { postPublishedAttachmentTestId };
