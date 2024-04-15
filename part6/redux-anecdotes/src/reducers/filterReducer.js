import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    anecdoteFilter: (state, action) => {
      state.filter = action.payload.filter;
    },
  },
});

export const { anecdoteFilter } = filterSlice.actions;

export default filterSlice.reducer;
