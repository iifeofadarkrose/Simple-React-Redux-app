import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async () => {
    const response = await axios.get('https://dummyjson.com/comments');
    return response.data.comments;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addComment: (state, action) => {
      state.items.push(action.payload);
    },
    deleteComment: (state, action) => {
      state.items = state.items.filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addComment, deleteComment } = commentsSlice.actions;

export default commentsSlice.reducer;
