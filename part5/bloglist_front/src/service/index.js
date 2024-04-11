import axios from 'axios';

const baseUrl = 'http://localhost:3001/api';
let token;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const login = async ({ username, password }) => {
  const response = await axios.post(baseUrl + '/login', { username, password });

  return response.data;
};

const register = async ({ username, name, password }) => {
  const response = await axios.post(baseUrl + '/user', { username, name, password });
  console.log(response);

  return response.data;
};

const getUsers = async () => {
  const response = await axios.post(baseUrl + '/user');

  return response.data;
};

const createPost = async ({ title, author, url, likes }) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl + '/blogs', { title, author, url, likes }, config);

  return response.data;
};

const getPost = async () => {
  const response = await axios.get(baseUrl + '/blogs');

  return response.data;
};

const services = { createPost, getPost, getUsers, login, register, setToken };

export default services;
