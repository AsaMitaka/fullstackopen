const express = require('express');
const route = express.Router();
const Files = require('../file');
const files = new Files();

route.get('/', (req, res) => {
  res.send('Main');
});

route.get('/info', (req, res) => {
  const dataLength = files.getData().length;

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
