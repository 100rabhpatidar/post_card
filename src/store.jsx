import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slicer/postSlice'; 

const store = configureStore({
  reducer: {
    posts: postsReducer
  }
});

export default store;
