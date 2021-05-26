import { PayloadAction } from '@reduxjs/toolkit';

import { ToasterState } from './slice';
import { ToastSkin } from '../config/types';
import { toasterAdapter } from './selectors';

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
    };

    toasterAdapter.addOne(state.all, toast);
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
