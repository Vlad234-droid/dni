import React, { FC } from 'react';
import styled from 'styled-components';

const PostImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  min-height: 186px;
  background-color: ${({ theme }) => theme.colors.white};
  & > img {
    position: absolute;
  }
`;

interface PostImageProps {
  name: string;
  path: string;
}

const postImageTestId = 'post-image-test-id';

const PostImage: FC<PostImageProps> = ({ name, path }) => {
  return (
    <PostImageWrapper data-testid={postImageTestId}>
      <img src={path} alt={name} />
    </PostImageWrapper>
  );
};

export default PostImage;
export { postImageTestId };
