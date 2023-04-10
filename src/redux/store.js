import {configureStore} from '@reduxjs/toolkit';

import SessionReducer from './SessionSlice';
export const store = configureStore({
  reducer: {
    session: SessionReducer,
  },
});
