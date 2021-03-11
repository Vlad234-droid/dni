import React, { FC, RefObject } from 'react';

import {
  PostDropZonePlusIcon,
  PostDropZoneBackground,
  PostDropZoneTitle,
  PostDropZoneInfo,
  PostDropZoneLayer,
  PostDropZoneWrapper,
} from './styled';

interface PostDropZoneProps {
  onDragLeave: () => void;
  isActive: boolean;
  title: string;
  info: string;
  _ref: RefObject<HTMLDivElement>;
}

const postDropZoneTestId = 'post-drop-zone-test-id';

const PostDropZone: FC<PostDropZoneProps> = ({
  onDragLeave,
  isActive,
  title,
  info,
  _ref,
}) => {
  return (
    <PostDropZoneWrapper
      onDragLeave={onDragLeave}
      data-testid={postDropZoneTestId}
    >
      <PostDropZonePlusIcon />
      <PostDropZoneTitle>{title}</PostDropZoneTitle>
      <PostDropZoneInfo>{info}</PostDropZoneInfo>
      {isActive && <PostDropZoneBackground />}
      <PostDropZoneLayer ref={_ref} isActive={isActive} />
    </PostDropZoneWrapper>
  );
};

export default PostDropZone;
export { postDropZoneTestId };
