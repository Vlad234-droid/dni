import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

// TODO: #move to types?
export type AppDispatch = typeof store.dispatch;

export type Store = typeof store;

export default store;
