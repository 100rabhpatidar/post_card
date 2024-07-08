import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  posts: [],
  status: 'nnnn',
  error: null
};


const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});


const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});


export const { removePost } = postsSlice.actions;
export { fetchPosts };
export default postsSlice.reducer;
