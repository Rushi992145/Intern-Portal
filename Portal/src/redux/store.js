import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    post: postReducer,
    auth: authReducer,
  },
});

export default store;
