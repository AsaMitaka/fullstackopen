import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries';

const getAll = async () => {
  const res = await axios.get(baseUrl + '/api/all');

  return res.data;
};

const getCountry = async (name: string) => {
  const res = await axios.get(baseUrl + `/api/name/${name}`);

  return res.data;
};

const services = {
  getCountries: getAll,
  getCountry: getCountry,
};

export default services;
