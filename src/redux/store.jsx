import { configureStore } from '@reduxjs/toolkit';
import {reducerContacts} from './ContactSlice';
import {reducerFilter} from './FilterSlice';


  export const store = configureStore({
    reducer: {
      contacts: reducerContacts,
      filter: reducerFilter,
    },
  });
  