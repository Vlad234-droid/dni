import { createSlice, Dictionary } from '@reduxjs/toolkit';

import { reducer } from './reducers';
import { toasterAdapter } from './selectors';
import { Toast } from '../config/types';

export interface ToasterState {
  all: {
    ids: (number | string)[];
    entities: Dictionary<Toast>;
  };
}

const initialState: ToasterState = {
  all: toasterAdapter.getInitialState(),
};

export const toasterSlice = createSlice({
  name: 'toaster',
  initialState,
  reducers: {
    ...reducer,
  },
});

export const actions = toasterSlice.actions;

export default toasterSlice.reducer;
