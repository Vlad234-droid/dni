import React, { FC } from 'react';
import styled from 'styled-components';
import ResponsiveImage from '@beans/responsive-image';

const PostImageWrapper = styled(ResponsiveImage)`
  min-height: 186px;
`;

interface PostImageProps {
  path: string;
  alt: string;
}

const postImageTestId = 'post-image-test-id';

const PostImage: FC<PostImageProps> = ({ path, alt }) => {
  return (
    <PostImageWrapper
      src={path}
      alt={alt}
      title={alt}
      data-testid={postImageTestId}
      fallbackSizeRatio='57%'
      positioning='center'
      objectFit='cover'
    />
  );
};

export default PostImage;
export { postImageTestId };
