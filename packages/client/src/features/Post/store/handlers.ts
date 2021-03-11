import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { User, PostStatus, Emotion } from '../config/types';
import { thunks } from './thunks';
import { actions } from './silce';

const { createPosts, readPosts, updatePosts } = thunks;

const {
  changePublisher,
  changeText,
  addAttachment,
  setAttachmentInitError,
  setAttachmentLoadError,
  setAttachmentLoadProgress,
  setAttachmentLoadSuccess,
  deleteAttachment,
  // copyLink,
} = actions;

interface PostFormHandler {
  onPublisherOptionClick: ({
    id,
    publisher,
  }: {
    id: number;
    publisher: User;
  }) => void;

  onTextareaChange: ({ id, value }: { id: number; value: string }) => void;

  onAttachmentAdd: ({
    id,
    name,
    format,
  }: {
    id: number;
    name: string;
    format: string;
  }) => void;

  onAttachmentInitError: ({ id, name }: { id: number; name: string }) => void;
  onAttachmentLoadError: ({ id, name }: { id: number; name: string }) => void;

  onAttachmentLoadProgress: ({
    id,
    name,
    progress,
  }: {
    id: number;
    name: string;
    progress: number;
  }) => void;

  onAttachmentLoadSuccess: ({
    id,
    name,
    base64String,
  }: {
    id: number;
    name: string;
    base64String: string;
  }) => void;

  onAttachmentDelete: ({ id, name }: { id: number; name: string }) => void;
}

interface PostCreatorHandler extends PostFormHandler {
  onSubmit: ({
    id,
    event,
    cleanReadingProcess,
  }: {
    id: number;
    event: FormEvent;
    cleanReadingProcess: () => void;
  }) => void;
}

interface PostUpdaterHandler extends PostFormHandler {
  onSubmit: ({
    id,
    event,
    cleanReadingProcess,
  }: {
    id: number;
    event: FormEvent;
    cleanReadingProcess: () => void;
  }) => void;
}

interface PostReaderHandler {
  published: {
    onPostLike: ({ id, variant }: { id: number; variant: Emotion }) => void;
    onPostUnlike: ({ id }: { id: number }) => void;
    onPostEdit: ({ id }: { id: number }) => void;
    onPostArchive: ({ id }: { id: number }) => void;
  };
  archived: {
    onPostUnarchive: ({ id }: { id: number }) => void;
  };
}

interface HandlerReturn {
  postCreatorHandler: PostCreatorHandler;
  postUpdaterHandler: PostUpdaterHandler;
  postReaderHandler: PostReaderHandler;
}

const useHandler = () => {
  const dispatch = useDispatch();

  const postFormHandler: PostFormHandler = {
    onPublisherOptionClick: ({ id, publisher }) => {
      dispatch(changePublisher({ id, publisher }));
    },

    onTextareaChange: ({ id, value }) => {
      dispatch(changeText({ id, value }));
    },

    onAttachmentAdd: ({ id, name, format }) => {
      dispatch(addAttachment({ id, name, format }));
    },

    onAttachmentLoadError: ({ id, name }) => {
      dispatch(setAttachmentLoadError({ id, name }));
    },

    onAttachmentInitError: ({ id, name }) => {
      dispatch(setAttachmentInitError({ id, name }));
    },

    onAttachmentLoadProgress: ({ id, name, progress }) => {
      dispatch(setAttachmentLoadProgress({ id, name, progress }));
    },

    onAttachmentLoadSuccess: ({ id, name, base64String }) => {
      dispatch(setAttachmentLoadSuccess({ id, name, base64String }));
    },

    onAttachmentDelete: ({ id, name }) => {
      dispatch(deleteAttachment({ id, name }));
    },
  };

  const postCreatorHandler: PostCreatorHandler = {
    ...postFormHandler,

    onSubmit: ({ id, event, cleanReadingProcess }) => {
      event.preventDefault();
      cleanReadingProcess();

      dispatch(createPosts({ ids: [id] }));
    },
  };

  const postUpdaterHandler: PostUpdaterHandler = {
    ...postFormHandler,

    onSubmit: ({ id, event, cleanReadingProcess }) => {
      event.preventDefault();
      cleanReadingProcess();

      dispatch(
        updatePosts({
          ids: [id],
          changes: {
            status: PostStatus.PUBLISHED,
          },
        }),
      );
    },
  };

  const postReaderHandler: PostReaderHandler = {
    published: {
      onPostLike: ({ id, variant }) => {
        dispatch(
          updatePosts({
            ids: [id],
            changes: {
              emotions: [variant],
            },
          }),
        );
      },

      onPostUnlike: ({ id }) => {
        dispatch(
          updatePosts({
            ids: [id],
            changes: {
              emotions: [],
            },
          }),
        );
      },

      onPostEdit: ({ id }) => {
        dispatch(
          readPosts({
            ids: [id],
            changes: {
              status: PostStatus.EDITING,
            },
          }),
        );
      },

      onPostArchive: ({ id }) => {
        dispatch(
          updatePosts({
            ids: [id],
            changes: {
              status: PostStatus.ARCHIVED,
            },
          }),
        );
      },
    },
    archived: {
      onPostUnarchive: ({ id }) => {
        dispatch(
          updatePosts({
            ids: [id],
            changes: {
              status: PostStatus.PUBLISHED,
            },
          }),
        );
      },
    },
  };

  return {
    postCreatorHandler,
    postReaderHandler,
    postUpdaterHandler,
  } as HandlerReturn;
};

export { useHandler };
export type {
  PostFormHandler,
  PostCreatorHandler,
  PostUpdaterHandler,
  PostReaderHandler,
};
