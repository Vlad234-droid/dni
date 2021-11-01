import React, { FC } from 'react';
import styled from 'styled-components';

import { cutString } from '../../utils';
import { Attachment } from '../../config/types';
import PostAttachmentSuccess from '../PostAttachmentSuccess';

const PostAttachmentDownloadLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: default;
`;

const PostPublishedAttachmentWrapper = styled.div`
  position: relative;
`;

const postPublishedAttachmentTestId = 'post-published-attachment-test-id';

const PostPublishedAttachment: FC<Attachment> = ({ ext, name, url, alternativeText }) => {
  const nameToView = cutString({ name, format: ext, maxLength: 24 });

  return (
    <PostPublishedAttachmentWrapper data-testid={postPublishedAttachmentTestId}>
      <PostAttachmentSuccess name={nameToView} path={url} alt={alternativeText} format={ext} />
      <PostAttachmentDownloadLink
        href={url}
        title={alternativeText}
        onClick={(event) => {
          event.preventDefault();
        }}
      />
    </PostPublishedAttachmentWrapper>
  );
};

export default PostPublishedAttachment;
export { postPublishedAttachmentTestId };
