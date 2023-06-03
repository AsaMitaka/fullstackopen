const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./utils/config');
const routeBlog = require('./route/routeBlog');

mongoose.connection(config.MONGO_URL);

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/', routeBlog);

app.listen(config.PORT, () => {
  console.log(`Server started at ${config.PORT}`);
});
