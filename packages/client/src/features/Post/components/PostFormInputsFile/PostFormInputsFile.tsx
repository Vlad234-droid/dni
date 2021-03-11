import React, { FC, FormEvent } from 'react';
import styled from 'styled-components';

import { iconsSrc } from '../../config/media';

const PostFormInputFile = styled.input.attrs(() => ({
  type: 'file',
  multiple: true,
}))`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

const PostFormInputFileIcon = styled.div<{
  iconSrc: string;
}>`
  width: 14px;
  height: 14px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${({ iconSrc }) => iconSrc});
`;

const PostFormInputFileText = styled.div`
  margin-left: 4px;
`;

const PostFormInputFileCustom = styled.div`
  display: flex;
  align-items: center;
  color: #00539f;
  font-size: 14px;
  line-height: 22px;
  position: relative;
  overflow: hidden;
  background: #ffffff;
  border-radius: 30px;
  padding: 1px 8px 1px 6px;
  background-position: 4px;
  background-repeat: no-repeat;
`;

const PostFormInputsFileWrapper = styled.div`
  display: flex;
  padding-top: 9px;
  & > *:first-child {
    margin-right: 4px;
  }
`;

interface PostFormInputsFile {
  onFilesRead: ({
    event,
    formats,
  }: {
    event: FormEvent<HTMLInputElement>;
    formats: string[];
  }) => void;
}

const postFormInputsFileTestId = 'post-form-inputs-file-test-id';

const PostFormInputsFile: FC<PostFormInputsFile> = ({ onFilesRead }) => {
  return (
    <PostFormInputsFileWrapper data-testid={postFormInputsFileTestId}>
      <PostFormInputFileCustom>
        <PostFormInputFileIcon iconSrc={iconsSrc.addImage} />
        <PostFormInputFileText>{'Add Photo'}</PostFormInputFileText>
        <PostFormInputFile
          value={''}
          onChange={(event) => {
            onFilesRead({ event, formats: ['png', 'jpg', 'gif'] });
          }}
        />
      </PostFormInputFileCustom>
      <PostFormInputFileCustom>
        <PostFormInputFileIcon iconSrc={iconsSrc.addFile} />
        <PostFormInputFileText>{'Add File'}</PostFormInputFileText>
        <PostFormInputFile
          value={''}
          onChange={(event) => {
            onFilesRead({ event, formats: ['pdf'] });
          }}
        />
      </PostFormInputFileCustom>
    </PostFormInputsFileWrapper>
  );
};

export default PostFormInputsFile;
export { postFormInputsFileTestId };
