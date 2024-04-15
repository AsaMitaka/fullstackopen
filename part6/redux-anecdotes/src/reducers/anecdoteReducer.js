import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

let initialState = [];

export const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    fetchAnecdotes: (state, action) => {
      const fetchAnecdotes = action.payload.anecdotes;

      return fetchAnecdotes;
    },
    newAnecdote: (state, action) => {
      const newAnecdote = asObject(action.payload.newAnecdote);

      state.push(newAnecdote);
    },
    voteAnecdote: (state, action) => {
      const { id } = action.payload;

      const anecdote = state.find((anecdote) => anecdote.id === id);
      if (anecdote) {
        anecdote.votes++;
      }
    },
    resetAnecdotes: () => {
      return initialState;
    },
  },
});

export const { fetchAnecdotes, newAnecdote, voteAnecdote, resetAnecdotes } = anecdotesSlice.actions;

export default anecdotesSlice.reducer;
