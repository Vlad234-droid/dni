import { createEntityAdapter } from '@reduxjs/toolkit';

import { ToasterState } from './slice';
import { Toast } from '../config/types';

const toasterAdapter = createEntityAdapter<Toast>({
  selectId: (toast) => toast.id,
});

const toasterItemsSelector = toasterAdapter.getSelectors<ToasterState>((state) => state.all).selectAll;

export { toasterAdapter, toasterItemsSelector };
