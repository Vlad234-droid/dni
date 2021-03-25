import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from 'features/Auth';
import { networksReducer } from 'features/Networks';
import { postReducer } from 'features/Post';
import { toasterReducer } from 'features/Toaster';

const appReducer = combineReducers({
  auth: authReducer,
  networks: networksReducer,
  post: postReducer,
  toaster: toasterReducer,
  // TODO: add other reducers
});

export type RootState = ReturnType<typeof appReducer>;

export default appReducer;
