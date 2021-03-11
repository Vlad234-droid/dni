import { DragEvent, FormEvent } from 'react';

import { PostFormHandler } from '../store/handlers';
import { getFileFormat, buildFileReader } from '../utils';
import { postItemSelector } from '../store/selectors';
import { getAttachment } from '../utils';
import store from 'store';

const storage: Record<
  string,
  Partial<{
    reader: FileReader;
    onStart: () => void;
  }>
> = {};

interface UseReadFileProps {
  id: number;
  onAttachmentAdd: PostFormHandler['onAttachmentAdd'];
  onAttachmentInitError: PostFormHandler['onAttachmentInitError'];
  onAttachmentLoadError: PostFormHandler['onAttachmentLoadError'];
  onAttachmentLoadProgress: PostFormHandler['onAttachmentLoadProgress'];
  onAttachmentLoadSuccess: PostFormHandler['onAttachmentLoadSuccess'];
  onAttachmentDelete: PostFormHandler['onAttachmentDelete'];
}

interface UseFileReaderReturn {
  onFilesReadFromTransfer: ({
    event,
    formats,
  }: {
    event: DragEvent;
    formats: string[];
  }) => void;

  onFilesReadFromInput: ({
    event,
    formats,
  }: {
    event: FormEvent<HTMLInputElement>;
    formats: string[];
  }) => void;

  onAttachmentLoadStart: ({ name }: { name: string }) => void;

  onAttachmentLoadAbort: ({ name }: { name: string }) => void;

  onAttachmentDelete: ({ name }: { name: string }) => void;

  cleanReadingProcess: () => void;
}

type UseFileReader = (props: UseReadFileProps) => UseFileReaderReturn;

const useFileReader: UseFileReader = ({
  id,
  onAttachmentAdd,
  onAttachmentInitError,
  onAttachmentLoadError,
  onAttachmentLoadProgress,
  onAttachmentLoadSuccess,
  onAttachmentDelete,
}) => {
  const onFileRead = ({
    file,
    formats,
    cleanEvent,
  }: {
    file: File;
    formats: string[];
    cleanEvent?: () => void;
  }) => {
    const { name, size } = file;
    const format = getFileFormat({ name });
    const maxSize = 20 * 1024 * 1024;

    if (!formats.includes(format) || size > maxSize) {
      onAttachmentInitError({ id, name });
      return;
    }

    const state = store.getState().post;
    const item = postItemSelector(state, id) || state.form;
    const { attachments } = item;
    const attachment = getAttachment({ attachments, name });

    if (attachment) return;

    storage[name] = buildFileReader({
      file,
      cleanStorage: () => {
        if (cleanEvent) {
          cleanEvent();
        }

        delete storage[name];
      },

      onLoadError: ({ name }) => {
        onAttachmentLoadError({ id, name });
      },

      onLoadProgress: ({ name, progress }) => {
        onAttachmentLoadProgress({ id, name, progress });
      },

      onLoadSuccess: ({ name, base64String }) => {
        onAttachmentLoadSuccess({ id, name, base64String });
      },
    });

    onAttachmentAdd({ id, name, format });
  };

  return {
    onFilesReadFromTransfer: ({ event, formats }) => {
      const { files } = event.dataTransfer;
      const cleanEvent = () => {
        event.dataTransfer.clearData();
      };

      [...files].forEach((file) => {
        onFileRead({ file, formats, cleanEvent });
      });
    },

    onFilesReadFromInput: ({ event, formats }) => {
      const { files } = event.currentTarget;

      [...Object.values(new Object(files))].forEach((file) => {
        onFileRead({ file, formats });
      });
    },

    onAttachmentLoadStart: ({ name }) => {
      const { onStart } = storage[name];

      if (onStart) {
        onStart();
      }
    },

    onAttachmentDelete: ({ name }) => {
      const blob = storage[name];

      if (blob) {
        blob.reader?.abort();
      }

      onAttachmentDelete({ id, name });
    },

    onAttachmentLoadAbort: ({ name }) => {
      const blob = storage[name];

      if (blob) {
        blob.reader?.abort();
        onAttachmentDelete({ id, name });
      }
    },

    cleanReadingProcess: () => {
      Object.entries(storage).forEach(([key, blob]) => {
        
        blob.reader?.abort();
        onAttachmentDelete({ id, name: key });
      });
    },
  } as UseFileReaderReturn;
};

export { useFileReader };
export type { UseFileReaderReturn };
