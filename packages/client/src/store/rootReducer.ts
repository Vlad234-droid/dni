import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from 'features/Auth';
import { networksReducer } from 'features/Networks';
import { postReducer } from 'features/Post';

const appReducer = combineReducers({
  auth: authReducer,
  networks: networksReducer,
  post: postReducer,
  // TODO: add other reducers
});

export type RootState = ReturnType<typeof appReducer>;

export default appReducer;
