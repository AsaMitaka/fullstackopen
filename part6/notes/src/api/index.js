import axios from 'axios';
const baseUrl = 'http://localhost:3001/notes/';

const getAllNotes = async () => {
  const { data } = await axios.get(baseUrl);

  return data;
};

const getNote = async (id) => {
  const { data } = await axios.get(baseUrl + `${id}`);

  return data;
};

const createNote = async (newNote) => {
  const { data } = await axios.post(baseUrl, newNote);

  return data;
};

const updateNote = async (id, updatedNote) => {
  console.log(id, updatedNote);
  const { data } = await axios.put(baseUrl + `${id}`, updatedNote);

  return data;
};

const deleteNote = async (id) => {
  const { data } = await axios.delete(baseUrl + `${id}`);

  return data;
};

const api = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};

export default api;
