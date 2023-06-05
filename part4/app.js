const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./utils/config');
const routeNote = require('./route/routeNote');
const routeUser = require('./route/routeUser');
const routeLogin = require('./route/routeLogin');
const { errorHandler, userExtractor } = require('./utils/middleware');

mongoose.connect(config.MONGO_URL);

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use(userExtractor);

app.use('/api/', routeNote);
app.use('/api/login', routeLogin);
app.use('/api/users', routeUser);

app.listen(config.PORT, () => {
  console.log(`Server started at ${config.PORT}`);
});
