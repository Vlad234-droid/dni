import React, { FC } from 'react';
import styled from 'styled-components';

const PostImageWrapper = styled.div<{
  path: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  min-height: 186px;
  background-position: center;
  background-size: cover;
  background-color: ${({ theme }) => theme.colors.white};
  background-image: url(${({ path }) => path});
`;

interface PostImageProps {
  path: string;
}

const postImageTestId = 'post-image-test-id';

const PostImage: FC<PostImageProps> = ({ path }) => {
  return <PostImageWrapper data-testid={postImageTestId} path={path} />;
};

export default PostImage;
export { postImageTestId };
