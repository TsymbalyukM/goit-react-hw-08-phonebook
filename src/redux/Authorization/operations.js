import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const setAuthHeader = token =>
  (axios.defaults.headers.common.Authorization = `Bearer ${token}`);

const clearAuthHeader = () =>
  (axios.defaults.headers.common.Authorization = '');

export const registerUserThunk = createAsyncThunk(
  'auth/register',
  async (userData, thunkApi) => {
    try {
      const response = await axios.post('/users/signup', userData);
      setAuthHeader(response.data.token);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async (userData, thunkApi) => {
    try {
      const response = await axios.post('/users/login', userData);
      setAuthHeader(response.data.token);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;
    if (token === null) {
      return thunkApi.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(token);
      const response = await axios.get('/users/current');

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      await axios.post('/users/logout');
      clearAuthHeader();
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
