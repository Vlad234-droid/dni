import React from 'react';
import { useSelector } from 'react-redux';

import { TypeRenderPostContainer } from '../../config/types';
import { actions } from '../../store/silce';
import { selectors } from '../../store/selectors';
import PostCreator from '../PostCreator';
import PostPublished from '../PostPublished';
import PostArchived from '../PostArchived';

const PostContainer: TypeRenderPostContainer = () => {
  const item = useSelector(selectors.getPost);
  const handler = actions;

  let View;

  switch (item.status) {
    case 'published':
      View = (
        <PostPublished
          item={item}
          onArchive={handler.onPostArchive}
          onCopyLink={handler.onPostCopyLink}
          onLikeChoice={handler.onPostLikeChoice}
          onFileDelete={handler.onPostFileDelete}
          onEdit={handler.onPostEdit}
          onDelete={handler.onPostDelete}
        />
      );
      break;

    case 'archived':
      View = <PostArchived item={item} onDelete={handler.onPostDelete} />;
      break;

    default:
      View = (
        <PostCreator
          item={item}
          onClick={handler.onPostCreatorClick}
          onFileDrag={handler.onPostFileDrag}
          onFileDrop={handler.onPostFileDrop}
          onFileChange={handler.onPostFileChange}
          onPDFChange={handler.onPostFilePDFChange}
          onPhotoChange={handler.onPostFilePhotoChange}
          onFileDelete={handler.onPostFileDelete}
          onPublisherChange={handler.onPostPublisherChange}
          onCustomSelectToggle={handler.onPostCustomSelectToggle}
          onDescriptionChange={handler.onPostDescriptionChange}
          onDescriptionFocus={handler.onPostDescriptionFocus}
          onDescriptionBlur={handler.onPostDescriptionBlur}
          onSubmitClick={handler.onPostPublish}
          fileUploadInfo={`PNG, JPG, GIF or PDF, each file less than 20 mb`}
        />
      );
  }

  return View;
};

export default PostContainer;
