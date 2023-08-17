import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const sliceContacts = createSlice({
  name: 'contacts',
  initialState,

  extraReducers: {
    [fetchContacts.pending]: state => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [addContact.pending]: state => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [deleteContact.pending]: state => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [fetchContacts.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
    [addContact.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
    [deleteContact.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
    [fetchContacts.fulfilled]: (state, action) => {
      return { ...state, isLoading: false, error: null, items: action.payload };
    },
    [addContact.fulfilled]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        items: [action.payload, ...state.items],
      };
    },
    [deleteContact.fulfilled]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    },
  },
});

export const reducerContacts = sliceContacts.reducer;
