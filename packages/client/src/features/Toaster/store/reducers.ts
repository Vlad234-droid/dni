import { PayloadAction } from '@reduxjs/toolkit';

import { ToasterState } from './slice';
import { ToastSkin } from '../config/types';
import { toasterAdapter } from './selectors';
import { skins } from '../config/skins';

type Id = number | string;

const reducer = {
  createToast: (
    state: ToasterState,
    action: PayloadAction<{
      id?: Id;
      skin: ToastSkin;
      data?: Partial<{
        id: Id;
      }>;
    }>,
  ) => {
    const { id, skin, data } = action.payload;
    const toast = {
      id: id || new Date().getTime(),
      skin,
      ...(data ? { data } : {}),
      timeout: skins[skin]?.timeout || Infinity,
    };

    toasterAdapter.addOne(state.all, toast);
  },

  updateToastTime: (
    state: ToasterState,
    action: PayloadAction<{
      id: Id;
      timeout: number;
    }>,
  ) => {
    const { id, timeout } = action.payload;

    toasterAdapter.updateOne(state.all, {
      id,
      changes: {
        timeout,
      },
    });
  },

  deleteToast: (
    state: ToasterState,
    action: PayloadAction<{
      id: Id;
    }>,
  ) => {
    const { id } = action.payload;

    toasterAdapter.removeOne(state.all, id);
  },
};

export { reducer };
