import React, { FC } from 'react';
import styled from 'styled-components';

import { iconsSrc } from '../../config/media';

const PostDocumentIcon = styled.div`
  width: 42px;
  height: 54px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${iconsSrc.filePDF});
`;

const PostDocumentName = styled.div`
  font-size: 16px;
  line-height: 24px;
  margin-top: 18px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`;

const PostDocumentContent = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const PostDocumentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 186px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

interface PostDocumentProps {
  name: string;
}

const postDocumentTestId = 'post-document-test-id';

const PostDocument: FC<PostDocumentProps> = ({ name }) => {
  return (
    <PostDocumentWrapper data-testid={postDocumentTestId}>
      <PostDocumentContent>
        <PostDocumentIcon />
        <PostDocumentName>{name}</PostDocumentName>
      </PostDocumentContent>
    </PostDocumentWrapper>
  );
};

export default PostDocument;
export { postDocumentTestId };
