import axios from 'axios';
const baseURL = 'http://localhost:3000';

const getAllAnecdotes = async () => {
  const response = await axios.get(baseURL + '/anecdotes');

  return response.data;
};

const createAnecdote = async (anecdote) => {
  const response = await axios.post(baseURL + '/anecdotes', anecdote);

  return response.data;
};

const updateAnecdote = async (id, anecdoteData) => {
  const response = await axios.patch(baseURL + `/anecdotes/${id}`, anecdoteData);

  return response.data;
};

const deleteAnecdote = async (id) => {
  const response = await axios.delete(baseURL + `/anecdotes/${id}`);

  return response.data;
};

const anecdoteServices = {
  getAllAnecdotes,
  createAnecdote,
  updateAnecdote,
  deleteAnecdote,
};

export default anecdoteServices;
