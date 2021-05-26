import React, { FC } from 'react';

import PostDocument from '../PostDocument';
import PostImage from '../PostImage';

interface PostAttachmentSuccessProps {
  format: string;
  name: string;
  path: string;
}

const postAttachmentSuccessTestId = 'post-attachment-success-test-id';

const PostAttachmentSuccess: FC<PostAttachmentSuccessProps> = ({
  format,
  name,
  path,
}) => {
  return format === 'pdf' ? (
    <PostDocument name={name} />
  ) : (
    <PostImage path={path} />
  );
};

export default PostAttachmentSuccess;
export { postAttachmentSuccessTestId };
