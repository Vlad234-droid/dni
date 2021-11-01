import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from 'features/Auth';
import { networksReducer } from 'features/Network';
import { eventsReducer } from 'features/Event';
import { postReducer } from 'features/Post';
import { toasterReducer } from 'features/Toaster';
import { reportsReducer } from 'features/Reports';
import { notificationReducer } from 'features/Notification';
import { reactionsReducer } from 'features/Reactions';

const rootReducer = combineReducers({
  auth: authReducer,
  networks: networksReducer,
  events: eventsReducer,
  posts: postReducer,
  toaster: toasterReducer,
  reports: reportsReducer,
  notifications: notificationReducer,
  reactions: reactionsReducer,
  // TODO: add other reducers
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
