const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;

const personRoute = require('./routes/personRoute');
const mainRoute = require('./routes/mainRoute');

// mongoose.connect();
// const db = mongoose.connection;
// db.once('open', () => {
//   console.log('MongoDB is connected');
// });

// db.on('error', (error) => {
//   console.log('MongoDB connection error:', error);
// });

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  req.lastRequestTime = new Date();
  next();
});

morgan.token('json', (req, res) => {
  return JSON.stringify(res.json);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res[content]'));

app.use('/', mainRoute);
app.use('/api', personRoute);

app.listen(PORT, () => {
  console.log(`Server start at 3000 port`);
});
