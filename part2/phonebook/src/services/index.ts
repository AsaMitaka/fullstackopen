import axios from 'axios';
const baseUrl = 'http://localhost:3000/persons';

const getAllUsers = async () => {
  const promise = await axios.get(baseUrl);

  return promise.data;
};

const createUser = async (newObject: { id: number; name: string; number: string }) => {
  const promise = await axios.post(baseUrl, newObject);

  return promise.data;
};

const updateUser = async (id: number, newObject: { id: number; name: string; number: string }) => {
  const promise = await axios.put(`${baseUrl}/${id}`, newObject);

  return promise.data;
};

const deleteUser = async (id: number) => {
  const promise = await axios.delete(`${baseUrl}/${id}`);

  return promise.data;
};

const services = {
  create: createUser,
  getAll: getAllUsers,
  update: updateUser,
  delete: deleteUser,
};

export default services;
