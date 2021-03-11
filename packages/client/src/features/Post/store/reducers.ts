import { PayloadAction } from '@reduxjs/toolkit';

import { postItemSelector, postAdapter } from './selectors';
import { User, AttachmentStatus } from '../config/types';
import { getAttachment } from '../utils';
import { PostState } from './silce';

const formReducer = {
  changePublisher: (
    state: PostState,
    action: PayloadAction<{ id: number; publisher: User }>,
  ) => {
    const { id, publisher } = action.payload;
    const item = postItemSelector(state, id) || state.form;

    if (id) {
      postAdapter.updateOne(state, { id, changes: { createdBy: publisher } });
    } else {
      item.createdBy = publisher;
    }
  },

  changeText: (
    state: PostState,
    action: PayloadAction<{ id: number; value: string }>,
  ) => {
    const { id, value } = action.payload;
    const item = postItemSelector(state, id) || state.form;
    const splitted = value.split(/\r\n|\r|\n/gi);
    const sentences = splitted.filter((part) => part);

    const title = sentences.splice(0, 1)[0];
    const description = sentences.join('\n');

    if (id) {
      postAdapter.updateOne(state, { id, changes: { title, description } });
    } else {
      item.title = title;
      item.description = description;
    }
  },

  addAttachment: (
    state: PostState,
    action: PayloadAction<{ id: number; name: string; format: string }>,
  ) => {
    const { id, name, format } = action.payload;
    const item = postItemSelector(state, id) || state.form;
    const { attachments } = item;
    let attachment = getAttachment({ attachments, name });

    attachment = {
      format,
      name,
      path: '',
      progress: 0,
      status: AttachmentStatus.INIT,
    };

    if (id) {
      postAdapter.updateOne(state, {
        id,
        changes: { attachments: [...attachments, attachment] },
      });
    } else {
      attachments[attachments.length] = attachment;
    }
  },

  setAttachmentInitError: (
    state: PostState,
    action: PayloadAction<{ id: number; name: string }>,
  ) => {
    const { id, name } = action.payload;
    const item = postItemSelector(state, id) || state.form;
    const { attachments } = item;
    let attachment = getAttachment({ attachments, name });

    if (attachment) return;

    attachment = {
      format: '',
      name,
      path: '',
      progress: 0,
      status: AttachmentStatus.ERROR,
    };

    if (id) {
      postAdapter.updateOne(state, {
        id,
        changes: { attachments: [...attachments, attachment] },
      });
    } else {
      attachments[attachments.length] = attachment;
    }
  },

  setAttachmentLoadError: (
    state: PostState,
    action: PayloadAction<{ id: number; name: string }>,
  ) => {
    const { id, name } = action.payload;
    const item = postItemSelector(state, id) || state.form;
    let { attachments } = item;
    const attachment = getAttachment({ attachments, name });

    if (!attachment) return;

    if (id) {
      const index = attachments.indexOf(attachment);
      attachments = [...attachments];
      attachments[index] = {
        ...attachment,
        status: AttachmentStatus.ERROR,
      };

      postAdapter.updateOne(state, { id, changes: { attachments } });
    } else {
      attachment.status = AttachmentStatus.ERROR;
    }
  },

  setAttachmentLoadProgress: (
    state: PostState,
    action: PayloadAction<{ id: number; name: string; progress: number }>,
  ) => {
    const { id, name, progress } = action.payload;
    const item = postItemSelector(state, id) || state.form;
    let { attachments } = item;
    const attachment = getAttachment({ attachments, name });

    if (!attachment) return;

    if (id) {
      const index = attachments.indexOf(attachment);
      attachments = [...attachments];
      attachments[index] = {
        ...attachment,
        progress,
        status: AttachmentStatus.LOADING,
      };

      postAdapter.updateOne(state, { id, changes: { attachments } });
    } else {
      attachment.progress = progress;
      attachment.status = AttachmentStatus.LOADING;
    }
  },

  setAttachmentLoadSuccess: (
    state: PostState,
    action: PayloadAction<{ id: number; name: string; base64String: string }>,
  ) => {
    const { id, name, base64String } = action.payload;
    const item = postItemSelector(state, id) || state.form;
    let { attachments } = item;
    const attachment = getAttachment({ attachments, name });

    if (!attachment) return;

    const { format } = attachment;

    const path =
      format === 'pdf'
        ? 'data:application/pdf;base64,' + base64String
        : `data:image/${format};base64,` + base64String;

    if (id) {
      const index = attachments.indexOf(attachment);
      attachments = [...attachments];
      attachments[index] = {
        ...attachment,
        path,
        status: AttachmentStatus.SUCCESS,
      };

      postAdapter.updateOne(state, { id, changes: { attachments } });
    } else {
      attachment.path = path;
      attachment.status = AttachmentStatus.SUCCESS;
    }
  },

  deleteAttachment: (
    state: PostState,
    action: PayloadAction<{ id: number; name: string }>,
  ) => {
    const { id, name } = action.payload;
    const item = postItemSelector(state, id) || state.form;
    let { attachments } = item;
    const attachment = getAttachment({ attachments, name });

    if (!attachment) return;

    if (id) {
      attachments = [...attachments];
      attachments.splice(attachments.indexOf(attachment), 1);
      postAdapter.updateOne(state, { id, changes: { attachments } });
    } else {
      attachments.splice(attachments.indexOf(attachment), 1);
    }
  },
};

const postReducer = {
  copyLink: () => {
    console.log();
  },
};

export { formReducer, postReducer };
