const express = require('express');
const route = express.Router();
const Person = require('../models/person');

route.get('/', (req, res) => {
  res.send('Main');
});

route.get('/info', async (req, res) => {
  const data = await Person.find();
  const dataLength = data.length;
  res.setHeader('Content-type', 'text/html');

  res.send(`
    <div>
      <p>Info : ${dataLength}</p>
      <br />
      <p>${req.lastRequestTime}</p>
    </div>`);
});

route.get('/about', (req, res) => {
  res.send('About');
});

module.exports = route;
