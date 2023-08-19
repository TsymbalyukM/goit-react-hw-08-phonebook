import { createSlice } from '@reduxjs/toolkit';
import {
  registerUserThunk,
  loginUserThunk,
  refreshUserThunk,
  logoutUserThunk,
} from './operations';

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const authorizationSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { email: null, password: null },
    token: null,
    isLoaggedIn: false,
    isRefreshing: false,
    error: null,
    isLoading: false,
  },
  extraReducers: builder => {
    builder
      .addCase(registerUserThunk.pending, handlePending)
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoaggedIn = true;
        state.isLoading = false;
      })
      .addCase(registerUserThunk.rejected, handleRejected)

      .addCase(loginUserThunk.pending, handlePending)
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoaggedIn = true;
        state.isLoading = false;
      })
      .addCase(loginUserThunk.rejected, handleRejected)

      .addCase(logoutUserThunk.pending, handlePending)
      .addCase(logoutUserThunk.fulfilled, state => {
        state.user = { email: null, password: null };
        state.token = null;
        state.isLoaggedIn = false;
        state.isRefreshing = false;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(logoutUserThunk.rejected, handleRejected)

      .addCase(refreshUserThunk.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoaggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUserThunk.rejected, (state, action) => {
        state.isRefreshing = false;
      });
  },
});

export const authorizationReducer = authorizationSlice.reducer;
