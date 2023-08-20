import { createSlice } from '@reduxjs/toolkit';
import {
  registerUserThunk,
  loginUserThunk,
  refreshUserThunk,
  logoutUserThunk,
} from './operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(registerUserThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUserThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutUserThunk.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(logoutUserThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(refreshUserThunk.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(refreshUserThunk.rejected, state => {
        state.isRefreshing = false;
      }),
});

export const authReducer = authSlice.reducer;