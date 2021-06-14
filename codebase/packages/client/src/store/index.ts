import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

// if (process.env.NODE_ENV !== 'production' && module.hot) {
//   module.hot.accept('./reducer', () => store.replaceReducer(reducer));
// }

// TODO: #move to types?
export type AppDispatch = typeof store.dispatch;

export type Store = typeof store;

export default store;
