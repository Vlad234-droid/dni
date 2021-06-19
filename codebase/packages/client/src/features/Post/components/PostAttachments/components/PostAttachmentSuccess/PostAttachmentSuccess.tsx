import React, { FC } from 'react';

import PostDocument from '../PostDocument';
import PostImage from '../PostImage';

interface PostAttachmentSuccessProps {
  format: string;
  name: string;
  path: string;
  alt: string;
}

const postAttachmentSuccessTestId = 'post-attachment-success-test-id';

const PostAttachmentSuccess: FC<PostAttachmentSuccessProps> = ({ format, name, path, alt }) => {
  return format === 'pdf' ? <PostDocument name={name} /> : <PostImage path={path} alt={alt} />;
};

export default PostAttachmentSuccess;
export { postAttachmentSuccessTestId };
